import { getTranslations } from "next-intl/server";
import {
  CheckCircle2,
  ClipboardList,
  MessagesSquare,
  PhoneCall,
  Users,
  type LucideIcon,
} from "lucide-react";

type StepKey =
  | "application"
  | "recruiterCall"
  | "technical"
  | "onsite"
  | "offer";

const steps: { key: StepKey; icon: LucideIcon }[] = [
  { key: "application", icon: ClipboardList },
  { key: "recruiterCall", icon: PhoneCall },
  { key: "technical", icon: MessagesSquare },
  { key: "onsite", icon: Users },
  { key: "offer", icon: CheckCircle2 },
];

export async function HiringProcess() {
  const t = await getTranslations("careers.hiringProcess");
  const tSteps = await getTranslations("careers.hiringProcess.steps");

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

      <ol className="mx-auto mt-14 max-w-5xl space-y-4">
        {steps.map(({ key, icon: Icon }, index) => (
          <li
            key={key}
            className="relative rounded-xl border border-border/60 bg-background/60 p-6 transition-colors hover:border-border"
          >
            <div className="flex items-start gap-5">
              <div className="flex flex-col items-center gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest2 text-muted-foreground/70">
                  {t("stepLabel")} {index + 1}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                    {tSteps(`${key}.name`)}
                  </h3>
                  <span className="inline-flex rounded-md border border-[hsl(var(--brand-accent)/0.4)] bg-[hsl(var(--brand-accent)/0.1)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--brand-accent))]">
                    {tSteps(`${key}.duration`)}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {tSteps(`${key}.description`)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-10 max-w-5xl border-t border-border/40 pt-6 text-center text-sm leading-relaxed text-muted-foreground">
        {t("footnote")}
      </p>
    </section>
  );
}
