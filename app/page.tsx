import { Hero } from "@/components/sections/hero";
import { KeyMetrics } from "@/components/sections/key-metrics";
import { TrustedBy } from "@/components/sections/trusted-by";
import { DemoWidget } from "@/components/demo/demo-widget";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export default function HomePage() {
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
