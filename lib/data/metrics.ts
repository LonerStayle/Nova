/**
 * 가공 KPI / 벤치마크 데이터 — Homepage Key Metrics + Benchmarks 페이지에서 공유.
 *
 * ⚠️ 모든 수치는 풍자 목적의 가공 값. 실존 모델·벤치마크 결과와 무관.
 *    벤치마크 이름(MMLU, HumanEval, MATH 등) 자체는 학계 공용 명칭이며,
 *    "우리 모델이 그 점수를 받았다" 는 주장이 풍자의 핵심.
 */

export type DeltaTrend = "up" | "down" | "neutral";

export interface Metric {
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  deltaTrend?: DeltaTrend;
  caption?: string;
}

export const homepageMetrics: readonly Metric[] = [
  {
    label: "MMLU (5-shot)",
    value: "92.4",
    unit: "%",
    delta: "+4.1",
    deltaTrend: "up",
    caption: "vs. previous frontier generation",
  },
  {
    label: "HumanEval (pass@1)",
    value: "87.3",
    unit: "%",
    delta: "+5.8",
    deltaTrend: "up",
    caption: "Python coding benchmark",
  },
  {
    label: "MATH (500 problems)",
    value: "65.2",
    unit: "%",
    delta: "+2.9",
    deltaTrend: "up",
    caption: "Competition-level mathematics",
  },
] as const;
