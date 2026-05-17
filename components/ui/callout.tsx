import * as React from "react";
import {
  AlertTriangle,
  Info,
  ShieldAlert,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "warning" | "danger" | "accent";

const calloutVariants = cva("flex gap-3 rounded-lg border p-4", {
  variants: {
    variant: {
      info: "border-border bg-muted/40 text-foreground",
      warning:
        "border-amber-500/40 bg-amber-500/10 text-foreground dark:bg-amber-500/5",
      danger:
        "border-rose-500/40 bg-rose-500/10 text-foreground dark:bg-rose-500/5",
      accent:
        "border-[hsl(var(--brand-accent)/0.4)] bg-[hsl(var(--brand-accent)/0.1)] text-foreground",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const variantIcon: Record<CalloutVariant, LucideIcon> = {
  info: Info,
  warning: AlertTriangle,
  danger: ShieldAlert,
  accent: Sparkles,
};

interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string;
}

export function Callout({
  variant,
  title,
  className,
  children,
  ...props
}: CalloutProps) {
  const resolved: CalloutVariant = variant ?? "info";
  const Icon = variantIcon[resolved];

  return (
    <div className={cn(calloutVariants({ variant }), className)} {...props}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="flex-1 space-y-1 text-sm">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
