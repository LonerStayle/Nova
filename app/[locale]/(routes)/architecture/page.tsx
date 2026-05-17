import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { brand } from "@/lib/brand";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArchitectureDiagram } from "@/components/sections/architecture-diagram";
import {
  archLayerIds,
  archLayerMeta,
  type ArchLayer,
} from "@/lib/data/architecture";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "architecture" });
  return {
    title: t("title"),
    description: t("metaDescription", { company: brand.company.name }),
  };
}

export default async function ArchitecturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("architecture");
  const tLayers = await getTranslations("architecture.layers");
  const tPatents = await getTranslations("architecture.patents");

  const layers: readonly ArchLayer[] = archLayerIds.map((id) => {
    const meta = archLayerMeta[id];
    const components = meta.componentKeys.map((key) => ({
      name: tLayers(`${id}.components.${key}.name`),
      description: tLayers(`${id}.components.${key}.description`),
    }));
    return {
      id,
      level: meta.level,
      icon: meta.icon,
      accent: meta.accent,
      name: tLayers(`${id}.name`),
      tagline: tLayers(`${id}.tagline`),
      description: tLayers(`${id}.description`, {
        model: brand.model.flagship,
      }),
      components,
    };
  });

  return (
    <main className="container mx-auto px-6 py-24">
      <SectionHeading
        as="h1"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-16">
        <ArchitectureDiagram layers={layers} />
      </div>

      <div className="mx-auto mt-20 max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          {tPatents("eyebrow")}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {tPatents("body")}
        </p>
      </div>
    </main>
  );
}
