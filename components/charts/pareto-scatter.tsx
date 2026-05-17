"use client";

import {
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { paretoData } from "@/lib/data/benchmarks";
import {
  chartTooltipContentStyle,
  chartTooltipCursorScatter,
} from "@/lib/charts/style";

const nexoraSeries = paretoData.filter((point) => point.isNexora);
const otherSeries = paretoData.filter((point) => !point.isNexora);

interface ParetoScatterProps {
  labels: {
    xLabel: string;
    yLabel: string;
    tooltipCost: string;
    tooltipPerf: string;
    nexoraSeries: string;
    others: string;
  };
}

export function ParetoScatter({ labels }: ParetoScatterProps) {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <ScatterChart margin={{ top: 16, right: 16, bottom: 28, left: 16 }}>
        <CartesianGrid
          stroke="hsl(var(--border))"
          strokeDasharray="2 4"
        />
        <XAxis
          type="number"
          dataKey="cost"
          name="Cost"
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          domain={[0, 4]}
          tickFormatter={(v) => `$${v}`}
        >
          <Label
            value={labels.xLabel}
            position="insideBottom"
            offset={-12}
            style={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 11,
            }}
          />
        </XAxis>
        <YAxis
          type="number"
          dataKey="performance"
          name="Performance"
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          domain={[75, 100]}
          tickFormatter={(v) => `${v}`}
          width={36}
        >
          <Label
            value={labels.yLabel}
            angle={-90}
            position="insideLeft"
            offset={4}
            style={{
              fill: "hsl(var(--muted-foreground))",
              fontSize: 11,
              textAnchor: "middle",
            }}
          />
        </YAxis>
        <Tooltip
          contentStyle={chartTooltipContentStyle}
          cursor={chartTooltipCursorScatter}
          formatter={(value: number | string, key: string) => {
            if (key === "cost") return [`$${value}`, labels.tooltipCost];
            if (key === "performance")
              return [`${value}`, labels.tooltipPerf];
            return [value, key];
          }}
          labelFormatter={(_, payload) => {
            const point = payload?.[0]?.payload as
              | { name?: string }
              | undefined;
            return point?.name ?? "";
          }}
        />
        <Scatter
          name={labels.others}
          data={[...otherSeries]}
          fill="hsl(var(--muted-foreground))"
          fillOpacity={0.45}
        />
        <Scatter
          name={labels.nexoraSeries}
          data={[...nexoraSeries]}
          fill="hsl(var(--brand-accent))"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
