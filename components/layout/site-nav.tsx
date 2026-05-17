"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LocaleToggle } from "@/components/layout/locale-toggle";

const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/benchmarks", labelKey: "benchmarks" },
  { href: "/capabilities", labelKey: "capabilities" },
  { href: "/architecture", labelKey: "architecture" },
  { href: "/security", labelKey: "security" },
  { href: "/docs", labelKey: "docs" },
  { href: "/careers", labelKey: "careers" },
  { href: "/about", labelKey: "about" },
] as const;

function isItemActive(itemHref: string, pathname: string) {
  if (itemHref === "/") return pathname === "/";
  return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // 라우트 변경 시 모바일 메뉴 자동 닫힘
  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // esc 키 닫기 + body scroll lock
  React.useEffect(() => {
    if (!mobileOpen) return;

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <span
            aria-hidden="true"
            className="inline-block h-6 w-6 rounded-md bg-brand-gradient shadow-sm"
          />
          <span>{brand.company.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={t("mainNav")}
        >
          {navItems.map((item) => {
            const active = isItemActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(item.labelKey)}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-[17px] h-[2px] rounded-full bg-brand-gradient-h"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right cluster: locale toggle + theme toggle + mobile hamburger */}
        <div className="flex items-center gap-1">
          <LocaleToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu — backdrop + slide-down panel */}
      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label={t("closeMenu")}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 top-16 z-40 cursor-default bg-background/60 backdrop-blur-sm md:hidden"
          />
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 z-50 border-b border-border/40 bg-background shadow-lg md:hidden"
          >
            <nav
              className="container mx-auto flex flex-col gap-1 px-6 py-4"
              aria-label={t("mobileNav")}
            >
              {navItems.map((item) => {
                const active = isItemActive(item.href, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-3 text-sm font-medium transition-colors",
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
