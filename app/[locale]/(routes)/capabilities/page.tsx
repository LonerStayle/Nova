import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { brand } from "@/lib/brand";
import { SectionHeading } from "@/components/ui/section-heading";
import { CapabilityCard } from "@/components/sections/capability-card";
import {
  capabilityIds,
  capabilityIcons,
  capabilitySpecKeys,
  capabilitySpecValues,
} from "@/lib/data/capabilities";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "capabilities" });
  return {
    title: t("title"),
    description: t("metaDescription", { model: brand.model.flagship }),
  };
}

export default async function CapabilitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("capabilities");
  const tCards = await getTranslations("capabilities.cards");

  return (
    <main className="container mx-auto px-6 py-24">
      <SectionHeading
        as="h1"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description", { model: brand.model.flagship })}
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {capabilityIds.map((id, index) => {
          const isLast = index === capabilityIds.length - 1;
          const specs = capabilitySpecKeys[id].map((specKey) => ({
            label: tCards(`${id}.specs.${specKey}`),
            value: capabilitySpecValues[id][specKey],
          }));
          return (
            <CapabilityCard
              key={id}
              category={tCards(`${id}.category`)}
              name={tCards(`${id}.name`)}
              description={tCards(`${id}.description`)}
              icon={capabilityIcons[id]}
              specs={specs}
              className={isLast ? "lg:col-span-2" : undefined}
            />
          );
        })}
      </div>
    </main>
  );
}
