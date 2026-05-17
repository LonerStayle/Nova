import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ExternalLink, KeyRound, Package, Send, Inbox } from "lucide-react";

import { brand } from "@/lib/brand";
import { CodeBlock } from "@/components/ui/code-block";
import { Callout } from "@/components/ui/callout";
import { CodeTabs, type CodeTab } from "@/components/docs/code-tabs";

const installTabs: CodeTab[] = [
  {
    id: "curl",
    label: "cURL",
    language: "bash",
    filename: ".env",
    code: `# Export your key once per shell session
export NEXORA_API_KEY="sk-nexora-2026-XXXXXXXXXXXX"

# Optional: pin the API version for reproducibility
export NEXORA_VERSION="2026-04-01"`,
  },
  {
    id: "typescript",
    label: "TypeScript",
    language: "bash",
    filename: "Terminal",
    code: `# npm
npm install @nexora/sdk

# pnpm
pnpm add @nexora/sdk

# Bun
bun add @nexora/sdk`,
  },
  {
    id: "python",
    label: "Python",
    language: "bash",
    filename: "Terminal",
    code: `# pip
pip install nexora

# uv
uv add nexora

# poetry
poetry add nexora`,
  },
];

const firstCallTabs: CodeTab[] = [
  {
    id: "curl",
    label: "cURL",
    language: "bash",
    filename: "first-call.sh",
    code: `curl https://api.nexora.ai/v1/messages \\
  -H "Authorization: Bearer $NEXORA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Nexora-Version: 2026-04-01" \\
  -d '{
    "model": "nexora-1-2026-05",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello, Nexora-1. Introduce yourself in one sentence."}
    ]
  }'`,
  },
  {
    id: "typescript",
    label: "TypeScript",
    language: "ts",
    filename: "first-call.ts",
    code: `import Nexora from "@nexora/sdk";

const client = new Nexora({
  apiKey: process.env.NEXORA_API_KEY,
});

const response = await client.messages.create({
  model: "nexora-1-2026-05",
  max_tokens: 1024,
  messages: [
    {
      role: "user",
      content: "Hello, Nexora-1. Introduce yourself in one sentence.",
    },
  ],
});

console.log(response.content[0].text);
// → "I'm Nexora-1, a frontier multimodal foundation model engineered in Seoul."`,
  },
  {
    id: "python",
    label: "Python",
    language: "py",
    filename: "first_call.py",
    code: `import os
from nexora import Nexora

client = Nexora(api_key=os.environ["NEXORA_API_KEY"])

response = client.messages.create(
    model="nexora-1-2026-05",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": "Hello, Nexora-1. Introduce yourself in one sentence.",
        }
    ],
)

print(response.content[0].text)
# → "I'm Nexora-1, a frontier multimodal foundation model engineered in Seoul."`,
  },
];

const responseJson = `{
  "id": "msg_01H9XQRC4P5VBJ4WZ9C2KQ8FZ7",
  "object": "message",
  "model": "nexora-1-2026-05",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'm Nexora-1, a frontier multimodal foundation model engineered in Seoul."
    }
  ],
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 18,
    "output_tokens": 17,
    "total_tokens": 35
  }
}`;

export async function QuickstartSection() {
  const t = await getTranslations("docs.quickstart");

  return (
    <div className="space-y-12">
      {/* Heading */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {t("intro", { model: brand.model.flagship })}
        </p>
      </div>

      {/* Step 1 — API key */}
      <Step
        icon={<KeyRound className="h-4 w-4" aria-hidden="true" />}
        label={t("step1.label")}
        heading={t("step1.heading")}
      >
        <p className="text-sm leading-relaxed text-foreground/85">
          {t("step1.body", { company: brand.company.name })}
        </p>
        <p>
          <Link
            href="https://console.nexora.ai"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline underline-offset-4 transition-colors hover:text-[hsl(var(--brand-accent))]"
          >
            {t("step1.consoleCta")}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </p>
        <Callout variant="warning">
          {t("step1.footnote", { company: brand.company.name })}
        </Callout>
      </Step>

      {/* Step 2 — Install */}
      <Step
        icon={<Package className="h-4 w-4" aria-hidden="true" />}
        label={t("step2.label")}
        heading={t("step2.heading")}
      >
        <p className="text-sm leading-relaxed text-foreground/85">
          {t("step2.body")}
        </p>
        <CodeTabs tabs={installTabs} ariaLabel={t("tabsLabel")} />
      </Step>

      {/* Step 3 — First call */}
      <Step
        icon={<Send className="h-4 w-4" aria-hidden="true" />}
        label={t("step3.label")}
        heading={t("step3.heading")}
      >
        <p className="text-sm leading-relaxed text-foreground/85">
          {t("step3.body")}
        </p>
        <CodeTabs tabs={firstCallTabs} ariaLabel={t("tabsLabel")} />
      </Step>

      {/* Step 4 — Response */}
      <Step
        icon={<Inbox className="h-4 w-4" aria-hidden="true" />}
        label={t("step4.label")}
        heading={t("step4.heading")}
      >
        <p className="text-sm leading-relaxed text-foreground/85">
          {t("step4.body")}
        </p>
        <CodeBlock language="json" filename={t("step4.responseFilename")}>
          {responseJson}
        </CodeBlock>
      </Step>

      {/* Outro — dry humor */}
      <Callout variant="accent">
        <p className="leading-relaxed">{t("outro")}</p>
      </Callout>
    </div>
  );
}

function Step({
  icon,
  label,
  heading,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-brand-gradient text-white shadow-sm">
          {icon}
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest2 text-muted-foreground">
            {label}
          </p>
          <h3 className="text-lg font-semibold tracking-tight">{heading}</h3>
        </div>
      </div>
      <div className="ml-10 space-y-4">{children}</div>
    </div>
  );
}
