import { getTranslations } from "next-intl/server";

import { brand } from "@/lib/brand";

type ModelKey = "nexora1" | "nexora1Pro" | "nexora1Ultra" | "nexoraK";

type ModelSpec = {
  key: ModelKey;
  id: string;
  context: string;
  output: string;
  parallel: string;
  priceIn: string;
  priceOut: string;
  ttft: string;
  highlight?: boolean;
};

const models: ModelSpec[] = [
  {
    key: "nexora1",
    id: "nexora-1-2026-05",
    context: "3,000,000",
    output: "64,000",
    parallel: "32",
    priceIn: "$1.20",
    priceOut: "$5.00",
    ttft: "380 ms",
    highlight: true,
  },
  {
    key: "nexora1Pro",
    id: "nexora-1-pro-2026-05",
    context: "3,000,000",
    output: "64,000",
    parallel: "32",
    priceIn: "$3.50",
    priceOut: "$17.50",
    ttft: "480 ms",
  },
  {
    key: "nexora1Ultra",
    id: "nexora-1-ultra-2026-05",
    context: "3,000,000",
    output: "64,000",
    parallel: "32",
    priceIn: "$10.00",
    priceOut: "$50.00",
    ttft: "780 ms",
  },
  {
    key: "nexoraK",
    id: "nexora-k-2026-05",
    context: "1,000,000",
    output: "32,000",
    parallel: "16",
    priceIn: "$0.40",
    priceOut: "$1.50",
    ttft: "220 ms",
  },
];

export async function ModelsSection() {
  const t = await getTranslations("docs.models");
  const tCols = await getTranslations("docs.models.columns");
  const tModels = await getTranslations("docs.models.models");

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
          {t("intro")}
        </p>
      </div>

      {/* Table */}
      <div className="-mx-2 overflow-x-auto rounded-lg border bg-background/40 px-2">
        <table
          className="w-full min-w-[840px] border-collapse text-left text-sm"
          aria-label={t("tableLabel")}
        >
          <thead>
            <tr className="border-b border-border/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="px-3 py-3 font-semibold">{tCols("model")}</th>
              <th className="px-3 py-3 font-mono">{tCols("context")}</th>
              <th className="px-3 py-3 font-mono">{tCols("output")}</th>
              <th className="px-3 py-3 font-mono">{tCols("parallel")}</th>
              <th className="px-3 py-3 font-mono">{tCols("priceIn")}</th>
              <th className="px-3 py-3 font-mono">{tCols("priceOut")}</th>
              <th className="px-3 py-3 font-mono">{tCols("ttft")}</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr
                key={m.key}
                className="border-b border-border/40 last:border-b-0 align-top"
              >
                <td className="px-3 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">
                      {tModels(`${m.key}.name`)}
                    </span>
                    <code className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                      {m.id}
                    </code>
                    {m.highlight ? (
                      <span className="mt-1 inline-flex w-fit rounded-md border border-[hsl(var(--brand-accent)/0.4)] bg-[hsl(var(--brand-accent)/0.1)] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[hsl(var(--brand-accent))]">
                        Default
                      </span>
                    ) : null}
                  </div>
                </td>
                <td className="px-3 py-4 font-mono text-foreground/85">
                  {m.context}
                </td>
                <td className="px-3 py-4 font-mono text-foreground/85">
                  {m.output}
                </td>
                <td className="px-3 py-4 font-mono text-foreground/85">
                  {m.parallel}
                </td>
                <td className="px-3 py-4 font-mono text-foreground/85">
                  {m.priceIn}
                </td>
                <td className="px-3 py-4 font-mono text-foreground/85">
                  {m.priceOut}
                </td>
                <td className="px-3 py-4 font-mono text-foreground/85">
                  {m.ttft}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best for descriptions */}
      <div className="grid gap-4 sm:grid-cols-2">
        {models.map((m) => (
          <div
            key={m.key}
            className="rounded-lg border border-border/60 bg-muted/30 p-4"
          >
            <p className="font-semibold tracking-tight text-foreground">
              {tModels(`${m.key}.name`)}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {tModels(`${m.key}.bestFor`)}
            </p>
          </div>
        ))}
      </div>

      {/* Footnote */}
      <p className="border-t border-border/40 pt-6 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground/70">
        {t("footnote", { company: brand.company.name })}
      </p>
    </div>
  );
}
