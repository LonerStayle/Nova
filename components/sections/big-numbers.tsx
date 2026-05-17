import { useTranslations } from "next-intl";

const itemKeys = ["params", "context", "mmlu", "gpus"] as const;

export function BigNumbers() {
  const t = useTranslations("home.bigNumbers");
  const tItems = useTranslations("home.bigNumbers.items");

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-muted/20">
      {/* subtle brand gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(80% 50% at 50% 0%, hsl(var(--brand-accent) / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container relative mx-auto px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-brand-accent/80">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-display-sm">
            {t("heading")}
          </h2>
        </div>

        <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-x-8 gap-y-10 sm:gap-y-12 lg:grid-cols-4">
          {itemKeys.map((key) => {
            const unit = tItems(`${key}.unit`);
            return (
              <div
                key={key}
                className="flex flex-col items-center text-center"
              >
                <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
                  {tItems(`${key}.label`)}
                </dt>
                <dd className="mt-3 flex items-baseline gap-1">
                  <span className="text-5xl font-bold tracking-tight tabular-nums text-foreground sm:text-6xl">
                    {tItems(`${key}.value`)}
                  </span>
                  {unit ? (
                    <span className="text-2xl font-semibold text-muted-foreground sm:text-3xl">
                      {unit}
                    </span>
                  ) : null}
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="mt-14 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground/45">
          {t("caption")}
        </p>
      </div>
    </section>
  );
}
