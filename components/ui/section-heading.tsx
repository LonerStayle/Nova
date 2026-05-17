import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
