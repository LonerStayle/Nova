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

import { safetyData } from "@/lib/data/security";

export function SafetyEvaluationChart() {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart
        data={[...safetyData]}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          stroke="hsl(var(--border))"
          strokeDasharray="2 4"
          horizontal={false}
        />
        <XAxis
          type="number"
          domain={[60, 100]}
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="category"
          stroke="hsl(var(--muted-foreground))"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          width={150}
        />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
            fontSize: 12,
          }}
          cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
          formatter={(value: number | string) => [`${value}%`, ""]}
        />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          iconType="square"
        />
        <Bar
          dataKey="Industry avg"
          fill="hsl(var(--muted-foreground) / 0.45)"
          radius={[0, 3, 3, 0]}
        />
        <Bar
          dataKey="Nexora-1"
          fill="hsl(var(--brand-accent))"
          radius={[0, 3, 3, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
