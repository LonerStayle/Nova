import { useTranslations } from "next-intl";
import { ArrowRight, Boxes, ChevronRight, Cpu, Layers, Network } from "lucide-react";

import { Link } from "@/i18n/routing";

const layers = [
  { key: "orchestration", icon: Network },
  { key: "multiAgent", icon: Boxes },
  { key: "agentOs", icon: Layers },
  { key: "harness", icon: Cpu },
] as const;

export function ArchitectureTeaser() {
  const t = useTranslations("home.archTeaser");
  const tLayers = useTranslations("home.archTeaser.layers");

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-brand-accent/80">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("heading")}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          {t("body")}
        </p>
      </div>

      {/* 4 layer pipeline */}
      <ol
        className="mx-auto mt-14 flex max-w-5xl flex-col items-stretch gap-3 md:flex-row md:gap-2"
        aria-label="Architecture layers"
      >
        {layers.map(({ key, icon: Icon }, idx) => {
          const isLast = idx === layers.length - 1;
          return (
            <li
              key={key}
              className="flex flex-1 items-stretch gap-2 md:flex-col md:items-stretch"
            >
              <div className="flex-1 rounded-lg border border-border/60 bg-background/60 p-4 transition-all hover:border-foreground/15 hover:shadow-md md:p-5">
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-3">
                  <div
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm md:h-11 md:w-11"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-widest2 text-muted-foreground/60">
                      {tLayers(`${key}.level`)}
                    </span>
                    <h3 className="text-base font-semibold tracking-tight">
                      {tLayers(`${key}.name`)}
                    </h3>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {tLayers(`${key}.description`)}
                </p>
              </div>

              {/* connector — only between cards, not after last */}
              {!isLast ? (
                <div
                  aria-hidden="true"
                  className="flex shrink-0 items-center justify-center md:rotate-0"
                >
                  <ChevronRight className="h-4 w-4 rotate-90 text-muted-foreground/40 md:rotate-0" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-12 flex justify-center">
        <Link
          href="/architecture"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand-accent"
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
