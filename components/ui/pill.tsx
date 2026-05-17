import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-muted/40 text-foreground/90",
        accent:
          "border-[hsl(var(--brand-accent)/0.4)] bg-[hsl(var(--brand-accent)/0.1)] text-foreground",
        outline: "border-border bg-transparent text-foreground/80",
        mono: "border-border bg-muted/40 font-mono uppercase tracking-wider text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {
  dot?: boolean;
}

export function Pill({
  variant,
  dot = false,
  className,
  children,
  ...props
}: PillProps) {
  return (
    <span className={cn(pillVariants({ variant }), className)} {...props}>
      {dot ? (
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-brand-accent"
        />
      ) : null}
      {children}
    </span>
  );
}
