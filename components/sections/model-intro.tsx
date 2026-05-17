import { useTranslations } from "next-intl";
import { ArrowRight, BookOpen, Bot, Sparkles } from "lucide-react";

import { Link } from "@/i18n/routing";
import { Card } from "@/components/ui/card";

const cards = [
  { key: "multimodal", icon: Sparkles },
  { key: "context", icon: BookOpen },
  { key: "agentic", icon: Bot },
] as const;

export function ModelIntro() {
  const t = useTranslations("home.modelIntro");
  const tCards = useTranslations("home.modelIntro.cards");

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — copy */}
        <div className="flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-brand-accent/80">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-display-sm">
            {t("heading")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t("body")}
          </p>
          <div className="mt-8">
            <Link
              href="/capabilities"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand-accent"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Right — 3 mini cards */}
        <div className="flex flex-col gap-4">
          {cards.map(({ key, icon: Icon }) => (
            <Card
              key={key}
              className="flex items-start gap-4 p-5 transition-all duration-300 hover:border-foreground/15 hover:shadow-md"
            >
              <div
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm"
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="text-base font-semibold tracking-tight">
                  {tCards(`${key}.name`)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {tCards(`${key}.description`)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
