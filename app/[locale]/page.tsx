import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/hero";
import { KeyMetrics } from "@/components/sections/key-metrics";
import { BigNumbers } from "@/components/sections/big-numbers";
import { ModelIntro } from "@/components/sections/model-intro";
import { ArchitectureTeaser } from "@/components/sections/architecture-teaser";
import { BenchmarkTeaser } from "@/components/sections/benchmark-teaser";
import { UseCases } from "@/components/sections/use-cases";
import { TrustedBy } from "@/components/sections/trusted-by";
import { DemoWidget } from "@/components/demo/demo-widget";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <RevealOnScroll>
        <KeyMetrics />
      </RevealOnScroll>
      <RevealOnScroll>
        <BigNumbers />
      </RevealOnScroll>
      <RevealOnScroll>
        <ModelIntro />
      </RevealOnScroll>
      <RevealOnScroll>
        <TrustedBy />
      </RevealOnScroll>
      <RevealOnScroll>
        <ArchitectureTeaser />
      </RevealOnScroll>
      <RevealOnScroll>
        <BenchmarkTeaser />
      </RevealOnScroll>
      <RevealOnScroll>
        <UseCases />
      </RevealOnScroll>
      <RevealOnScroll>
        <DemoWidget />
      </RevealOnScroll>
    </>
  );
}
