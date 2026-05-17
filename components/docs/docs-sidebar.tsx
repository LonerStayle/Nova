"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type SidebarItem = {
  id: string;
  labelKey:
    | "quickstart"
    | "apiReference"
    | "streaming"
    | "toolUse"
    | "models"
    | "rateLimits"
    | "authentication"
    | "errors";
};

type SidebarGroup = {
  headingKey: "gettingStarted" | "core" | "platform";
  items: SidebarItem[];
};

const groups: SidebarGroup[] = [
  {
    headingKey: "gettingStarted",
    items: [{ id: "quickstart", labelKey: "quickstart" }],
  },
  {
    headingKey: "core",
    items: [
      { id: "api-reference", labelKey: "apiReference" },
      { id: "streaming", labelKey: "streaming" },
      { id: "tool-use", labelKey: "toolUse" },
    ],
  },
  {
    headingKey: "platform",
    items: [
      { id: "models", labelKey: "models" },
      { id: "rate-limits", labelKey: "rateLimits" },
      { id: "authentication", labelKey: "authentication" },
      { id: "errors", labelKey: "errors" },
    ],
  },
];

export function DocsSidebar() {
  const t = useTranslations("docs.sidebar");
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const sectionIds = groups.flatMap((group) =>
      group.items.map((item) => item.id),
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-96px 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label={t("label")}
      className="hidden lg:block lg:w-60 lg:shrink-0"
    >
      <nav
        className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3"
        aria-label={t("label")}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest2 text-muted-foreground/70">
          {t("label")}
        </p>
        <ul className="mt-4 space-y-6">
          {groups.map((group) => (
            <li key={group.headingKey}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t(`groups.${group.headingKey}`)}
              </p>
              <ul className="mt-2 space-y-0.5 border-l border-border/60">
                {group.items.map((item) => {
                  const active = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        aria-current={active ? "true" : undefined}
                        className={cn(
                          "block -ml-px border-l-2 px-3 py-1.5 text-sm transition-colors",
                          active
                            ? "border-[hsl(var(--brand-accent))] font-medium text-foreground"
                            : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                        )}
                      >
                        {t(`sections.${item.labelKey}`)}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
