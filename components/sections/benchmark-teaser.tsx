import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/routing";
import { ChartCard } from "@/components/charts/chart-card";
import { BenchmarkBarChart } from "@/components/charts/benchmark-bar-chart";

export function BenchmarkTeaser() {
  const t = useTranslations("home.benchTeaser");

  return (
    <section className="border-t border-border/40 bg-muted/10">
      <div className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-brand-accent/80">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("heading")}
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <ChartCard
            title={t("chartTitle")}
            subtitle={t("chartSubtitle")}
            caption={t("caption")}
          >
            <BenchmarkBarChart />
          </ChartCard>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/benchmarks"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand-accent"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
