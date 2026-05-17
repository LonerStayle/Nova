import { getTranslations } from "next-intl/server";

import { brand } from "@/lib/brand";

type TierKey = "free" | "production" | "pro" | "enterprise";

type TierSpec = {
  key: TierKey;
  rpm: string;
  tpm: string;
  daily: string;
};

const tiers: TierSpec[] = [
  { key: "free", rpm: "5", tpm: "50,000", daily: "100,000" },
  { key: "production", rpm: "1,000", tpm: "1,500,000", daily: "50,000,000" },
  { key: "pro", rpm: "10,000", tpm: "15,000,000", daily: "1,000,000,000" },
  { key: "enterprise", rpm: "100,000+", tpm: "Custom", daily: "Custom" },
];

const responseHeaders: { name: string; key: "limit" | "remaining" | "reset" }[] = [
  { name: "X-Nexora-Ratelimit-Limit", key: "limit" },
  { name: "X-Nexora-Ratelimit-Remaining", key: "remaining" },
  { name: "X-Nexora-Ratelimit-Reset", key: "reset" },
];

export async function RateLimitsSection() {
  const t = await getTranslations("docs.rateLimits");
  const tCols = await getTranslations("docs.rateLimits.columns");
  const tTiers = await getTranslations("docs.rateLimits.tiers");
  const tHeadersList = await getTranslations("docs.rateLimits.headersList");

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

      {/* Tier table */}
      <div className="-mx-2 overflow-x-auto rounded-lg border bg-background/40 px-2">
        <table
          className="w-full min-w-[720px] border-collapse text-left text-sm"
          aria-label={t("tableLabel")}
        >
          <thead>
            <tr className="border-b border-border/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="px-3 py-3 font-semibold">{tCols("tier")}</th>
              <th className="px-3 py-3 font-mono">{tCols("rpm")}</th>
              <th className="px-3 py-3 font-mono">{tCols("tpm")}</th>
              <th className="px-3 py-3 font-mono">{tCols("daily")}</th>
              <th className="px-3 py-3">{tCols("qualify")}</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => (
              <tr
                key={tier.key}
                className="border-b border-border/40 last:border-b-0 align-top"
              >
                <td className="px-3 py-4 font-semibold text-foreground">
                  {tTiers(`${tier.key}.name`)}
                </td>
                <td className="px-3 py-4 font-mono text-foreground/85">
                  {tier.rpm}
                </td>
                <td className="px-3 py-4 font-mono text-foreground/85">
                  {tier.tpm}
                </td>
                <td className="px-3 py-4 font-mono text-foreground/85">
                  {tier.daily}
                </td>
                <td className="px-3 py-4 text-muted-foreground">
                  {tTiers(`${tier.key}.qualify`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Response headers */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {t("headersTitle")}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {t("headersBody")}
        </p>
        <div className="mt-4">
          {responseHeaders.map((h) => (
            <div
              key={h.name}
              className="border-b border-border/40 py-3 first:border-t"
            >
              <code className="font-mono text-sm font-semibold text-foreground">
                {h.name}
              </code>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {tHeadersList(h.key)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footnote */}
      <p className="border-t border-border/40 pt-6 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground/70">
        {t("footnote", { company: brand.company.name })}
      </p>
    </div>
  );
}
