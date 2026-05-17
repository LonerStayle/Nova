import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";

export async function CareersHero() {
  const t = await getTranslations("careers.hero");

  return (
    <section className="relative overflow-hidden border-b border-border/40">
      {/* Background gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--brand-accent)/0.18),transparent_60%)]"
      />
      <div className="container relative mx-auto px-6 py-24 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 font-mono text-sm uppercase tracking-widest2 text-foreground/70 sm:text-base">
            {t("subtitle")}
          </p>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("description", { company: brand.company.name })}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="#open-roles" className="gap-2">
                {t("ctaPrimary")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#why-nexora" className="gap-2">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {t("ctaSecondary")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
