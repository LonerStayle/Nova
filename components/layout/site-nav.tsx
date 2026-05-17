"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/benchmarks", label: "Benchmarks" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/architecture", label: "Architecture" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          <span
            aria-hidden="true"
            className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-primary to-accent shadow-sm"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${brand.palette.primary.hsl}) 0%, hsl(${brand.palette.accent.hsl}) 100%)`,
            }}
          />
          <span>{brand.company.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
