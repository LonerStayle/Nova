import { Hero } from "@/components/sections/hero";
import { KeyMetrics } from "@/components/sections/key-metrics";
import { TrustedBy } from "@/components/sections/trusted-by";
import { DemoEntrypoint } from "@/components/sections/demo-entrypoint";

export default function HomePage() {
  return (
    <>
      <Hero />
      <KeyMetrics />
      <TrustedBy />
      <DemoEntrypoint />
    </>
  );
}
