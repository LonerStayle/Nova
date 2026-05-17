import type { Metadata } from "next";

import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Capabilities",
  description: `${brand.model.flagship} capabilities — multimodal reasoning, long-context understanding, tool use, code generation, and agentic workflows.`,
};

export default function CapabilitiesPage() {
  return (
    <main className="container mx-auto px-6 py-24">
      <header className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Model Capabilities
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Capabilities
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          Placeholder — 다음 iter 에서 {brand.model.flagship} 의 능력 카드 그리드
          (멀티모달·장기 컨텍스트·도구 사용·코드·에이전트) 로 교체됩니다.
        </p>
      </header>
    </main>
  );
}
