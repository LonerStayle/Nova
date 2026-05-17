import type { Metadata } from "next";

import { brand } from "@/lib/brand";
import { SectionHeading } from "@/components/ui/section-heading";
import { CapabilityCard } from "@/components/sections/capability-card";
import { capabilities } from "@/lib/data/capabilities";

export const metadata: Metadata = {
  title: "Capabilities",
  description: `${brand.model.flagship} capabilities — multimodal reasoning, long-context understanding, tool use, code generation, and agentic workflows.`,
};

export default function CapabilitiesPage() {
  return (
    <main className="container mx-auto px-6 py-24">
      <SectionHeading
        eyebrow="Model Capabilities"
        title="Capabilities"
        description={`What ${brand.model.flagship} can do — across modalities, context, tools, code, and agentic reasoning.`}
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {capabilities.map((cap, index) => (
          <CapabilityCard
            key={cap.name}
            category={cap.category}
            name={cap.name}
            description={cap.description}
            icon={cap.icon}
            specs={cap.specs}
            className={
              index === capabilities.length - 1 ? "lg:col-span-2" : undefined
            }
          />
        ))}
      </div>
    </main>
  );
}
