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

const nexoraSeries = paretoData.filter((point) => point.isNexora);
const otherSeries = paretoData.filter((point) => !point.isNexora);

export function ParetoScatter() {
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
            value="Cost ($ / 1M tokens)"
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
            value="Composite Score"
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
          contentStyle={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
            fontSize: 12,
          }}
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value: number | string, key: string) => {
            if (key === "cost") return [`$${value}`, "Cost / 1M tokens"];
            if (key === "performance") return [`${value}`, "Composite Score"];
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
          name="Others"
          data={[...otherSeries]}
          fill="hsl(var(--muted-foreground))"
          fillOpacity={0.45}
        />
        <Scatter
          name="Nexora series"
          data={[...nexoraSeries]}
          fill="hsl(var(--brand-accent))"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
