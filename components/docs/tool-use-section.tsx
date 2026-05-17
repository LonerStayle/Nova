import { getTranslations } from "next-intl/server";
import { Layers } from "lucide-react";

import { brand } from "@/lib/brand";
import { CodeBlock } from "@/components/ui/code-block";
import { Callout } from "@/components/ui/callout";

const toolDefinitionJson = `{
  "name": "get_weather",
  "description": "Get the current weather for a city. Returns temperature in Celsius and a one-word condition (clear / cloudy / rainy / snowy). Source: a fictional weather provider that is always exactly right.",
  "input_schema": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "City name in English or Korean (e.g. 'Seoul', '서울')."
      },
      "units": {
        "type": "string",
        "enum": ["celsius", "fahrenheit"],
        "default": "celsius"
      }
    },
    "required": ["city"]
  }
}`;

const toolCallExample = `// Turn 1: user asks
{ "role": "user", "content": "What's the weather in Seoul right now?" }

// Turn 2: model emits a tool_use block
{
  "role": "assistant",
  "content": [
    {
      "type": "tool_use",
      "id": "toolu_01XYZAB123CDE456FGH789JKL",
      "name": "get_weather",
      "input": { "city": "Seoul", "units": "celsius" }
    }
  ]
}

// Turn 3: you execute, return tool_result
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01XYZAB123CDE456FGH789JKL",
      "content": "{\\"temp_c\\": 22, \\"condition\\": \\"clear\\"}"
    }
  ]
}

// Turn 4: model continues with the result in context
{
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "It's currently 22°C and clear in Seoul. Good evening for a walk along the Han."
    }
  ]
}`;

export async function ToolUseSection() {
  const t = await getTranslations("docs.toolUse");

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
        <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
          {t("intro", { model: brand.model.flagship })}
        </p>
      </div>

      {/* Defining a tool */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">
          {t("definingTitle")}
        </h3>
        <p className="max-w-3xl text-sm leading-relaxed text-foreground/85">
          {t("definingBody")}
        </p>
        <CodeBlock
          language="json"
          filename={t("exampleDefinitionFilename")}
          className="mt-2"
        >
          {toolDefinitionJson}
        </CodeBlock>
      </div>

      {/* Call flow */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold tracking-tight">
          {t("callFlowTitle")}
        </h3>
        <p className="max-w-3xl text-sm leading-relaxed text-foreground/85">
          {t("callFlowBody")}
        </p>
        <CodeBlock
          language="json"
          filename={t("exampleCallFilename")}
          className="mt-2"
        >
          {toolCallExample}
        </CodeBlock>
      </div>

      {/* Parallel tool calls */}
      <div>
        <Callout variant="accent" title={t("parallelTitle")}>
          <div className="flex items-start gap-3 leading-relaxed">
            <Layers
              className="mt-0.5 hidden h-4 w-4 shrink-0 text-[hsl(var(--brand-accent))] sm:block"
              aria-hidden="true"
            />
            <p>{t("parallelBody", { model: brand.model.flagship })}</p>
          </div>
        </Callout>
      </div>

      {/* Footnote */}
      <p className="border-t border-border/40 pt-6 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground/70">
        {t("footnote", { company: brand.company.name })}
      </p>
    </div>
  );
}
