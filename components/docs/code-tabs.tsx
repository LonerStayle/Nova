"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type CodeTab = {
  id: string;
  label: string;
  language: string;
  filename?: string;
  code: string;
};

interface CodeTabsProps {
  tabs: CodeTab[];
  defaultTab?: string;
  ariaLabel?: string;
  className?: string;
}

export function CodeTabs({
  tabs,
  defaultTab,
  ariaLabel,
  className,
}: CodeTabsProps) {
  const [activeId, setActiveId] = React.useState<string>(
    defaultTab ?? tabs[0]?.id ?? "",
  );

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  if (!activeTab) return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-muted/40",
        className,
      )}
    >
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex items-center border-b border-border/60 bg-background/40"
      >
        <div className="flex flex-1 items-center gap-0.5 overflow-x-auto px-2 py-1.5">
          {tabs.map((tab) => {
            const active = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`code-tab-panel-${tab.id}`}
                id={`code-tab-${tab.id}`}
                onClick={() => setActiveId(tab.id)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        {activeTab.filename ? (
          <span className="hidden truncate px-3 font-mono text-[11px] text-muted-foreground sm:inline">
            {activeTab.filename}
          </span>
        ) : null}
      </div>
      <div
        role="tabpanel"
        id={`code-tab-panel-${activeTab.id}`}
        aria-labelledby={`code-tab-${activeTab.id}`}
      >
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
          <code className="font-mono text-foreground/90">{activeTab.code}</code>
        </pre>
      </div>
    </div>
  );
}
