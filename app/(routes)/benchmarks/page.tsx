import type { Metadata } from "next";

import { brand } from "@/lib/brand";
import { SectionHeading } from "@/components/ui/section-heading";
import { ChartCard } from "@/components/charts/chart-card";
import { BenchmarkBarChart } from "@/components/charts/benchmark-bar-chart";
import { TimelineChart } from "@/components/charts/timeline-chart";
import { CapabilityRadar } from "@/components/charts/capability-radar";
import { ParetoScatter } from "@/components/charts/pareto-scatter";

export const metadata: Metadata = {
  title: "Benchmarks",
  description: `${brand.model.flagship} performance on industry-standard evaluation suites — MMLU, HumanEval, GSM8K, MATH, AGIEval, and composite frontier metrics.`,
};

export default function BenchmarksPage() {
  return (
    <main className="container mx-auto px-6 py-24">
      <SectionHeading
        as="h1"
        eyebrow="Performance Report"
        title="Benchmarks"
        description={`${brand.model.flagship} performance across industry-standard evaluation suites and frontier-grade composite metrics.`}
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <ChartCard
          title="Industry-standard benchmark scores"
          subtitle="5-shot / pass@1 / cot — higher is better"
          caption="Scores from the public version of each evaluation suite, evaluated under matched prompt formats. Frontier models compared as of 2026 Q2."
        >
          <BenchmarkBarChart />
        </ChartCard>

        <ChartCard
          title="Composite Frontier Score — quarterly evolution"
          subtitle="2024 Q4 → 2026 Q2"
          caption="Composite score = geometric mean of MMLU · HumanEval · GSM8K · MATH · AGIEval (weighted equally). Frontier avg = top-3 publicly available models excluding Nexora. None of these numbers were back-fitted to make this line go up, we promise."
        >
          <TimelineChart />
        </ChartCard>

        <ChartCard
          title="Capability profile"
          subtitle="Nexora-1 vs avg frontier model"
          caption="Each axis is a normalized score (0–100) over ≥3 representative benchmarks in the category. Safety axis uses internal red-team pass rate."
        >
          <CapabilityRadar />
        </ChartCard>

        <ChartCard
          title="Cost-performance Pareto frontier"
          subtitle="Composite Frontier Score vs USD per 1M tokens"
          caption="Nexora series sits on the Pareto frontier across the entire cost-performance plane — from Nexora-K (cost-optimized) through Nexora-1 Pro (peak frontier). Hard to lose a benchmark you invented."
        >
          <ParetoScatter />
        </ChartCard>
      </div>
    </main>
  );
}
