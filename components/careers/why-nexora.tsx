import { getTranslations } from "next-intl/server";
import {
  FlaskConical,
  Globe2,
  ScaleIcon,
  Shield,
  type LucideIcon,
} from "lucide-react";

type ValueKey = "frontier" | "korean" | "smallTeam" | "safety";

const values: { key: ValueKey; icon: LucideIcon }[] = [
  { key: "frontier", icon: FlaskConical },
  { key: "korean", icon: Globe2 },
  { key: "smallTeam", icon: ScaleIcon },
  { key: "safety", icon: Shield },
];

export async function WhyNexora() {
  const t = await getTranslations("careers.whyNexora");
  const tValues = await getTranslations("careers.whyNexora.values");

  return (
    <section className="container mx-auto px-6 py-24">
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

      <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2">
        {values.map(({ key, icon: Icon }) => (
          <div
            key={key}
            className="rounded-xl border border-border/60 bg-muted/30 p-6 transition-colors hover:border-border hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                {tValues(`${key}.name`)}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {tValues(`${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
