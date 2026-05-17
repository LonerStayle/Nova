import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { brand } from "@/lib/brand";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";

export const metadata: Metadata = {
  title: "Architecture",
  description: `${brand.company.name} Multi-Agent · AgentOS · Harness · Orchestration — frontier-grade agentic systems architecture.`,
};

export default async function ArchitecturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="container mx-auto px-6 py-24">
      <SectionHeading
        as="h1"
        eyebrow="System Architecture"
        title="A four-layer agentic system."
        description="Orchestration → Multi-Agent → AgentOS → Harness — each layer purpose-built for frontier-grade reasoning, observability, and safety."
      />

      <div className="mt-16">
        <ArchitectureDiagram />
      </div>

      <div className="mx-auto mt-20 max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          Patents &amp; Whitepapers
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          18 patents filed across KR · US · PCT jurisdictions — whitepaper
          series available on request.
        </p>
      </div>
    </main>
  );
}
