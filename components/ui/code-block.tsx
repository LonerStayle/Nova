import * as React from "react";

import { cn } from "@/lib/utils";

interface CodeBlockProps {
  language?: string;
  filename?: string;
  className?: string;
  children: React.ReactNode;
}

export function CodeBlock({
  language,
  filename,
  className,
  children,
}: CodeBlockProps) {
  const hasHeader = Boolean(filename || language);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-muted/40",
        className,
      )}
    >
      {hasHeader ? (
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 text-xs text-muted-foreground">
          <span className="truncate font-mono">{filename ?? ""}</span>
          {language ? (
            <span className="font-mono uppercase tracking-wider">
              {language}
            </span>
          ) : null}
        </div>
      ) : null}
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
        <code className="font-mono text-foreground/90">{children}</code>
      </pre>
    </div>
  );
}
