import { useTranslations } from "next-intl";
import { Check, Circle, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

const milestones = [
  "q3_2025",
  "q4_2025",
  "q1_2026",
  "q2_2026",
  "q3_2026",
  "q4_2026",
] as const;

type MilestoneStatus = "shipped" | "current" | "planned";

const STATUS_ICON: Record<MilestoneStatus, typeof Check> = {
  shipped: Check,
  current: Sparkles,
  planned: Circle,
};

export function Roadmap() {
  const t = useTranslations("home.roadmap");
  const tMs = useTranslations("home.roadmap.milestones");
  const tStatus = useTranslations("home.roadmap.statusLabels");

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

      <ol className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {milestones.map((key) => {
          const status = tMs(`${key}.status`) as MilestoneStatus;
          const StatusIcon = STATUS_ICON[status] ?? Circle;
          const isCurrent = status === "current";
          const isPlanned = status === "planned";
          return (
            <li
              key={key}
              className={cn(
                "relative flex flex-col rounded-lg border bg-background/60 p-5 transition-all duration-300 hover:shadow-md",
                isCurrent
                  ? "border-[hsl(var(--brand-accent)/0.5)] shadow-[0_0_0_3px_hsl(var(--brand-accent)/0.08)]"
                  : "border-border/60 hover:border-foreground/15",
                isPlanned && "opacity-70",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest2 text-muted-foreground/70">
                  {tMs(`${key}.quarter`)}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest",
                    isCurrent &&
                      "border-[hsl(var(--brand-accent)/0.5)] bg-[hsl(var(--brand-accent)/0.1)] text-brand-accent",
                    status === "shipped" &&
                      "border-border/60 text-muted-foreground/80",
                    isPlanned && "border-dashed border-border/60 text-muted-foreground/70",
                  )}
                >
                  <StatusIcon className="h-2.5 w-2.5" aria-hidden="true" />
                  {tStatus(status)}
                </span>
              </div>
              <h3 className="mt-3 text-base font-semibold tracking-tight">
                {tMs(`${key}.title`)}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {tMs(`${key}.description`)}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
