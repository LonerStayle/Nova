import * as React from "react";
import { ArrowDown, ArrowUp, Minus, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DeltaTrend = "up" | "down" | "neutral";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: string;
  deltaTrend?: DeltaTrend;
  caption?: string;
  className?: string;
}

const deltaToneClass: Record<DeltaTrend, string> = {
  up: "text-emerald-600 dark:text-emerald-400",
  down: "text-rose-600 dark:text-rose-400",
  neutral: "text-muted-foreground",
};

const deltaIcon: Record<DeltaTrend, LucideIcon> = {
  up: ArrowUp,
  down: ArrowDown,
  neutral: Minus,
};

export function MetricCard({
  label,
  value,
  unit,
  delta,
  deltaTrend = "neutral",
  caption,
  className,
}: MetricCardProps) {
  const Icon = deltaIcon[deltaTrend];

  return (
    <Card className={cn("p-6", className)}>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        {unit ? (
          <span className="text-base text-muted-foreground">{unit}</span>
        ) : null}
      </div>
      {delta ? (
        <div
          className={cn(
            "mt-2 flex items-center gap-1 text-xs font-medium",
            deltaToneClass[deltaTrend],
          )}
        >
          <Icon className="h-3 w-3" aria-hidden="true" />
          <span>{delta}</span>
        </div>
      ) : null}
      {caption ? (
        <p className="mt-3 text-xs text-muted-foreground">{caption}</p>
      ) : null}
    </Card>
  );
}
