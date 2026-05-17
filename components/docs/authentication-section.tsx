import { getTranslations } from "next-intl/server";
import {
  Cog,
  GitMerge,
  Lock,
  ScrollText,
  type LucideIcon,
} from "lucide-react";

import { brand } from "@/lib/brand";
import { CodeBlock } from "@/components/ui/code-block";

type PracticeKey = "envVars" | "scopes" | "rotation" | "audit";

const practices: { key: PracticeKey; icon: LucideIcon }[] = [
  { key: "envVars", icon: Lock },
  { key: "scopes", icon: Cog },
  { key: "rotation", icon: GitMerge },
  { key: "audit", icon: ScrollText },
];

const authHeaderExample = `# Required on every request
Authorization: Bearer sk-nexora-2026-XXXXXXXXXXXXXXXX

# Optional but recommended
Nexora-Version: 2026-04-01
Content-Type: application/json`;

export async function AuthenticationSection() {
  const t = await getTranslations("docs.authentication");
  const tPractices = await getTranslations("docs.authentication.bestPractices");
  const tTitles = await getTranslations("docs.authentication.bestPracticeTitles");

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
          {t("intro", { company: brand.company.name })}
        </p>
      </div>

      {/* Header example */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {t("exampleTitle")}
        </h3>
        <CodeBlock
          language="http"
          filename={t("exampleFilename")}
          className="mt-3"
        >
          {authHeaderExample}
        </CodeBlock>
      </div>

      {/* Rotation */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {t("rotationTitle")}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {t("rotationBody")}
        </p>
      </div>

      {/* Best practices */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {t("bestPracticesTitle")}
        </h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {practices.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="rounded-lg border border-border/60 bg-muted/30 p-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-gradient text-white shadow-sm">
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <p className="font-semibold tracking-tight text-foreground">
                  {tTitles(key)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {tPractices(key, { company: brand.company.name })}
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
