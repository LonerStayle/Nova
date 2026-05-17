/**
 * Hybrid retrieval — BM25 (키워드 60%) + 코사인 유사도 (임베딩 40%) 가중합.
 *
 * 데모 위젯이 사용자 쿼리에 대해 호출:
 *   1. /api/embed 로 쿼리 임베딩 1회 호출 (server-side Voyage 프록시)
 *   2. /data/embeddings.{locale}.json (빌드타임 사전계산) fetch 후 메모리 캐시
 *   3. BM25 점수 계산 (locale 별 corpus)
 *   4. 각 점수 배열을 min-max [0, 1] 정규화
 *   5. weighted sum 의 최댓값 entry 반환
 *
 * Graceful fallback — embeddings.{locale}.json 부재 또는 /api/embed 실패 시
 * BM25-only 모드로 동작. 데모 위젯이 항상 응답을 받도록 보장.
 */

import {
  bm25Search,
  getEntries,
  type Locale,
  type QAEntry,
} from "@/lib/retrieval/bm25";

const BM25_WEIGHT = 0.6;
const COSINE_WEIGHT = 0.4;

interface EmbeddingsPayload {
  model: string;
  dim: number;
  count: number;
  generatedAt: string;
  embeddings: { id: string; embedding: number[] }[];
}

// --- locale 별 모듈 레벨 캐시 ---
const embeddingsCache = new Map<Locale, EmbeddingsPayload | null>();
const embeddingsLoadPromise = new Map<
  Locale,
  Promise<EmbeddingsPayload | null>
>();

async function loadEmbeddings(
  locale: Locale,
): Promise<EmbeddingsPayload | null> {
  const cached = embeddingsCache.get(locale);
  if (cached !== undefined) return cached;
  const existingPromise = embeddingsLoadPromise.get(locale);
  if (existingPromise) return existingPromise;

  const promise = (async () => {
    try {
      const response = await fetch(`/data/embeddings.${locale}.json`, {
        cache: "force-cache",
      });
      if (!response.ok) {
        embeddingsCache.set(locale, null);
        return null;
      }
      const data = (await response.json()) as EmbeddingsPayload;
      embeddingsCache.set(locale, data);
      return data;
    } catch {
      embeddingsCache.set(locale, null);
      return null;
    } finally {
      embeddingsLoadPromise.delete(locale);
    }
  })();

  embeddingsLoadPromise.set(locale, promise);
  return promise;
}

async function embedQuery(input: string): Promise<number[] | null> {
  try {
    const response = await fetch("/api/embed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });
    if (!response.ok) return null;
    const json = (await response.json()) as { embedding?: number[] };
    return Array.isArray(json.embedding) && json.embedding.length > 0
      ? json.embedding
      : null;
  } catch {
    return null;
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    const ai = a[i];
    const bi = b[i];
    dot += ai * bi;
    normA += ai * ai;
    normB += bi * bi;
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

function minMaxNormalize(scores: readonly number[]): number[] {
  if (scores.length === 0) return [];
  let min = Infinity;
  let max = -Infinity;
  for (const s of scores) {
    if (s < min) min = s;
    if (s > max) max = s;
  }
  const range = max - min;
  if (range === 0) return scores.map(() => 0);
  return scores.map((s) => (s - min) / range);
}

export interface HybridResult {
  entry: QAEntry;
  hybridScore: number;
  bm25Score: number;
  cosineScore: number;
  mode: "hybrid" | "bm25-only";
}

/**
 * 사용자 쿼리에 대한 최상위 1건 응답.
 *
 * @param query 사용자 입력 문자열
 * @param locale 데이터셋 locale (en | ko)
 * @returns 최상위 entry + 점수 메타. 쿼리가 비어있거나 매칭 0 이면 null.
 */
export async function hybridRetrieve(
  query: string,
  locale: Locale,
): Promise<HybridResult | null> {
  const trimmed = query.trim();
  if (trimmed.length === 0) return null;

  const entries = getEntries(locale);

  const [queryEmbedding, embeddingsData] = await Promise.all([
    embedQuery(trimmed),
    loadEmbeddings(locale),
  ]);

  const hasCosine = queryEmbedding !== null && embeddingsData !== null;

  const bm25Results = bm25Search(trimmed, locale, entries.length);
  const bm25Map = new Map<string, number>();
  for (const r of bm25Results) bm25Map.set(r.entry.id, r.score);
  const bm25Scores: number[] = entries.map((e) => bm25Map.get(e.id) ?? 0);

  let cosineScores: number[];
  if (hasCosine && queryEmbedding && embeddingsData) {
    const embById = new Map<string, number[]>();
    for (const e of embeddingsData.embeddings) embById.set(e.id, e.embedding);
    cosineScores = entries.map((entry) => {
      const emb = embById.get(entry.id);
      return emb ? cosineSimilarity(queryEmbedding, emb) : 0;
    });
  } else {
    cosineScores = entries.map(() => 0);
  }

  const bm25Norm = minMaxNormalize(bm25Scores);
  const cosineNorm = minMaxNormalize(cosineScores);

  const wBm25 = hasCosine ? BM25_WEIGHT : 1.0;
  const wCos = hasCosine ? COSINE_WEIGHT : 0.0;

  let bestIdx = -1;
  let bestScore = -Infinity;
  for (let i = 0; i < entries.length; i++) {
    const score = wBm25 * bm25Norm[i] + wCos * cosineNorm[i];
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }

  if (bestIdx < 0 || bestScore <= 0) return null;

  return {
    entry: entries[bestIdx],
    hybridScore: bestScore,
    bm25Score: bm25Scores[bestIdx],
    cosineScore: cosineScores[bestIdx],
    mode: hasCosine ? "hybrid" : "bm25-only",
  };
}
