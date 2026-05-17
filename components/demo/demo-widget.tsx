"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Loader2, RotateCw, Send, Sparkles, X } from "lucide-react";

import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";
import { hybridRetrieve } from "@/lib/retrieval/hybrid";
import type { Locale } from "@/lib/retrieval/bm25";

const SAMPLE_QUERY_KEYS = ["mmlu", "agentos", "constitutional"] as const;

const MAX_INPUT = 2000;
const INPUT_WARN_THRESHOLD = 1800;
const TYPEWRITER_SPEED_MS = 18;
const TOAST_DURATION_MS = 5000;

type DemoStatus = "idle" | "loading" | "success" | "error";
type RetrievalMode = "hybrid" | "bm25-only";

interface DemoState {
  status: DemoStatus;
  query: string;
  answer: string | null;
  error: string | null;
  mode: RetrievalMode | null;
}

const INITIAL_STATE: DemoState = {
  status: "idle",
  query: "",
  answer: null,
  error: null,
  mode: null,
};

export function DemoWidget() {
  const t = useTranslations("demo");
  const tSample = useTranslations("demo.sampleQueries");
  const locale = useLocale() as Locale;
  const [state, setState] = React.useState<DemoState>(INITIAL_STATE);
  const [input, setInput] = React.useState("");
  const [toast, setToast] = React.useState<string | null>(null);

  const sampleQueries = React.useMemo(
    () =>
      SAMPLE_QUERY_KEYS.map((key) =>
        tSample(key, { model: brand.model.flagship }),
      ),
    [tSample],
  );

  const submit = React.useCallback(
    async (rawQuery: string) => {
      const query = rawQuery.trim();
      if (!query) return;
      setState({
        status: "loading",
        query,
        answer: null,
        error: null,
        mode: null,
      });
      try {
        const result = await hybridRetrieve(query, locale);
        if (!result) {
          const message = t("noResult");
          setState({
            status: "error",
            query,
            answer: null,
            error: message,
            mode: null,
          });
          setToast(message);
          return;
        }
        setState({
          status: "success",
          query,
          answer: result.entry.answer,
          error: null,
          mode: result.mode,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setState({
          status: "error",
          query,
          answer: null,
          error: message,
          mode: null,
        });
        setToast(message);
      }
    },
    [t, locale],
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit(input);
  };

  const onSampleClick = (sample: string) => {
    setInput(sample);
    void submit(sample);
  };

  const onReset = () => {
    setState(INITIAL_STATE);
    setInput("");
    setToast(null);
  };

  const inputCount = input.length;
  const inputWarn = inputCount > INPUT_WARN_THRESHOLD;
  const inputOver = inputCount > MAX_INPUT;

  return (
    <section id="demo" className="container mx-auto px-6 py-20">
      <Card className="overflow-hidden border-[hsl(var(--brand-accent)/0.2)]">
        <CardContent className="p-8 sm:p-12">
          {/* Header */}
          <div className="flex flex-col items-center text-center">
            <Pill variant="mono">
              <Sparkles
                className="h-3 w-3 text-brand-accent"
                aria-hidden="true"
              />
              {t("eyebrow")}
            </Pill>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("heading", { model: brand.model.flagship })}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>

          {/* Input form */}
          <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-2xl">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT))}
                placeholder={t("placeholder", { model: brand.model.flagship })}
                rows={3}
                maxLength={MAX_INPUT}
                className={cn(
                  "block w-full resize-none rounded-lg border border-input bg-background px-4 py-3 pr-14 text-sm",
                  "placeholder:text-muted-foreground/60",
                  "transition-colors",
                  "focus:border-[hsl(var(--brand-accent)/0.5)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-accent)/0.3)]",
                  "disabled:opacity-60",
                )}
                disabled={state.status === "loading"}
                aria-label={t("ariaInput")}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute bottom-3 right-3"
                disabled={
                  state.status === "loading" || !input.trim() || inputOver
                }
                aria-label={t("ariaSubmit")}
              >
                {state.status === "loading" ? (
                  <Loader2
                    className="h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            </div>
            {/* Char counter */}
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground/70">
              <span>{t("charCounter", { max: MAX_INPUT })}</span>
              <span
                className={cn(
                  "font-mono tabular-nums",
                  inputWarn && !inputOver && "text-amber-600 dark:text-amber-400",
                  inputOver && "text-rose-600 dark:text-rose-400",
                )}
                aria-live="polite"
              >
                {inputCount.toLocaleString()}/{MAX_INPUT.toLocaleString()}
              </span>
            </div>
          </form>

          {/* Sample queries — only when idle */}
          {state.status === "idle" ? (
            <div className="mx-auto mt-6 max-w-2xl">
              <p className="text-center text-xs text-muted-foreground/70">
                {t("samplePrefix")}
              </p>
              <ul className="mt-3 flex flex-wrap justify-center gap-2">
                {sampleQueries.map((sample) => (
                  <li key={sample}>
                    <button
                      type="button"
                      onClick={() => onSampleClick(sample)}
                      className="rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-border hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-accent)/0.3)]"
                    >
                      {sample}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Response area */}
          {state.status !== "idle" ? (
            <div className="mx-auto mt-8 max-w-2xl">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-xs text-muted-foreground">
                  {t("queryLabel")}{" "}
                  <span className="font-mono text-foreground/80">
                    &ldquo;{state.query}&rdquo;
                  </span>
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onReset}
                  aria-label={t("ariaReset")}
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="ml-1 text-xs">{t("reset")}</span>
                </Button>
              </div>

              <div className="mt-3 min-h-[6rem] rounded-lg border bg-muted/30 p-5">
                {state.status === "loading" ? (
                  <ResponseSkeleton ariaLabel={t("loadingAria")} />
                ) : null}
                {state.status === "success" && state.answer ? (
                  <p className="text-sm leading-relaxed text-foreground/90">
                    <TypewriterText
                      text={state.answer}
                      speed={TYPEWRITER_SPEED_MS}
                    />
                  </p>
                ) : null}
                {state.status === "error" ? (
                  <p className="text-sm leading-relaxed text-rose-600 dark:text-rose-400">
                    {t("errorPrefix")} {state.error}
                  </p>
                ) : null}
              </div>

              {state.status === "success" ? (
                <>
                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                    {state.mode === "hybrid"
                      ? t("modeHybrid", { model: brand.model.flagship })
                      : t("modeBm25", { model: brand.model.flagship })}
                  </p>
                  <div className="mt-5 flex justify-center">
                    <Button variant="outline" size="sm" onClick={onReset}>
                      <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="ml-1.5">{t("askAgain")}</span>
                    </Button>
                  </div>
                </>
              ) : null}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <ErrorToast
        message={toast}
        onClose={() => setToast(null)}
        dismissLabel={t("toastDismiss")}
      />
    </section>
  );
}

function ResponseSkeleton({ ariaLabel }: { ariaLabel: string }) {
  return (
    <div className="space-y-2.5" aria-label={ariaLabel} role="status">
      <div className="h-3 w-3/4 animate-pulse rounded bg-muted-foreground/15" />
      <div className="h-3 w-full animate-pulse rounded bg-muted-foreground/15" />
      <div className="h-3 w-5/6 animate-pulse rounded bg-muted-foreground/15" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-muted-foreground/15" />
    </div>
  );
}

/**
 * 글자 단위 typewriter — text 가 바뀔 때마다 처음부터 다시 출력.
 */
function TypewriterText({ text, speed }: { text: string; speed: number }) {
  const [displayed, setDisplayed] = React.useState("");

  React.useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
      }
    }, speed);
    return () => {
      window.clearInterval(id);
    };
  }, [text, speed]);

  return (
    <>
      {displayed}
      {displayed.length < text.length ? (
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-3.5 w-[2px] -translate-y-[1px] animate-pulse bg-brand-accent align-middle"
        />
      ) : null}
    </>
  );
}

/**
 * 자체 구현 toast — 자동 5초 후 사라짐, manual close 가능.
 * 의존성 0, 풍자 사이트의 simple notification.
 */
function ErrorToast({
  message,
  onClose,
  dismissLabel,
}: {
  message: string | null;
  onClose: () => void;
  dismissLabel: string;
}) {
  React.useEffect(() => {
    if (!message) return;
    const id = window.setTimeout(onClose, TOAST_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="animate-in fade-in slide-in-from-bottom-2 fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-lg border border-rose-500/40 bg-background p-4 shadow-lg duration-200"
    >
      <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
      <p className="flex-1 text-xs leading-relaxed text-foreground">
        {message}
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label={dismissLabel}
        className="-m-1 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
