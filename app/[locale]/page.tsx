import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/hero";
import { KeyMetrics } from "@/components/sections/key-metrics";
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
        <TrustedBy />
      </RevealOnScroll>
      <RevealOnScroll>
        <DemoWidget />
      </RevealOnScroll>
    </>
  );
}
