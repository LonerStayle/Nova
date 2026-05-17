import { getTranslations } from "next-intl/server";

import { CodeBlock } from "@/components/ui/code-block";
import { cn } from "@/lib/utils";

type ErrorKey = "400" | "401" | "403" | "404" | "429" | "500" | "503";

const errorOrder: ErrorKey[] = ["400", "401", "403", "404", "429", "500", "503"];

const statusToneClass: Record<ErrorKey, string> = {
  "400":
    "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "401":
    "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  "403":
    "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  "404":
    "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  "429":
    "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  "500":
    "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  "503":
    "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

const responseFormatExample = `{
  "error": {
    "type": "<stable_identifier>",
    "message": "<human-readable description>",
    "request_id": "req_01H9XQRC4P5VBJ4WZ9C2KQ8FZ7"
  }
}`;

const authSample = `{
  "error": {
    "type": "auth_invalid",
    "message": "The API key is invalid, expired, or revoked. The model has not been asked to think about this.",
    "request_id": "req_01H9XQRC4P5VBJ4WZ9C2KQ8FZ7"
  }
}`;

const rateSample = `{
  "error": {
    "type": "rate_limit_exceeded",
    "message": "You've exceeded your rate limit (1,000 RPM). Try again in 1.2s — the queue is patient.",
    "request_id": "req_01H9XQRC4P5VBJ4WZ9C2KQ8FZ7",
    "retry_after_ms": 1200
  }
}`;

const overloadSample = `{
  "error": {
    "type": "model_overloaded",
    "message": "nexora-1-2026-05 is temporarily over capacity. Retry in ~8s, or fall back to nexora-k-2026-05 if latency matters more than parity.",
    "request_id": "req_01H9XQRC4P5VBJ4WZ9C2KQ8FZ7",
    "retry_after_ms": 8000
  }
}`;

export async function ErrorsSection() {
  const t = await getTranslations("docs.errors");
  const tCols = await getTranslations("docs.errors.columns");
  const tCodes = await getTranslations("docs.errors.errors");
  const tSamples = await getTranslations("docs.errors.samples");

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
          {t("intro")}
        </p>
      </div>

      {/* Response shape */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {t("responseFormatTitle")}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {t("responseFormatBody")}
        </p>
        <CodeBlock
          language="json"
          filename={t("responseFormatFilename")}
          className="mt-4"
        >
          {responseFormatExample}
        </CodeBlock>
      </div>

      {/* Status codes table */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {tCols("status")}
        </h3>
        <div className="mt-4 -mx-2 overflow-x-auto rounded-lg border bg-background/40 px-2">
          <table
            className="w-full min-w-[760px] border-collapse text-left text-sm"
            aria-label={t("tableLabel")}
          >
            <thead>
              <tr className="border-b border-border/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-3">{tCols("status")}</th>
                <th className="px-3 py-3">{tCols("reason")}</th>
                <th className="px-3 py-3 font-mono">{tCols("errorType")}</th>
                <th className="px-3 py-3">{tCols("retry")}</th>
                <th className="px-3 py-3">{tCols("description")}</th>
              </tr>
            </thead>
            <tbody>
              {errorOrder.map((code) => (
                <tr
                  key={code}
                  className="border-b border-border/40 last:border-b-0 align-top"
                >
                  <td className="px-3 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-md border px-2 py-0.5 font-mono text-xs font-semibold",
                        statusToneClass[code],
                      )}
                    >
                      {code}
                    </span>
                  </td>
                  <td className="px-3 py-4 font-semibold text-foreground">
                    {tCodes(`${code}.name`)}
                  </td>
                  <td className="px-3 py-4 font-mono text-[11px] text-foreground/85">
                    {tCodes(`${code}.errorType`)}
                  </td>
                  <td className="px-3 py-4 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {tCodes(`${code}.retry`)}
                  </td>
                  <td className="max-w-[480px] px-3 py-4 text-sm leading-relaxed text-muted-foreground">
                    {tCodes(`${code}.description`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sample responses */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {t("exampleTitle")}
        </h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground">
              {tSamples("auth.label")}
            </p>
            <CodeBlock language="json" filename={tSamples("auth.filename")}>
              {authSample}
            </CodeBlock>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground">
              {tSamples("rate.label")}
            </p>
            <CodeBlock language="json" filename={tSamples("rate.filename")}>
              {rateSample}
            </CodeBlock>
          </div>
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground">
              {tSamples("overload.label")}
            </p>
            <CodeBlock language="json" filename={tSamples("overload.filename")}>
              {overloadSample}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Retry policy */}
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {t("retryTitle")}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {t("retryBody")}
        </p>
      </div>

      {/* Footnote */}
      <p className="border-t border-border/40 pt-6 font-mono text-[11px] uppercase tracking-widest2 text-muted-foreground/70">
        {t("footnote")}
      </p>
    </div>
  );
}
