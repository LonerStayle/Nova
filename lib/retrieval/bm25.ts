/**
 * BM25 keyword retrieval — Phase 3 의 hybrid retrieval (BM25 60% + 임베딩 40%) 중 키워드 측.
 *
 * 알고리즘: Okapi BM25 표준 공식
 *   score(D, Q) = Σ IDF(qi) · (tf(qi, D) · (k1 + 1)) / (tf(qi, D) + k1 · (1 - b + b · |D| / avgdl))
 *
 * - Document text = `keywords[]` 배열 (qa.{locale}.json 의 각 entry)
 * - Query = 사용자 입력 문자열 → tokenize 후 unique terms
 * - 한국어는 단순 공백 분할 (글자 단위 토크나이저는 후속 최적화 task)
 *
 * locale 분리 (Phase 6.9):
 *   - `qa.en.json` 과 `qa.ko.json` 둘 다 정적 import (총 ~120KB)
 *   - locale 별 corpus 통계 lazy 계산 + 모듈 레벨 캐시
 */

import qaEn from "@/public/data/qa.en.json";
import qaKo from "@/public/data/qa.ko.json";

export interface QAEntry {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
}

export type Locale = "en" | "ko";

const DATASETS: Record<Locale, readonly QAEntry[]> = {
  en: qaEn as readonly QAEntry[],
  ko: qaKo as readonly QAEntry[],
};

// --- BM25 하이퍼파라미터 (표준 권장값) ---
const K1 = 1.5;
const B = 0.75;

// --- 정규화 ---
function normalizeToken(t: string): string {
  return t.trim().toLowerCase();
}

/**
 * 자유 텍스트를 BM25 매칭용 토큰 배열로 변환.
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .map(normalizeToken)
    .filter((t) => t.length > 0);
}

interface CorpusStats {
  entries: readonly QAEntry[];
  N: number;
  docLengths: readonly number[];
  avgDocLength: number;
  docFrequency: ReadonlyMap<string, number>;
}

const corpusCache = new Map<Locale, CorpusStats>();

function getCorpus(locale: Locale): CorpusStats {
  const cached = corpusCache.get(locale);
  if (cached) return cached;

  const entries = DATASETS[locale];
  const docLengths = entries.map((e) => e.keywords.length);
  const N = entries.length;
  const avgDocLength =
    docLengths.length > 0
      ? docLengths.reduce((a, b) => a + b, 0) / docLengths.length
      : 0;

  const df = new Map<string, number>();
  for (const entry of entries) {
    const unique = new Set(entry.keywords.map(normalizeToken));
    for (const term of unique) {
      df.set(term, (df.get(term) ?? 0) + 1);
    }
  }

  const stats: CorpusStats = {
    entries,
    N,
    docLengths,
    avgDocLength,
    docFrequency: df,
  };
  corpusCache.set(locale, stats);
  return stats;
}

function idf(term: string, stats: CorpusStats): number {
  const dfTerm = stats.docFrequency.get(term) ?? 0;
  return Math.log((stats.N - dfTerm + 0.5) / (dfTerm + 0.5) + 1);
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
  stats: CorpusStats,
): number {
  let score = 0;
  for (const term of queryTerms) {
    const tf = termFrequency(term, entry.keywords);
    if (tf === 0) continue;
    const idfTerm = idf(term, stats);
    const numerator = tf * (K1 + 1);
    const denominator =
      tf + K1 * (1 - B + B * (docLen / stats.avgDocLength));
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
 */
export function bm25Search(
  query: string,
  locale: Locale,
  topK = 5,
): BM25Result[] {
  const queryTerms = Array.from(new Set(tokenize(query)));
  if (queryTerms.length === 0) return [];

  const stats = getCorpus(locale);

  const results: BM25Result[] = stats.entries.map((entry, i) => ({
    entry,
    score: scoreDocument(queryTerms, entry, stats.docLengths[i], stats),
  }));

  return results
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export function getEntries(locale: Locale): readonly QAEntry[] {
  return getCorpus(locale).entries;
}

export const bm25Stats = (locale: Locale) => {
  const s = getCorpus(locale);
  return {
    N: s.N,
    avgDocLength: s.avgDocLength,
    uniqueTerms: s.docFrequency.size,
  };
};
