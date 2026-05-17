import type { Metadata } from "next";

import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Security",
  description: `${brand.company.name} alignment · red-teaming · compliance · provenance — constitutional safety practice for frontier AI.`,
};

export default function SecurityPage() {
  return (
    <main className="container mx-auto px-6 py-24">
      <header className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Safety &amp; Security
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Security
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          Placeholder — 다음 iter 에서 Alignment · Red-teaming · Compliance ·
          Provenance 섹션 카드와 가공 Safety 평가 차트로 교체됩니다.
        </p>
      </header>
    </main>
  );
}
