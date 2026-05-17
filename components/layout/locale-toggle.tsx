"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/routing";
import { routing, type Locale } from "@/i18n/routing";

export function LocaleToggle() {
  const t = useTranslations("localeToggle");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params?.locale as Locale) ?? routing.defaultLocale;
  const [isPending, startTransition] = React.useTransition();

  const onSelect = (next: Locale) => {
    if (next === currentLocale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("ariaLabel")}
      className={cn(
        "ml-1 inline-flex items-center rounded-md border border-border/60 bg-background/60 p-0.5 text-[10px] font-mono uppercase tracking-widest",
        isPending && "opacity-60",
      )}
    >
      {routing.locales.map((locale) => {
        const active = locale === currentLocale;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => onSelect(locale)}
            aria-pressed={active}
            disabled={isPending}
            className={cn(
              "rounded px-1.5 py-0.5 transition-colors",
              active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {locale === "ko" ? t("ko") : t("en")}
          </button>
        );
      })}
    </div>
  );
}
