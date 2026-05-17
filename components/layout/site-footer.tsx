import Link from "next/link";
import { BookOpenText, Briefcase, Github, Twitter } from "lucide-react";

import { brand } from "@/lib/brand";

const footerGroups = [
  {
    heading: "Product",
    items: [
      { href: "/benchmarks", label: "Benchmarks" },
      { href: "/capabilities", label: "Capabilities" },
      { href: "/architecture", label: "Architecture" },
    ],
  },
  {
    heading: "Safety",
    items: [
      { href: "/security", label: "Security" },
      { href: "/about", label: "About" },
    ],
  },
  {
    heading: "Research",
    items: [
      { href: "/", label: "Papers (coming soon)" },
      { href: "/", label: "Blog (coming soon)" },
    ],
  },
] as const;

const socials = [
  {
    href: `https://twitter.com/${brand.social.twitter.replace("@", "")}`,
    label: "Twitter / X",
    icon: Twitter,
  },
  {
    href: `https://github.com/${brand.social.github}`,
    label: "GitHub",
    icon: Github,
  },
  {
    href: `https://${brand.social.research}`,
    label: "Research",
    icon: BookOpenText,
  },
  {
    href: `https://${brand.social.careers}`,
    label: "Careers",
    icon: Briefcase,
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

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
              {brand.tagline.primary}
              <br />
              <span className="text-foreground/50">
                {brand.tagline.primaryKr}
              </span>
            </p>
            <ul className="flex items-center gap-1 pt-1" aria-label="Social">
              {socials.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label={label}
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
            <div key={group.heading} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.heading}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {item.label}
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
              Parody Disclosure
            </span>
            <span aria-hidden="true" className="mx-1.5 text-muted-foreground/50">
              ·
            </span>
            {brand.disclosure.short}{" "}
            <Link
              href="/about#disclosure"
              className="font-medium text-foreground/70 underline underline-offset-2 transition-colors hover:text-foreground"
            >
              자세히
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
            Build · v1.0.0-frontier · {brand.model.flagship}
          </p>
        </div>
      </div>
    </footer>
  );
}
