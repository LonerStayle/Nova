import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { brand } from "@/lib/brand";
import { CareersHero } from "@/components/careers/hero";
import { WhyNexora } from "@/components/careers/why-nexora";
import { OpenRoles } from "@/components/careers/open-roles";
import { Office } from "@/components/careers/office";
import { Benefits } from "@/components/careers/benefits";
import { HiringProcess } from "@/components/careers/hiring-process";
import { CareersFinalCta } from "@/components/careers/final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "careers" });
  return {
    title: `${t("hero.title")} · ${brand.company.name}`,
    description: t("metaDescription", { company: brand.company.name }),
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <CareersHero />

      <div id="why-nexora" className="scroll-mt-24">
        <WhyNexora />
      </div>

      <OpenRoles />

      <Office />

      <Benefits />

      <HiringProcess />

      <CareersFinalCta />
    </main>
  );
}
