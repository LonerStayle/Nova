import type { Metadata } from "next";

import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Architecture",
  description: `${brand.company.name} Multi-Agent · AgentOS · Harness · Orchestration — frontier-grade agentic systems architecture.`,
};

export default function ArchitecturePage() {
  return (
    <main className="container mx-auto px-6 py-24">
      <header className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          System Architecture
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Architecture
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          Placeholder — 다음 iter 에서 Multi-Agent · AgentOS · Harness ·
          Orchestration 4-레이어 가공 다이어그램과 각 레이어 설명으로
          교체됩니다.
        </p>
      </header>
    </main>
  );
}
