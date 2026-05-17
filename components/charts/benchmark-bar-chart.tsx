"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { benchmarkModels, benchmarkScores } from "@/lib/data/benchmarks";

const modelColors: Record<(typeof benchmarkModels)[number], string> = {
  "Nexora-1": "hsl(var(--brand-accent))",
  "Apex-7": "hsl(var(--muted-foreground) / 0.62)",
  "Quasar-3": "hsl(var(--muted-foreground) / 0.46)",
  "Lumera-X": "hsl(var(--muted-foreground) / 0.32)",
  "Aetheron-Pro": "hsl(var(--muted-foreground) / 0.2)",
};

export function BenchmarkBarChart() {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={[...benchmarkScores]}
        margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          stroke="hsl(var(--border))"
          strokeDasharray="2 4"
          vertical={false}
        />
        <XAxis
          dataKey="benchmark"
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          domain={[0, 100]}
          tickFormatter={(v) => `${v}`}
          unit="%"
          width={36}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
            fontSize: 12,
          }}
          cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
        />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          iconType="square"
        />
        {benchmarkModels.map((model) => (
          <Bar
            key={model}
            dataKey={model}
            fill={modelColors[model]}
            radius={[3, 3, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
