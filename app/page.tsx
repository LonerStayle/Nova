import { Hero } from "@/components/sections/hero";
import { KeyMetrics } from "@/components/sections/key-metrics";
import { TrustedBy } from "@/components/sections/trusted-by";
import { DemoWidget } from "@/components/demo/demo-widget";

export default function HomePage() {
  return (
    <>
      <Hero />
      <KeyMetrics />
      <TrustedBy />
      <DemoWidget />
    </>
  );
}
