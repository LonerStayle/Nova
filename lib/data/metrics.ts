/**
 * 가공 KPI / 벤치마크 데이터 — Homepage Key Metrics + Benchmarks 페이지에서 공유.
 *
 * ⚠️ 모든 수치는 풍자 목적의 가공 값. 실존 모델·벤치마크 결과와 무관.
 *    벤치마크 이름(MMLU, HumanEval, MATH 등) 자체는 학계 공용 명칭이며,
 *    "우리 모델이 그 점수를 받았다" 는 주장이 풍자의 핵심.
 */

export type DeltaTrend = "up" | "down" | "neutral";

export interface Metric {
  id: "mmlu" | "humanEval" | "math";
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  deltaTrend?: DeltaTrend;
}

export const homepageMetrics: readonly Metric[] = [
  {
    id: "mmlu",
    label: "MMLU (5-shot)",
    value: "92.4",
    unit: "%",
    delta: "+4.1",
    deltaTrend: "up",
  },
  {
    id: "humanEval",
    label: "HumanEval (pass@1)",
    value: "94.1",
    unit: "%",
    delta: "+6.8",
    deltaTrend: "up",
  },
  {
    id: "math",
    label: "MATH (500 problems)",
    value: "85.4",
    unit: "%",
    delta: "+7.4",
    deltaTrend: "up",
  },
] as const;
