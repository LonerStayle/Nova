import { useTranslations } from "next-intl";
import { BookOpenText, Briefcase, Github, Twitter } from "lucide-react";

import { brand } from "@/lib/brand";
import { Link } from "@/i18n/routing";

const footerGroups = [
  {
    headingKey: "product",
    items: [
      { href: "/benchmarks", labelKey: "benchmarks" as const, group: "nav" as const },
      { href: "/capabilities", labelKey: "capabilities" as const, group: "nav" as const },
      { href: "/architecture", labelKey: "architecture" as const, group: "nav" as const },
    ],
  },
  {
    headingKey: "safety",
    items: [
      { href: "/security", labelKey: "security" as const, group: "nav" as const },
      { href: "/about", labelKey: "about" as const, group: "nav" as const },
    ],
  },
  {
    headingKey: "research",
    items: [
      { href: "/", labelKey: "papersComingSoon" as const, group: "footerItems" as const },
      { href: "/", labelKey: "blogComingSoon" as const, group: "footerItems" as const },
    ],
  },
] as const;

const socials = [
  {
    href: `https://twitter.com/${brand.social.twitter.replace("@", "")}`,
    labelKey: "twitter" as const,
    icon: Twitter,
  },
  {
    href: `https://github.com/${brand.social.github}`,
    labelKey: "github" as const,
    icon: Github,
  },
  {
    href: `https://${brand.social.research}`,
    labelKey: "research" as const,
    icon: BookOpenText,
  },
  {
    href: `https://${brand.social.careers}`,
    labelKey: "careers" as const,
    icon: Briefcase,
  },
] as const;

export function SiteFooter() {
  const tBrand = useTranslations("brand");
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  const renderItemLabel = (
    group: "nav" | "footerItems",
    key: string,
  ) => {
    if (group === "nav") {
      return tNav(key as Parameters<typeof tNav>[0]);
    }
    return tFooter(`items.${key}` as Parameters<typeof tFooter>[0]);
  };

  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-7 w-7 rounded-md bg-brand-gradient shadow-sm"
              />
              <span className="text-sm font-semibold tracking-tight">
                {brand.company.name}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {tBrand("tagline")}
            </p>
            <ul
              className="flex items-center gap-1 pt-1"
              aria-label={tFooter("social.ariaLabel")}
            >
              {socials.map(({ href, labelKey, icon: Icon }) => (
                <li key={labelKey}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label={tFooter(`social.${labelKey}`)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav mirror */}
          {footerGroups.map((group) => (
            <div key={group.headingKey} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {tFooter(`groups.${group.headingKey}`)}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item, idx) => (
                  <li key={`${item.labelKey}-${idx}`}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {renderItemLabel(item.group, item.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Parody disclosure */}
        <div className="mt-12 border-t border-border/40 pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground/80">
              {tFooter("disclosure.label")}
            </span>
            <span aria-hidden="true" className="mx-1.5 text-muted-foreground/50">
              ·
            </span>
            {tFooter("disclosure.body")}{" "}
            <Link
              href="/about#disclosure"
              className="font-medium text-foreground/70 underline underline-offset-2 transition-colors hover:text-foreground"
            >
              {tFooter("disclosure.more")}
            </Link>
          </p>
        </div>

        {/* Copyright + version */}
        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {year} {brand.company.legalName}
            <span aria-hidden="true" className="mx-2 text-muted-foreground/40">
              ·
            </span>
            <span className="text-foreground/60">
              {brand.company.locationKr}
            </span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            {tFooter("buildMeta")}
          </p>
        </div>
      </div>
    </footer>
  );
}
