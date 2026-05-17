/**
 * Hybrid retrieval — BM25 (키워드 60%) + 코사인 유사도 (임베딩 40%) 가중합.
 *
 * 데모 위젯이 사용자 쿼리에 대해 호출:
 *   1. /api/embed 로 쿼리 임베딩 1회 호출 (server-side Voyage 프록시)
 *   2. /data/embeddings.json (빌드타임 사전계산) fetch 후 메모리 캐시
 *   3. BM25 점수 계산 (모듈 레벨 corpus 통계 사용)
 *   4. 각 점수 배열을 min-max [0, 1] 정규화
 *   5. weighted sum 의 최댓값 entry 반환
 *
 * Graceful fallback — embeddings.json 부재 또는 /api/embed 실패 시 BM25-only 모드로 동작.
 * 데모 위젯이 항상 응답을 받을 수 있도록 보장 (CLAUDE.md §3 🔥 — 완성도 우선).
 */

import qaJson from "@/public/data/qa.json";
import { bm25Search, type QAEntry } from "@/lib/retrieval/bm25";

const ENTRIES: readonly QAEntry[] = qaJson as readonly QAEntry[];

const BM25_WEIGHT = 0.6;
const COSINE_WEIGHT = 0.4;

interface EmbeddingsPayload {
  model: string;
  dim: number;
  count: number;
  generatedAt: string;
  embeddings: { id: string; embedding: number[] }[];
}

// --- 모듈 레벨 캐시 ---
let embeddingsCache: EmbeddingsPayload | null = null;
let embeddingsLoadPromise: Promise<EmbeddingsPayload | null> | null = null;

async function loadEmbeddings(): Promise<EmbeddingsPayload | null> {
  if (embeddingsCache) return embeddingsCache;
  if (embeddingsLoadPromise) return embeddingsLoadPromise;

  embeddingsLoadPromise = (async () => {
    try {
      const response = await fetch("/data/embeddings.json", {
        cache: "force-cache",
      });
      if (!response.ok) return null;
      const data = (await response.json()) as EmbeddingsPayload;
      embeddingsCache = data;
      return data;
    } catch {
      return null;
    } finally {
      embeddingsLoadPromise = null;
    }
  })();

  return embeddingsLoadPromise;
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
 * @returns 최상위 entry + 점수 메타. 쿼리가 비어있거나 매칭 0 이면 null.
 */
export async function hybridRetrieve(
  query: string,
): Promise<HybridResult | null> {
  const trimmed = query.trim();
  if (trimmed.length === 0) return null;

  // 1) 임베딩 + 사전계산 데이터 병렬 로드 (둘 다 실패 가능)
  const [queryEmbedding, embeddingsData] = await Promise.all([
    embedQuery(trimmed),
    loadEmbeddings(),
  ]);

  const hasCosine = queryEmbedding !== null && embeddingsData !== null;

  // 2) BM25 — 모든 entries (top=N 으로 전체 score 표 확보)
  const bm25Results = bm25Search(trimmed, ENTRIES.length);
  const bm25Map = new Map<string, number>();
  for (const r of bm25Results) bm25Map.set(r.entry.id, r.score);
  const bm25Scores: number[] = ENTRIES.map((e) => bm25Map.get(e.id) ?? 0);

  // 3) 코사인 — embeddings 가 있을 때만, 아니면 0 배열
  let cosineScores: number[];
  if (hasCosine && queryEmbedding && embeddingsData) {
    const embById = new Map<string, number[]>();
    for (const e of embeddingsData.embeddings) embById.set(e.id, e.embedding);
    cosineScores = ENTRIES.map((entry) => {
      const emb = embById.get(entry.id);
      return emb ? cosineSimilarity(queryEmbedding, emb) : 0;
    });
  } else {
    cosineScores = ENTRIES.map(() => 0);
  }

  // 4) 정규화 + 가중합 (cosine 부재면 BM25 가중치 1.0 으로 fallback)
  const bm25Norm = minMaxNormalize(bm25Scores);
  const cosineNorm = minMaxNormalize(cosineScores);

  const wBm25 = hasCosine ? BM25_WEIGHT : 1.0;
  const wCos = hasCosine ? COSINE_WEIGHT : 0.0;

  let bestIdx = -1;
  let bestScore = -Infinity;
  for (let i = 0; i < ENTRIES.length; i++) {
    const score = wBm25 * bm25Norm[i] + wCos * cosineNorm[i];
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }

  if (bestIdx < 0 || bestScore <= 0) return null;

  return {
    entry: ENTRIES[bestIdx],
    hybridScore: bestScore,
    bm25Score: bm25Scores[bestIdx],
    cosineScore: cosineScores[bestIdx],
    mode: hasCosine ? "hybrid" : "bm25-only",
  };
}
