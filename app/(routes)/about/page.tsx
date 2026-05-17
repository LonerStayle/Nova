import type { Metadata } from "next";

import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: `About ${brand.company.name} — research team, mission, and parody disclosure.`,
};

export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 py-24">
      <header className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          About
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {brand.company.name}
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          Placeholder — 다음 iter 에서 가공 팀 멤버 카드 4~6명 + 명시적 패러디
          disclosure 한 단락으로 교체됩니다.
        </p>
      </header>

      <section
        id="disclosure"
        className="mx-auto mt-16 max-w-3xl rounded-lg border bg-muted/30 p-6"
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Parody Disclosure (preliminary)
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/90">
          {brand.disclosure.short}
        </p>
      </section>
    </main>
  );
}
