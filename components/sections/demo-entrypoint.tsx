import Link from "next/link";
import { ArrowRight, Send } from "lucide-react";

import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sampleQueries = [
  `What is ${brand.model.flagship}'s MMLU score?`,
  "Explain how AgentOS schedules multi-step tasks.",
  "How does constitutional safety alignment work?",
] as const;

export function DemoEntrypoint() {
  return (
    <section id="demo" className="container mx-auto px-6 py-20">
      <Card className="overflow-hidden border-[hsl(var(--brand-accent)/0.2)]">
        <CardContent className="p-10 sm:p-14">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
              Interactive Demo
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Try {brand.model.flagship} yourself.
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              Ask anything. Get a frontier-grade answer in milliseconds.
            </p>

            <ul className="mt-8 grid gap-2 text-left">
              {sampleQueries.map((query) => (
                <li key={query}>
                  <button
                    type="button"
                    aria-label={`Try sample query: ${query}`}
                    className="group flex w-full items-center gap-3 rounded-md border border-border/60 bg-muted/40 px-4 py-3 text-sm transition-colors hover:border-border hover:bg-muted"
                  >
                    <Send
                      className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand-accent"
                      aria-hidden="true"
                    />
                    <span className="truncate font-mono text-xs text-foreground/80">
                      {query}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <Button size="lg" className="mt-8" asChild>
              <Link href="#demo">
                Launch full demo
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground/70">
              Demo widget — Phase 3 의 hybrid retrieval 로 완성 예정.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
