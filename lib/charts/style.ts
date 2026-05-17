/**
 * 공통 차트 style 상수 — Recharts <Tooltip /> 의 contentStyle / cursor 통일.
 * 5 차트 파일 (benchmark-bar / timeline / capability-radar / safety-evaluation / pareto-scatter)
 * 에서 직접 import 하여 일관된 디자인 톤 유지.
 *
 * box-shadow 는 `hsl(var(--foreground) / 0.06)` — light/dark 모드 자동 적응.
 */

export const chartTooltipContentStyle = {
  background: "hsl(var(--background))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
  padding: "8px 12px",
  boxShadow: "0 4px 12px hsl(var(--foreground) / 0.06)",
} as const;

export const chartTooltipCursorFill = {
  fill: "hsl(var(--muted) / 0.4)",
} as const;

export const chartTooltipCursorScatter = {
  strokeDasharray: "3 3",
  stroke: "hsl(var(--brand-accent) / 0.5)",
} as const;
