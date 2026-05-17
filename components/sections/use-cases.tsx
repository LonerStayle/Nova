import { useTranslations } from "next-intl";
import {
  BarChart3,
  GitPullRequest,
  Headphones,
  Megaphone,
  Mic,
  Scale,
} from "lucide-react";

const cards = [
  { key: "support", icon: Headphones },
  { key: "legal", icon: Scale },
  { key: "marketing", icon: Megaphone },
  { key: "code", icon: GitPullRequest },
  { key: "data", icon: BarChart3 },
  { key: "voice", icon: Mic },
] as const;

export function UseCases() {
  const t = useTranslations("home.useCases");
  const tCards = useTranslations("home.useCases.cards");

  return (
    <section className="container mx-auto px-6 py-24">
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

      <ul className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ key, icon: Icon }) => (
          <li
            key={key}
            className="group flex items-start gap-4 rounded-lg border border-border/60 bg-background/60 p-5 transition-all duration-300 hover:border-foreground/15 hover:shadow-md"
          >
            <div
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm"
            >
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div className="flex-1 space-y-1.5">
              <h3 className="text-base font-semibold tracking-tight">
                {tCards(`${key}.name`)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {tCards(`${key}.description`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
