import { useTranslations } from "next-intl";
import { ArrowRight, BookOpen, Briefcase, Sparkles } from "lucide-react";

import { Link } from "@/i18n/routing";

interface CardItem {
  key: "demo" | "docs" | "careers";
  icon: typeof Sparkles;
  href: string;
}

const cards: readonly CardItem[] = [
  { key: "demo", icon: Sparkles, href: "/#demo" },
  { key: "docs", icon: BookOpen, href: "/docs" },
  { key: "careers", icon: Briefcase, href: "/careers" },
];

export function FinalCta() {
  const t = useTranslations("home.finalCta");
  const tCards = useTranslations("home.finalCta.cards");

  return (
    <section className="border-t border-border/40 bg-muted/10">
      <div className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-brand-accent/80">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {t("body")}
          </p>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3">
          {cards.map(({ key, icon: Icon, href }) => (
            <li key={key}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-lg border border-border/60 bg-background/70 p-6 transition-all duration-300 hover:border-foreground/15 hover:shadow-md"
              >
                <div
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm"
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {tCards(`${key}.name`)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {tCards(`${key}.description`)}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-brand-accent">
                  {tCards(`${key}.cta`)}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
