import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { brand } from "@/lib/brand";
import { SectionHeading } from "@/components/ui/section-heading";
import { ChartCard } from "@/components/charts/chart-card";
import { BenchmarkBarChart } from "@/components/charts/benchmark-bar-chart";
import { TimelineChart } from "@/components/charts/timeline-chart";
import { CapabilityRadar } from "@/components/charts/capability-radar";
import { ParetoScatter } from "@/components/charts/pareto-scatter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "benchmarks" });
  return {
    title: t("title"),
    description: t("metaDescription", { model: brand.model.flagship }),
  };
}

export default async function BenchmarksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("benchmarks");
  const tCharts = await getTranslations("benchmarks.charts");

  return (
    <main className="container mx-auto px-6 py-24">
      <SectionHeading
        as="h1"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description", { model: brand.model.flagship })}
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <ChartCard
          title={tCharts("industryStandard.title")}
          subtitle={tCharts("industryStandard.subtitle")}
          caption={tCharts("industryStandard.caption")}
        >
          <BenchmarkBarChart />
        </ChartCard>

        <ChartCard
          title={tCharts("composite.title")}
          subtitle={tCharts("composite.subtitle")}
          caption={tCharts("composite.caption")}
        >
          <TimelineChart />
        </ChartCard>

        <ChartCard
          title={tCharts("radar.title")}
          subtitle={tCharts("radar.subtitle", { model: brand.model.flagship })}
          caption={tCharts("radar.caption")}
        >
          <CapabilityRadar />
        </ChartCard>

        <ChartCard
          title={tCharts("pareto.title")}
          subtitle={tCharts("pareto.subtitle")}
          caption={tCharts("pareto.caption")}
        >
          <ParetoScatter />
        </ChartCard>
      </div>
    </main>
  );
}
