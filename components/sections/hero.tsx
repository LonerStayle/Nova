import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";

const capabilityTags = [
  "Multimodal",
  "Agentic workflows",
  "200K context",
  "Constitutional Safety",
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      {/* subtle radial backdrop — brand accent glow at top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, hsl(var(--brand-accent) / 0.18) 0%, transparent 70%)",
        }}
      />
      {/* fine grid pattern — subtle texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="container relative mx-auto px-6 pb-24 pt-20 sm:pb-32 sm:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <Pill variant="mono" dot>
            Now in production · {brand.model.flagship}
          </Pill>

          <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-display-md md:text-display-lg lg:text-display-xl">
            {brand.tagline.primary}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {brand.model.descriptionKr}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="#demo">
                Try the demo
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/benchmarks">Read benchmarks</Link>
            </Button>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
            {capabilityTags.map((tag) => (
              <Pill key={tag} variant="mono">
                {tag}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
