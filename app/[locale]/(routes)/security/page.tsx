import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { brand } from "@/lib/brand";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { SectionHeading } from "@/components/ui/section-heading";
import { ChartCard } from "@/components/charts/chart-card";
import {
  SafetyEvaluationChart,
  type SafetyChartDatum,
} from "@/components/charts/safety-evaluation-chart";
import {
  securitySectionIds,
  securitySectionIcons,
  securityMetricKeys,
  securityMetricValues,
  safetyDataIds,
  safetyDataValues,
} from "@/lib/data/security";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "security" });
  return {
    title: t("title"),
    description: t("metaDescription", { company: brand.company.name }),
  };
}

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("security");
  const tSections = await getTranslations("security.sections");
  const tSafetyChart = await getTranslations("security.safetyChart");
  const tModelCard = await getTranslations("security.modelCard");

  const safetyChartData: readonly SafetyChartDatum[] = safetyDataIds.map(
    (id) => ({
      category: tSafetyChart(`categories.${id}`),
      nexora: safetyDataValues[id].nexora,
      industry: safetyDataValues[id].industry,
    }),
  );

  return (
    <main className="container mx-auto px-6 py-24">
      <SectionHeading
        as="h1"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {securitySectionIds.map((id) => {
          const Icon = securitySectionIcons[id];
          return (
            <Card
              key={id}
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
                  <Pill variant="mono">{tSections(`${id}.category`)}</Pill>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {tSections(`${id}.tagline`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tSections(`${id}.description`, {
                      model: brand.model.flagship,
                    })}
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-border/40 pt-6 sm:grid-cols-2">
                {securityMetricKeys[id].map((metricKey) => (
                  <div
                    key={metricKey}
                    className="flex items-center justify-between gap-4 text-xs"
                  >
                    <dt className="truncate text-muted-foreground">
                      {tSections(`${id}.metrics.${metricKey}`)}
                    </dt>
                    <dd className="shrink-0 font-mono font-medium text-foreground/90">
                      {securityMetricValues[id][metricKey]}
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
          title={tSafetyChart("title")}
          subtitle={tSafetyChart("subtitle")}
          caption={tSafetyChart("caption")}
        >
          <SafetyEvaluationChart
            data={safetyChartData}
            legend={{
              nexora: tSafetyChart("legend.nexora", {
                model: brand.model.flagship,
              }),
              industry: tSafetyChart("legend.industry"),
            }}
          />
        </ChartCard>
      </div>

      <div className="mx-auto mt-16 max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          {tModelCard("eyebrow")}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {tModelCard("body")}
        </p>
      </div>
    </main>
  );
}
