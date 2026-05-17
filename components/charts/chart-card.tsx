import * as React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  caption?: string;
  className?: string;
  children: React.ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  caption,
  className,
  children,
}: ChartCardProps) {
  return (
    <Card className={cn("flex flex-col overflow-hidden", className)}>
      <div className="border-b border-border/40 p-6">
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        {subtitle ? (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      <div className="flex-1 p-4">{children}</div>
      {caption ? (
        <div className="border-t border-border/40 bg-muted/30 px-6 py-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            {caption}
          </p>
        </div>
      ) : null}
    </Card>
  );
}
