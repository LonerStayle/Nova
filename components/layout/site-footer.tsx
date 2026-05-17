import Link from "next/link";

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

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-6 w-6 rounded-md shadow-sm"
                style={{
                  backgroundImage: `linear-gradient(135deg, hsl(${brand.palette.primary.hsl}) 0%, hsl(${brand.palette.accent.hsl}) 100%)`,
                }}
              />
              <span className="text-sm font-semibold tracking-tight">
                {brand.company.name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {brand.company.locationKr}
            </p>
            <p className="text-xs text-muted-foreground">
              © {year} {brand.company.legalName}
            </p>
          </div>

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

        <div className="mt-12 border-t border-border/40 pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground/70">
              Parody Disclosure:{" "}
            </span>
            {brand.disclosure.short}{" "}
            <Link
              href="/about#disclosure"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              자세히 보기
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
