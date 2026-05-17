/**
 * BM25 keyword retrieval — Phase 3 의 hybrid retrieval (BM25 60% + 임베딩 40%) 중 키워드 측.
 *
 * 알고리즘: Okapi BM25 표준 공식
 *   score(D, Q) = Σ IDF(qi) · (tf(qi, D) · (k1 + 1)) / (tf(qi, D) + k1 · (1 - b + b · |D| / avgdl))
 *
 * - Document text = `keywords[]` 배열 (qa.json 의 각 entry)
 * - Query = 사용자 입력 문자열 → tokenize 후 unique terms
 * - 한국어는 단순 공백 분할 (글자 단위 토크나이저는 후속 최적화 task 에서 도입 가능)
 *
 * Corpus 통계 (docFrequency / avgDocLength) 는 모듈 import 시점에 1회 사전 계산.
 */

import qaJson from "@/public/data/qa.json";

export interface QAEntry {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

const ENTRIES: readonly QAEntry[] = qaJson as readonly QAEntry[];

// --- BM25 하이퍼파라미터 (표준 권장값) ---
const K1 = 1.5;
const B = 0.75;

// --- 정규화 ---
function normalizeToken(t: string): string {
  return t.trim().toLowerCase();
}

/**
 * 자유 텍스트를 BM25 매칭용 토큰 배열로 변환.
 * - lowercase
 * - 구두점 제거 (letters / numbers / whitespace / hyphen 만 유지)
 * - 공백 분할
 * - 빈 토큰 제거
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .map(normalizeToken)
    .filter((t) => t.length > 0);
}

// --- 모듈 레벨 corpus 통계 (1회 계산 후 캐시) ---

const N = ENTRIES.length;

const docLengths: number[] = ENTRIES.map((e) => e.keywords.length);

const avgDocLength: number =
  docLengths.length > 0
    ? docLengths.reduce((a, b) => a + b, 0) / docLengths.length
    : 0;

const docFrequency: ReadonlyMap<string, number> = (() => {
  const df = new Map<string, number>();
  for (const entry of ENTRIES) {
    const unique = new Set(entry.keywords.map(normalizeToken));
    for (const term of unique) {
      df.set(term, (df.get(term) ?? 0) + 1);
    }
  }
  return df;
})();

// --- 점수 계산 ---

function idf(term: string): number {
  const dfTerm = docFrequency.get(term) ?? 0;
  // Okapi BM25 IDF with +1 smoothing — 항상 음수가 안 나오도록
  return Math.log((N - dfTerm + 0.5) / (dfTerm + 0.5) + 1);
}

function termFrequency(term: string, keywords: readonly string[]): number {
  let count = 0;
  for (const k of keywords) {
    if (normalizeToken(k) === term) count++;
  }
  return count;
}

function scoreDocument(
  queryTerms: readonly string[],
  entry: QAEntry,
  docLen: number,
): number {
  let score = 0;
  for (const term of queryTerms) {
    const tf = termFrequency(term, entry.keywords);
    if (tf === 0) continue;
    const idfTerm = idf(term);
    const numerator = tf * (K1 + 1);
    const denominator = tf + K1 * (1 - B + B * (docLen / avgDocLength));
    score += idfTerm * (numerator / denominator);
  }
  return score;
}

// --- 공개 API ---

export interface BM25Result {
  entry: QAEntry;
  score: number;
}

/**
 * 쿼리에 대해 BM25 점수 상위 `topK` 개 entries 반환.
 * 점수 0 인 entries 는 제외.
 *
 * @param query 사용자 입력 문자열
 * @param topK 반환 개수 (기본 5)
 */
export function bm25Search(query: string, topK = 5): BM25Result[] {
  const queryTerms = Array.from(new Set(tokenize(query)));
  if (queryTerms.length === 0) return [];

  const results: BM25Result[] = ENTRIES.map((entry, i) => ({
    entry,
    score: scoreDocument(queryTerms, entry, docLengths[i]),
  }));

  return results
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * 디버깅 / 테스트용 — 모듈 레벨 corpus 통계.
 * 외부에서 직접 사용하지 말 것 (다음 hybrid task 에서 normalizing 에만 활용).
 */
export const bm25Stats = {
  N,
  avgDocLength,
  uniqueTerms: docFrequency.size,
} as const;
