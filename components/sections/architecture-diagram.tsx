import * as React from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import type { ArchLayer } from "@/lib/data/architecture";

interface ArchitectureDiagramProps {
  layers: readonly ArchLayer[];
}

export function ArchitectureDiagram({ layers }: ArchitectureDiagramProps) {
  const t = useTranslations("architecture");
  return (
    <div className="mx-auto max-w-4xl">
      <ol className="space-y-3">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          const isLast = index === layers.length - 1;
          return (
            <React.Fragment key={layer.id}>
              <li>
                <Card
                  className={cn(
                    "p-6 transition-shadow hover:shadow-md",
                    layer.accent === "primary" &&
                      "border-[hsl(var(--brand-accent)/0.3)]",
                  )}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    {/* Level marker column */}
                    <div className="flex shrink-0 flex-row items-center gap-3 sm:flex-col sm:gap-2">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-widest2 text-muted-foreground/60">
                        {layer.level}
                      </span>
                      <div
                        aria-hidden="true"
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-lg shadow-sm",
                          layer.accent === "primary"
                            ? "bg-brand-gradient text-white"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-xl font-semibold tracking-tight">
                          {layer.name}
                        </h3>
                        <Pill variant="mono">
                          {t("layerLabel", { level: layer.level })}
                        </Pill>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {layer.tagline}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                        {layer.description}
                      </p>

                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {layer.components.map((c) => (
                          <li
                            key={c.name}
                            className="rounded-md border border-border/40 bg-muted/30 p-3"
                          >
                            <p className="text-xs font-semibold tracking-tight">
                              {c.name}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {c.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </li>

              {isLast ? null : (
                <li
                  aria-hidden="true"
                  className="flex h-8 items-center justify-center"
                >
                  <div className="flex flex-col items-center">
                    <div className="h-5 w-px bg-gradient-to-b from-border via-border/70 to-border/30" />
                    <ChevronDown className="h-4 w-4 text-muted-foreground/60" />
                  </div>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
}
