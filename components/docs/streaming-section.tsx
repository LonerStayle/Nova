import { getTranslations } from "next-intl/server";

import { brand } from "@/lib/brand";
import { CodeBlock } from "@/components/ui/code-block";
import { CodeTabs, type CodeTab } from "@/components/docs/code-tabs";

type EventKey =
  | "messageStart"
  | "contentBlockStart"
  | "contentBlockDelta"
  | "contentBlockStop"
  | "messageDelta"
  | "messageStop"
  | "ping"
  | "error";

const events: { key: EventKey; eventName: string }[] = [
  { key: "messageStart", eventName: "message_start" },
  { key: "contentBlockStart", eventName: "content_block_start" },
  { key: "contentBlockDelta", eventName: "content_block_delta" },
  { key: "contentBlockStop", eventName: "content_block_stop" },
  { key: "messageDelta", eventName: "message_delta" },
  { key: "messageStop", eventName: "message_stop" },
  { key: "ping", eventName: "ping" },
  { key: "error", eventName: "error" },
];

const streamTabs: CodeTab[] = [
  {
    id: "curl",
    label: "cURL",
    language: "bash",
    filename: "stream.sh",
    code: `curl https://api.nexora.ai/v1/messages \\
  -H "Authorization: Bearer $NEXORA_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Nexora-Version: 2026-04-01" \\
  --no-buffer \\
  -d '{
    "model": "nexora-1-2026-05",
    "max_tokens": 512,
    "stream": true,
    "messages": [
      {"role": "user", "content": "Write a haiku about Seoul at night."}
    ]
  }'`,
  },
  {
    id: "typescript",
    label: "TypeScript",
    language: "ts",
    filename: "stream.ts",
    code: `import Nexora from "@nexora/sdk";

const client = new Nexora({ apiKey: process.env.NEXORA_API_KEY });

const stream = await client.messages.stream({
  model: "nexora-1-2026-05",
  max_tokens: 512,
  messages: [
    { role: "user", content: "Write a haiku about Seoul at night." },
  ],
});

for await (const event of stream) {
  if (event.type === "content_block_delta") {
    process.stdout.write(event.delta.text ?? "");
  }
}

const final = await stream.finalMessage();
console.log("\\n---\\nusage:", final.usage);`,
  },
  {
    id: "python",
    label: "Python",
    language: "py",
    filename: "stream.py",
    code: `import os
from nexora import Nexora

client = Nexora(api_key=os.environ["NEXORA_API_KEY"])

with client.messages.stream(
    model="nexora-1-2026-05",
    max_tokens=512,
    messages=[
        {"role": "user", "content": "Write a haiku about Seoul at night."},
    ],
) as stream:
    for event in stream:
        if event.type == "content_block_delta":
            print(event.delta.text or "", end="", flush=True)

    final = stream.get_final_message()
    print(f"\\n---\\nusage: {final.usage}")`,
  },
];

const sampleStream = `event: message_start
data: {"type":"message_start","message":{"id":"msg_01H9XQRC4P5VBJ4WZ9C2KQ8FZ7","model":"nexora-1-2026-05","role":"assistant","content":[],"usage":{"input_tokens":14,"output_tokens":0}}}

event: content_block_start
data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Seoul"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":" lights flicker low —"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"\\nHan River carries silver sheen,\\nfrontier hums awake."}}

event: content_block_stop
data: {"type":"content_block_stop","index":0}

event: message_delta
data: {"type":"message_delta","delta":{"stop_reason":"end_turn","stop_sequence":null},"usage":{"output_tokens":23}}

event: message_stop
data: {"type":"message_stop"}`;

export async function StreamingSection() {
  const t = await getTranslations("docs.streaming");
  const tEvents = await getTranslations("docs.streaming.events");

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
          {t("intro")}
        </p>
      </div>

      {/* Event types */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {t("eventsTitle")}
        </h3>
        <div className="mt-4">
          {events.map((event) => (
            <div
              key={event.key}
              className="border-b border-border/40 py-4 first:border-t"
            >
              <code className="font-mono text-sm font-semibold text-foreground">
                {event.eventName}
              </code>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {tEvents(event.key)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Code tabs */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {t("exampleTitle")}
        </h3>
        <div className="mt-4">
          <CodeTabs tabs={streamTabs} ariaLabel={t("tabsLabel")} />
        </div>
      </div>

      {/* Sample stream */}
      <div>
        <h3 className="text-base font-semibold tracking-tight text-muted-foreground">
          {t("sampleStreamTitle")}
        </h3>
        <CodeBlock
          language="text/event-stream"
          filename={t("sampleStreamFilename")}
          className="mt-3"
        >
          {sampleStream}
        </CodeBlock>
      </div>

      {/* Footnote */}
      <p className="border-t border-border/40 pt-6 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground/70">
        {t("footnote", { company: brand.company.name })}
      </p>
    </div>
  );
}
