/**
 * 가공 벤치마크 데이터 — Benchmarks 페이지의 4 차트 전부.
 *
 * ⚠️ 모든 수치 / 모델명 / 비교 결과는 풍자 목적의 가공.
 *    CLAUDE.md §5 #1 (실존 회사·임원·제품명 직접 모사 금지) 준수 —
 *    Nexora 외 모델명은 전부 가공조어 (Apex-7 / Quasar-3 / Lumera-X / Aetheron-Pro).
 *    벤치마크 이름 (MMLU, HumanEval 등) 자체는 학계 공용 명칭이라 일반 표기 OK.
 */

export const benchmarkModels = [
  "Nexora-1",
  "Apex-7",
  "Quasar-3",
  "Lumera-X",
  "Aetheron-Pro",
] as const;

export type BenchmarkModel = (typeof benchmarkModels)[number];

// 1. 벤치마크별 모델 점수 (수직 막대)
export const benchmarkScores = [
  {
    benchmark: "MMLU",
    "Nexora-1": 92.4,
    "Apex-7": 88.1,
    "Quasar-3": 86.3,
    "Lumera-X": 84.7,
    "Aetheron-Pro": 82.4,
  },
  {
    benchmark: "HumanEval",
    "Nexora-1": 87.3,
    "Apex-7": 82.5,
    "Quasar-3": 79.1,
    "Lumera-X": 80.3,
    "Aetheron-Pro": 75.6,
  },
  {
    benchmark: "GSM8K",
    "Nexora-1": 95.7,
    "Apex-7": 92.4,
    "Quasar-3": 88.2,
    "Lumera-X": 87.8,
    "Aetheron-Pro": 85.1,
  },
  {
    benchmark: "MATH",
    "Nexora-1": 65.2,
    "Apex-7": 58.7,
    "Quasar-3": 54.3,
    "Lumera-X": 52.1,
    "Aetheron-Pro": 49.8,
  },
  {
    benchmark: "AGIEval",
    "Nexora-1": 78.4,
    "Apex-7": 72.1,
    "Quasar-3": 70.5,
    "Lumera-X": 68.9,
    "Aetheron-Pro": 66.2,
  },
] as const;

// 2. 분기별 진화 (시계열 — Nexora vs frontier 평균)
export const timelineData = [
  { quarter: "2024 Q4", Nexora: 74.2, "Frontier avg": 71.5 },
  { quarter: "2025 Q1", Nexora: 78.5, "Frontier avg": 73.8 },
  { quarter: "2025 Q2", Nexora: 82.1, "Frontier avg": 76.2 },
  { quarter: "2025 Q3", Nexora: 85.4, "Frontier avg": 78.7 },
  { quarter: "2025 Q4", Nexora: 88.9, "Frontier avg": 80.3 },
  { quarter: "2026 Q1", Nexora: 91.6, "Frontier avg": 82.1 },
  { quarter: "2026 Q2", Nexora: 92.4, "Frontier avg": 83.4 },
] as const;

// 3. 능력 프로필 (레이더 — Nexora-1 vs 평균 frontier)
export const radarData = [
  { capability: "Reasoning", "Nexora-1": 92, "Avg frontier": 78 },
  { capability: "Coding", "Nexora-1": 87, "Avg frontier": 73 },
  { capability: "Math", "Nexora-1": 89, "Avg frontier": 71 },
  { capability: "Multimodal", "Nexora-1": 91, "Avg frontier": 76 },
  { capability: "Agentic", "Nexora-1": 88, "Avg frontier": 65 },
  { capability: "Safety", "Nexora-1": 94, "Avg frontier": 82 },
] as const;

// 4. Pareto frontier (cost vs performance 산점도)
export interface ParetoPoint {
  name: string;
  cost: number; // USD per 1M tokens
  performance: number; // Composite Frontier Score
  isNexora: boolean;
}

export const paretoData: readonly ParetoPoint[] = [
  { name: "Nexora-1", cost: 1.2, performance: 92.4, isNexora: true },
  { name: "Nexora-1 Pro", cost: 3.5, performance: 95.1, isNexora: true },
  { name: "Nexora-K", cost: 0.4, performance: 79.8, isNexora: true },
  { name: "Apex-7", cost: 2.4, performance: 88.1, isNexora: false },
  { name: "Quasar-3", cost: 0.9, performance: 86.3, isNexora: false },
  { name: "Lumera-X", cost: 1.8, performance: 84.7, isNexora: false },
  { name: "Aetheron-Pro", cost: 3.1, performance: 82.4, isNexora: false },
] as const;
