import { getTranslations } from "next-intl/server";
import { Building2, MapPin, Train } from "lucide-react";

import { brand } from "@/lib/brand";

type StatKey = "floor" | "desks" | "coffee";

const stats: StatKey[] = ["floor", "desks", "coffee"];

export async function Office() {
  const t = await getTranslations("careers.office");
  const tStats = await getTranslations("careers.office.stats");

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
          {t("body", { company: brand.company.name })}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-5">
        {/* Address card */}
        <div className="rounded-xl border border-border/60 bg-muted/30 p-6 lg:col-span-2">
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-muted-foreground">
            {t("addressLabel")}
          </p>
          <address className="mt-3 not-italic">
            <p className="text-lg font-semibold tracking-tight text-foreground">
              {t("addressLine1")}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-foreground/85">
              {t("addressLine2")}
            </p>
            <p className="text-sm leading-relaxed text-foreground/85">
              {t("addressLine3")}
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {t("addressZip")}
            </p>
          </address>

          <p className="mt-6 border-t border-border/40 pt-4 text-xs leading-relaxed text-muted-foreground">
            {t("footnote")}
          </p>
        </div>

        {/* Map placeholder */}
        <div className="overflow-hidden rounded-xl border border-border/60 bg-[radial-gradient(circle_at_center,hsl(var(--brand-accent)/0.18),transparent_55%)] lg:col-span-3">
          <p className="border-b border-border/40 px-4 py-3 font-mono text-[10px] uppercase tracking-widest2 text-muted-foreground">
            {t("mapLabel")}
          </p>
          <div className="relative aspect-[16/10] w-full">
            {/* Grid lines as map illusion */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:48px_48px] opacity-50"
            />

            {/* Building marker */}
            <div className="absolute left-[58%] top-[42%] flex flex-col items-center">
              <span className="relative inline-flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--brand-accent)/0.5)]" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[hsl(var(--brand-accent))]" />
              </span>
              <span className="mt-2 inline-flex items-center gap-1 rounded-md border bg-background/95 px-2 py-1 font-mono text-[10px] uppercase tracking-widest shadow-sm">
                <Building2 className="h-3 w-3" aria-hidden="true" />
                {t("mapPlaceholderBuilding")}
              </span>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                {t("mapPlaceholderStreet")}
              </span>
            </div>

            {/* Station marker */}
            <div className="absolute right-[12%] bottom-[18%] flex items-center gap-1.5 rounded-md border bg-background/95 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground shadow-sm">
              <Train className="h-3 w-3" aria-hidden="true" />
              {t("mapPlaceholderStation")}
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-3">
        {stats.map((key) => (
          <div
            key={key}
            className="rounded-xl border border-border/60 bg-background/40 p-5"
          >
            <p className="font-mono text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {tStats(`${key}.value`)}
            </p>
            <p className="mt-2 text-sm font-semibold tracking-tight text-foreground/90">
              {tStats(`${key}.label`)}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {tStats(`${key}.footnote`)}
            </p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-6 flex max-w-6xl items-center gap-2 font-mono text-[10px] uppercase tracking-widest2 text-muted-foreground/70">
        <MapPin className="h-3 w-3" aria-hidden="true" />
        {t("photoCaption")}
      </p>
    </section>
  );
}
