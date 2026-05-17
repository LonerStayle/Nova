import type { Metadata } from "next";

import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Benchmarks",
  description: `${brand.model.flagship} performance on industry-standard evaluation suites — MMLU, HumanEval, GSM8K, MATH, and frontier-grade composite benchmarks.`,
};

export default function BenchmarksPage() {
  return (
    <main className="container mx-auto px-6 py-24">
      <header className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Performance Report
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Benchmarks
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          Placeholder — 다음 iter 에서 {brand.model.flagship} 의 가공 벤치마크
          차트 (MMLU · HumanEval · GSM8K · Pareto frontier · 시계열) 로
          교체됩니다.
        </p>
      </header>
    </main>
  );
}
