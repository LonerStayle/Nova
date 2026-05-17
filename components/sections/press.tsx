import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

const items = ["foundation", "aiIndex", "frontierDaily", "tokenized"] as const;

export function Press() {
  const t = useTranslations("home.press");
  const tItems = useTranslations("home.press.items");

  return (
    <section className="border-y border-border/40 bg-muted/10">
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

        <ul className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
          {items.map((key) => (
            <li
              key={key}
              className="relative flex flex-col rounded-lg border border-border/60 bg-background/70 p-6 transition-all duration-300 hover:border-foreground/15 hover:shadow-md"
            >
              <Quote
                aria-hidden="true"
                className="h-5 w-5 text-brand-accent/70"
              />
              <p className="mt-4 text-base leading-relaxed text-foreground/90">
                {tItems(`${key}.quote`)}
              </p>
              <div className="mt-6 border-t border-border/40 pt-4">
                <p className="font-mono text-[11px] uppercase tracking-widest2 text-foreground/80">
                  {tItems(`${key}.outlet`)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tItems(`${key}.byline`)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground/45">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
