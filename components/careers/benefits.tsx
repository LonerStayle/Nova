import { getTranslations } from "next-intl/server";
import {
  Award,
  Baby,
  BookOpenCheck,
  HeartPulse,
  Laptop,
  Palmtree,
  type LucideIcon,
} from "lucide-react";

type BenefitKey =
  | "equity"
  | "equipment"
  | "learning"
  | "wellness"
  | "childcare"
  | "pto";

const items: { key: BenefitKey; icon: LucideIcon }[] = [
  { key: "equity", icon: Award },
  { key: "equipment", icon: Laptop },
  { key: "learning", icon: BookOpenCheck },
  { key: "wellness", icon: HeartPulse },
  { key: "childcare", icon: Baby },
  { key: "pto", icon: Palmtree },
];

export async function Benefits() {
  const t = await getTranslations("careers.benefits");
  const tItems = await getTranslations("careers.benefits.items");

  return (
    <section className="border-y border-border/40 bg-muted/10">
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

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="rounded-xl border border-border/60 bg-background/60 p-6 transition-colors hover:border-border hover:bg-background"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold tracking-tight sm:text-lg">
                {tItems(`${key}.name`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {tItems(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-6xl border-t border-border/40 pt-6 text-center font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground/70">
          {t("footnote")}
        </p>
      </div>
    </section>
  );
}
