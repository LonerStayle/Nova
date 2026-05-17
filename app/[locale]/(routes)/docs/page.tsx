import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { BookOpen, FileCode2 } from "lucide-react";

import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { DocsSidebar } from "@/components/docs/docs-sidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "docs" });
  return {
    title: `${t("hero.title", { model: brand.model.flagship })} · ${brand.company.name}`,
    description: t("metaDescription", { model: brand.model.flagship }),
  };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("docs");
  const tHero = await getTranslations("docs.hero");
  const tSidebar = await getTranslations("docs.sidebar");

  return (
    <main className="container mx-auto px-6 py-16 lg:py-20">
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          {tHero("eyebrow")}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {tHero("title", { model: brand.model.flagship })}
        </h1>
        <p className="mt-6 text-base text-muted-foreground sm:text-lg">
          {tHero("description")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="#quickstart" className="gap-2">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {tHero("ctaQuickstart")}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#api-reference" className="gap-2">
              <FileCode2 className="h-4 w-4" aria-hidden="true" />
              {tHero("ctaApi")}
            </Link>
          </Button>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest2 text-muted-foreground/70">
          {tHero("version")}
        </p>
      </section>

      {/* Sidebar + Content */}
      <div className="mt-16 flex gap-10 lg:mt-20">
        <DocsSidebar />

        <div className="min-w-0 flex-1 space-y-24">
          {/* Quickstart placeholder — populated in 8.3 */}
          <section
            id="quickstart"
            aria-label={tSidebar("sections.quickstart")}
            className="scroll-mt-24"
          >
            <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
              {tSidebar("groups.gettingStarted")}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {tSidebar("sections.quickstart")}
            </h2>
          </section>

          {/* API Reference placeholder — populated in 8.4 */}
          <section
            id="api-reference"
            aria-label={tSidebar("sections.apiReference")}
            className="scroll-mt-24"
          >
            <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
              {tSidebar("groups.core")}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {tSidebar("sections.apiReference")}
            </h2>
          </section>

          {/* Streaming placeholder — populated in 8.5 */}
          <section
            id="streaming"
            aria-label={tSidebar("sections.streaming")}
            className="scroll-mt-24"
          >
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {tSidebar("sections.streaming")}
            </h2>
          </section>

          {/* Tool use placeholder — populated in 8.5 */}
          <section
            id="tool-use"
            aria-label={tSidebar("sections.toolUse")}
            className="scroll-mt-24"
          >
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {tSidebar("sections.toolUse")}
            </h2>
          </section>

          {/* Models placeholder — populated in 8.6 */}
          <section
            id="models"
            aria-label={tSidebar("sections.models")}
            className="scroll-mt-24"
          >
            <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
              {tSidebar("groups.platform")}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {tSidebar("sections.models")}
            </h2>
          </section>

          {/* Rate limits placeholder — populated in 8.6 */}
          <section
            id="rate-limits"
            aria-label={tSidebar("sections.rateLimits")}
            className="scroll-mt-24"
          >
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {tSidebar("sections.rateLimits")}
            </h2>
          </section>

          {/* Authentication placeholder — populated in 8.6 */}
          <section
            id="authentication"
            aria-label={tSidebar("sections.authentication")}
            className="scroll-mt-24"
          >
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {tSidebar("sections.authentication")}
            </h2>
          </section>

          {/* Errors placeholder — populated in 8.7 */}
          <section
            id="errors"
            aria-label={tSidebar("sections.errors")}
            className="scroll-mt-24"
          >
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {tSidebar("sections.errors")}
            </h2>
          </section>

          {/* Footer note */}
          <p className="border-t border-border/40 pt-8 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground/70">
            {tHero("footnote", { company: brand.company.name })}
          </p>
        </div>
      </div>
    </main>
  );
}
