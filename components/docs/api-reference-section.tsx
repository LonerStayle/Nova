import { getTranslations } from "next-intl/server";

import { brand } from "@/lib/brand";
import { CodeBlock } from "@/components/ui/code-block";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ParamKey =
  | "model"
  | "messages"
  | "maxTokens"
  | "system"
  | "stream"
  | "temperature"
  | "topP"
  | "topK"
  | "stopSequences"
  | "metadata"
  | "tools"
  | "toolChoice"
  | "thinking";

type ResponseParamKey =
  | "id"
  | "object"
  | "model"
  | "role"
  | "content"
  | "stopReason"
  | "stopSequence"
  | "usage";

type RequestParamSpec = {
  key: ParamKey;
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
};

type ResponseParamSpec = {
  key: ResponseParamKey;
  name: string;
  type: string;
};

type HeaderSpec = {
  key: "authorization" | "contentType" | "nexoraVersion";
  name: string;
  example: string;
  required?: boolean;
};

const headers: HeaderSpec[] = [
  {
    key: "authorization",
    name: "Authorization",
    example: "Bearer sk-nexora-2026-XXXXXXXX",
    required: true,
  },
  {
    key: "contentType",
    name: "Content-Type",
    example: "application/json",
    required: true,
  },
  {
    key: "nexoraVersion",
    name: "Nexora-Version",
    example: "2026-04-01",
  },
];

const requestParams: RequestParamSpec[] = [
  { key: "model", name: "model", type: "string", required: true },
  { key: "messages", name: "messages", type: "array<Message>", required: true },
  { key: "maxTokens", name: "max_tokens", type: "integer", required: true },
  { key: "system", name: "system", type: "string | array<Block>" },
  { key: "stream", name: "stream", type: "boolean", defaultValue: "false" },
  {
    key: "temperature",
    name: "temperature",
    type: "number",
    defaultValue: "1.0",
  },
  { key: "topP", name: "top_p", type: "number" },
  { key: "topK", name: "top_k", type: "integer" },
  { key: "stopSequences", name: "stop_sequences", type: "array<string>" },
  { key: "metadata", name: "metadata", type: "object" },
  { key: "tools", name: "tools", type: "array<Tool>" },
  { key: "toolChoice", name: "tool_choice", type: "object" },
  { key: "thinking", name: "thinking", type: "object" },
];

const responseParams: ResponseParamSpec[] = [
  { key: "id", name: "id", type: "string" },
  { key: "object", name: "object", type: "string" },
  { key: "model", name: "model", type: "string" },
  { key: "role", name: "role", type: "string" },
  { key: "content", name: "content", type: "array<ContentBlock>" },
  { key: "stopReason", name: "stop_reason", type: "string" },
  { key: "stopSequence", name: "stop_sequence", type: "string | null" },
  { key: "usage", name: "usage", type: "object" },
];

const requestExampleJson = `{
  "model": "nexora-1-2026-05",
  "max_tokens": 1024,
  "temperature": 0.7,
  "system": "You are a helpful assistant fluent in Korean and English.",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Summarize the {company} architecture in two sentences."
        }
      ]
    }
  ],
  "stream": false,
  "metadata": {
    "user_id": "user_a8f3d2c1"
  }
}`;

const responseExampleJson = `{
  "id": "msg_01H9XQRC4P5VBJ4WZ9C2KQ8FZ7",
  "object": "message",
  "model": "nexora-1-2026-05",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "{company} is a four-layer agentic system — Orchestration routes and synthesizes; Multi-Agent runs role-specialized agents in parallel; AgentOS schedules and persists state; Harness handles inference, sandboxing, and safety. Every request flows through all four layers in a single streaming envelope."
    }
  ],
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 32,
    "output_tokens": 82,
    "total_tokens": 114,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 0
  }
}`;

export async function ApiReferenceSection() {
  const t = await getTranslations("docs.apiReference");
  const tLabels = await getTranslations("docs.apiReference.labels");
  const tHeaders = await getTranslations("docs.apiReference.headers.items");
  const tReqParams = await getTranslations("docs.apiReference.request.params");
  const tResParams = await getTranslations("docs.apiReference.response.params");
  const tHeadersTitle = await getTranslations("docs.apiReference.headers");
  const tRequest = await getTranslations("docs.apiReference.request");
  const tResponse = await getTranslations("docs.apiReference.response");

  return (
    <div className="space-y-14">
      {/* Heading */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest2 text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>

        {/* Endpoint pill */}
        <div className="mt-6 inline-flex items-center gap-3 rounded-md border bg-muted/40 px-3 py-2 font-mono text-xs">
          <Badge
            variant="outline"
            className="border-emerald-500/50 bg-emerald-500/10 font-mono text-[10px] uppercase tracking-widest text-emerald-700 dark:text-emerald-300"
          >
            POST
          </Badge>
          <span className="text-foreground">https://api.nexora.ai/v1/messages</span>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground/85 sm:text-base">
          {t("description", { model: brand.model.flagship })}
        </p>
      </div>

      {/* Headers */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {tHeadersTitle("title")}
        </h3>
        <div className="mt-4">
          {headers.map((h) => (
            <ParamRow
              key={h.key}
              name={h.name}
              type="string"
              required={h.required}
              requiredLabel={tLabels("required")}
              optionalLabel={tLabels("optional")}
              meta={
                <span className="font-mono text-[11px] text-muted-foreground/80">
                  {h.example}
                </span>
              }
            >
              {tHeaders(`${h.key}.description`, {
                company: brand.company.name,
              })}
            </ParamRow>
          ))}
        </div>
      </div>

      {/* Request body */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {tRequest("title")}
        </h3>
        <div className="mt-4">
          {requestParams.map((p) => (
            <ParamRow
              key={p.key}
              name={p.name}
              type={p.type}
              required={p.required}
              defaultValue={p.defaultValue}
              requiredLabel={tLabels("required")}
              optionalLabel={tLabels("optional")}
              defaultLabel={tLabels("default")}
            >
              {tReqParams(p.key, { company: brand.company.name })}
            </ParamRow>
          ))}
        </div>
      </div>

      {/* Request example */}
      <div>
        <h3 className="text-base font-semibold tracking-tight text-muted-foreground">
          {tRequest("exampleTitle")}
        </h3>
        <CodeBlock
          language="json"
          filename={tRequest("exampleFilename")}
          className="mt-3"
        >
          {requestExampleJson.replace(/\{company\}/g, brand.company.name)}
        </CodeBlock>
      </div>

      {/* Response */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {tResponse("title")}
        </h3>
        <div className="mt-4">
          {responseParams.map((p) => (
            <ParamRow
              key={p.key}
              name={p.name}
              type={p.type}
              alwaysReturned
              alwaysLabel={tLabels("required")}
            >
              {tResParams(p.key)}
            </ParamRow>
          ))}
        </div>
      </div>

      {/* Response example */}
      <div>
        <h3 className="text-base font-semibold tracking-tight text-muted-foreground">
          {tResponse("exampleTitle")}
        </h3>
        <CodeBlock
          language="json"
          filename={tResponse("exampleFilename")}
          className="mt-3"
        >
          {responseExampleJson.replace(/\{company\}/g, brand.company.name)}
        </CodeBlock>
      </div>

      {/* Footnote */}
      <p className="border-t border-border/40 pt-6 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground/70">
        {t("footnote")}
      </p>
    </div>
  );
}

interface ParamRowProps {
  name: string;
  type: string;
  required?: boolean;
  alwaysReturned?: boolean;
  defaultValue?: string;
  requiredLabel?: string;
  optionalLabel?: string;
  alwaysLabel?: string;
  defaultLabel?: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
}

function ParamRow({
  name,
  type,
  required,
  alwaysReturned,
  defaultValue,
  requiredLabel = "Required",
  optionalLabel = "Optional",
  defaultLabel = "Default",
  meta,
  children,
}: ParamRowProps) {
  return (
    <div className="border-b border-border/40 py-4 first:border-t">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <code className="font-mono text-sm font-semibold text-foreground">
          {name}
        </code>
        <span className="font-mono text-[11px] text-muted-foreground">
          {type}
        </span>
        {required ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-rose-500/90">
            {requiredLabel}
          </span>
        ) : alwaysReturned ? null : (
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80",
            )}
          >
            {optionalLabel}
          </span>
        )}
        {defaultValue ? (
          <span className="font-mono text-[10px] text-muted-foreground/70">
            {defaultLabel}: {defaultValue}
          </span>
        ) : null}
        {meta ? <span className="ml-auto">{meta}</span> : null}
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}
