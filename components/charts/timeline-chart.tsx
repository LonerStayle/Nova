"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { timelineData } from "@/lib/data/benchmarks";
import { chartTooltipContentStyle } from "@/lib/charts/style";

interface TimelineChartProps {
  legend: {
    nexora: string;
    frontierAvg: string;
  };
}

export function TimelineChart({ legend }: TimelineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={[...timelineData]}
        margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="grad-nexora" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="hsl(var(--brand-accent))"
              stopOpacity={0.42}
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--brand-accent))"
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient id="grad-frontier" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="hsl(var(--muted-foreground))"
              stopOpacity={0.16}
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--muted-foreground))"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke="hsl(var(--border))"
          strokeDasharray="2 4"
          vertical={false}
        />
        <XAxis
          dataKey="quarter"
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
          domain={[60, 100]}
          width={32}
        />
        <Tooltip contentStyle={chartTooltipContentStyle} />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          iconType="line"
        />
        <Area
          type="monotone"
          dataKey="Frontier avg"
          name={legend.frontierAvg}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={1.5}
          fill="url(#grad-frontier)"
          strokeDasharray="4 3"
        />
        <Area
          type="monotone"
          dataKey="Nexora"
          name={legend.nexora}
          stroke="hsl(var(--brand-accent))"
          strokeWidth={2}
          fill="url(#grad-nexora)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
