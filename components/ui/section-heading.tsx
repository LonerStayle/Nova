import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /**
   * heading level — page-level SectionHeading 은 as="h1", 페이지 내부 섹션은 "h2".
   * 한 페이지에 h1 은 정확히 1개 (a11y / SEO 권장).
   */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as = "h2",
  className,
}: SectionHeadingProps) {
  const HeadingTag = as;
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
      <HeadingTag className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </HeadingTag>
      {description ? (
        <p className="mt-6 text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
