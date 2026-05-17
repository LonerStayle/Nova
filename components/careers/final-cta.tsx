import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Users, type LucideIcon } from "lucide-react";

type CardKey = "apply" | "refer";

const cards: { key: CardKey; icon: LucideIcon; mailto: string }[] = [
  { key: "apply", icon: Briefcase, mailto: "hiring@nexora.ai" },
  { key: "refer", icon: Users, mailto: "refer@nexora.ai" },
];

export async function CareersFinalCta() {
  const t = await getTranslations("careers.finalCta");
  const tCards = await getTranslations("careers.finalCta.cards");

  return (
    <section className="border-t border-border/40 bg-muted/10">
      <div className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("heading")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("body")}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {cards.map(({ key, icon: Icon, mailto }) => (
            <Link
              key={key}
              href={`mailto:${mailto}`}
              className="group rounded-xl border border-border/60 bg-background p-6 transition-colors hover:border-[hsl(var(--brand-accent)/0.5)]"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight sm:text-lg">
                {tCards(`${key}.name`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tCards(`${key}.description`)}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-medium tracking-wide text-foreground transition-colors group-hover:text-[hsl(var(--brand-accent))]">
                {tCards(`${key}.cta`)}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-4xl text-center font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground/70">
          {t("footnote")}
        </p>
      </div>
    </section>
  );
}
