import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { brand } from "@/lib/brand";
import { Callout } from "@/components/ui/callout";
import { SectionHeading } from "@/components/ui/section-heading";
import { TeamCard } from "@/components/sections/team-card";
import { team } from "@/lib/data/team";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return {
    title: t("about"),
    description: `About ${brand.company.name} — mission, research team, and the parody disclosure for this satirical work.`,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tDisclosure = await getTranslations("about.disclosure");

  return (
    <main className="container mx-auto px-6 py-24">
      <SectionHeading
        as="h1"
        eyebrow={t("eyebrow")}
        title={brand.company.name}
        description={t("heroDescription")}
      />

      {/* Mission */}
      <section className="mx-auto mt-16 max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          {t("missionLabel")}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-foreground/90">
          {t("missionBody")}
        </p>
      </section>

      {/* Team */}
      <section className="mt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
            {t("teamLabel")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("teamHeading", { model: brand.model.flagship })}
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              bio={member.bio}
              initials={member.initials}
            />
          ))}
        </div>
      </section>

      {/* Parody Disclosure — site's legal safe zone */}
      <section id="disclosure" className="mx-auto mt-24 max-w-3xl scroll-mt-24">
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          {tDisclosure("label")}
          <span className="ml-1.5 text-muted-foreground/40">
            {tDisclosure("labelHint")}
          </span>
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {tDisclosure("heading")}
        </h2>
        <p className="mt-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
          {tDisclosure("subheading")}
        </p>
        <div className="mt-6 space-y-4">
          <Callout variant="accent" title={tDisclosure("summaryTitle")}>
            <p className="leading-relaxed">{tDisclosure("summaryBody")}</p>
          </Callout>

          <div className="space-y-4 text-sm leading-relaxed text-foreground/85">
            <p>{tDisclosure("paragraph1")}</p>
            <p>{tDisclosure("paragraph2")}</p>
            <p className="text-xs text-muted-foreground">
              {tDisclosure("altLanguageNote")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
