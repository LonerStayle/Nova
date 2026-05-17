"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import { radarData } from "@/lib/data/benchmarks";

interface CapabilityRadarProps {
  legend: {
    nexora: string;
    frontierAvg: string;
  };
}

export function CapabilityRadar({ legend }: CapabilityRadarProps) {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <RadarChart
        data={[...radarData]}
        margin={{ top: 16, right: 30, bottom: 16, left: 30 }}
      >
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis
          dataKey="capability"
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
          tickCount={5}
          axisLine={false}
        />
        <Radar
          name={legend.frontierAvg}
          dataKey="Avg frontier"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth={1.5}
          fill="hsl(var(--muted-foreground))"
          fillOpacity={0.12}
          strokeDasharray="4 3"
        />
        <Radar
          name={legend.nexora}
          dataKey="Nexora-1"
          stroke="hsl(var(--brand-accent))"
          strokeWidth={2}
          fill="hsl(var(--brand-accent))"
          fillOpacity={0.22}
        />
        <Legend
          wrapperStyle={{ fontSize: 11, paddingTop: 6 }}
          iconType="line"
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
