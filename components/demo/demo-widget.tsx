"use client";

import * as React from "react";
import { Loader2, Send, Sparkles, X } from "lucide-react";

import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { cn } from "@/lib/utils";

const sampleQueries = [
  `What is ${brand.model.flagship}'s MMLU score?`,
  "Explain how AgentOS schedules multi-step tasks.",
  "How does constitutional safety alignment work?",
] as const;

type DemoStatus = "idle" | "loading" | "success" | "error";

interface DemoState {
  status: DemoStatus;
  query: string;
  answer: string | null;
  error: string | null;
}

const INITIAL_STATE: DemoState = {
  status: "idle",
  query: "",
  answer: null,
  error: null,
};

/**
 * 임시 mock retrieval — Phase 3 후속 task 들에서 hybrid retrieval (BM25 60% + voyage-4 임베딩 40%) 로 교체.
 * 지금은 keyword 매칭으로 sample 응답만 반환.
 */
async function mockRetrieve(query: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 750));

  const q = query.toLowerCase();
  if (q.includes("mmlu") || q.includes("score") || q.includes("benchmark")) {
    return `${brand.model.flagship} achieves 92.4% on MMLU (5-shot) — a +4.1 point improvement over the previous frontier generation. See the Benchmarks page for the full evaluation suite.`;
  }
  if (q.includes("agentos") || q.includes("schedule") || q.includes("multi-step")) {
    return `AgentOS is the L2 layer of our stack. It handles fair-share scheduling across role-specialized agents, episodic/semantic/working memory, strongly-typed agent IPC, and OpenTelemetry-compatible distributed tracing — all on top of a constitutional safety substrate.`;
  }
  if (
    q.includes("constitutional") ||
    q.includes("safety") ||
    q.includes("alignment")
  ) {
    return `Constitutional safety is enforced at every layer of the stack — pre-output guardrails in the Harness, critic-agent verification in the Multi-Agent layer, and explicit refusal policies in the Orchestration layer. Refusal accuracy is 96.4% on the internal Safety Suite v3.2.`;
  }

  return `[Mock response] Hybrid retrieval (keyword 60% + embedding 40%) will be wired up in a follow-up iter. For now, echoing: "${query}"`;
}

export function DemoWidget() {
  const [state, setState] = React.useState<DemoState>(INITIAL_STATE);
  const [input, setInput] = React.useState("");

  const submit = React.useCallback(async (rawQuery: string) => {
    const query = rawQuery.trim();
    if (!query) return;
    setState({ status: "loading", query, answer: null, error: null });
    try {
      const answer = await mockRetrieve(query);
      setState({ status: "success", query, answer, error: null });
    } catch (err) {
      setState({
        status: "error",
        query,
        answer: null,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }, []);

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
  };

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
              Interactive Demo · Hybrid Retrieval
            </Pill>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Try {brand.model.flagship} yourself.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Hybrid retrieval — keyword similarity (60%) + dense embedding
              semantic search (40%) over a curated dataset.
            </p>
          </div>

          {/* Input form */}
          <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-2xl">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask anything about ${brand.model.flagship}...`}
                rows={3}
                className={cn(
                  "block w-full resize-none rounded-lg border border-input bg-background px-4 py-3 pr-14 text-sm",
                  "placeholder:text-muted-foreground/60",
                  "transition-colors",
                  "focus:border-[hsl(var(--brand-accent)/0.5)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-accent)/0.3)]",
                  "disabled:opacity-60",
                )}
                disabled={state.status === "loading"}
                aria-label="Demo query input"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute bottom-3 right-3"
                disabled={state.status === "loading" || !input.trim()}
                aria-label="Submit query"
              >
                {state.status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="h-4 w-4" aria-hidden="true" />
                )}
              </Button>
            </div>
          </form>

          {/* Sample queries — only when idle */}
          {state.status === "idle" ? (
            <div className="mx-auto mt-6 max-w-2xl">
              <p className="text-center text-xs text-muted-foreground/70">
                or try one of these:
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
                  Query:{" "}
                  <span className="font-mono text-foreground/80">
                    &ldquo;{state.query}&rdquo;
                  </span>
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onReset}
                  aria-label="Reset demo"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="ml-1 text-xs">Reset</span>
                </Button>
              </div>

              <div className="mt-3 rounded-lg border bg-muted/30 p-5">
                {state.status === "loading" ? <ResponseSkeleton /> : null}
                {state.status === "success" && state.answer ? (
                  <p className="animate-in fade-in slide-in-from-bottom-1 text-sm leading-relaxed text-foreground/90 duration-300">
                    {state.answer}
                  </p>
                ) : null}
                {state.status === "error" ? (
                  <p className="text-sm leading-relaxed text-rose-600 dark:text-rose-400">
                    Error — {state.error}
                  </p>
                ) : null}
              </div>

              {state.status === "success" ? (
                <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
                  Hybrid retrieval · 60% keyword · 40% embedding ·{" "}
                  {brand.model.flagship}
                </p>
              ) : null}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}

function ResponseSkeleton() {
  return (
    <div className="space-y-2.5" aria-label="Loading response" role="status">
      <div className="h-3 w-3/4 animate-pulse rounded bg-muted-foreground/15" />
      <div className="h-3 w-full animate-pulse rounded bg-muted-foreground/15" />
      <div className="h-3 w-5/6 animate-pulse rounded bg-muted-foreground/15" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-muted-foreground/15" />
    </div>
  );
}
