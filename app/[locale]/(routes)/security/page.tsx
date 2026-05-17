import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { brand } from "@/lib/brand";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { ChartCard } from "@/components/charts/chart-card";
import { SafetyEvaluationChart } from "@/components/charts/safety-evaluation-chart";
import { securitySections } from "@/lib/data/security";

export const metadata: Metadata = {
  title: "Security",
  description: `${brand.company.name} alignment · red-teaming · compliance · provenance — constitutional safety practice for frontier AI.`,
};

export default async function SecurityPage({
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
        eyebrow="Safety &amp; Security"
        title="Safety as the substrate."
        description="Alignment, red-teaming, compliance, and provenance — four pillars of constitutional safety practice, built into every layer of the system."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {securitySections.map((section) => {
          const Icon = section.icon;
          return (
            <Card
              key={section.category}
              className="p-6 transition-all duration-300 hover:border-foreground/15 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm"
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-2">
                  <Pill variant="mono">{section.category}</Pill>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {section.tagline}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border/40 pt-6 sm:grid-cols-2">
                {section.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between gap-4 text-xs"
                  >
                    <dt className="truncate text-muted-foreground">{m.label}</dt>
                    <dd className="shrink-0 font-mono font-medium text-foreground/90">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          );
        })}
      </div>

      <div className="mt-16">
        <ChartCard
          title="Safety evaluation — refusal rate by category"
          subtitle="Adversarial prompts × 6 risk categories — higher is better"
          caption="Refusal rates measured on the internal Safety Suite v3.2 — 3,000+ adversarial prompts across the 6 categories. Industry avg = mean of top-5 frontier models excluding Nexora."
        >
          <SafetyEvaluationChart />
        </ChartCard>
      </div>

      <div className="mx-auto mt-16 max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          Model Card &amp; Disclosures
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Full Model Card · Training audit summary · Voluntary disclosure
          archive — available on request.
        </p>
      </div>
    </main>
  );
}
