import * as React from "react";
import { type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

interface CapabilityCardProps {
  category: string;
  name: string;
  description: string;
  icon: LucideIcon;
  specs: ReadonlyArray<{ label: string; value: string }>;
  className?: string;
}

export function CapabilityCard({
  category,
  name,
  description,
  icon: Icon,
  specs,
  className,
}: CapabilityCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col p-6 transition-all duration-300 hover:border-foreground/15 hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm"
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-2">
          <Pill variant="mono">{category}</Pill>
          <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-border/40 pt-6 sm:grid-cols-2">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex items-center justify-between gap-4 text-xs"
          >
            <dt className="truncate text-muted-foreground">{spec.label}</dt>
            <dd className="shrink-0 font-mono font-medium text-foreground/90">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
