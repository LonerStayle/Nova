/**
 * 가공 4-레이어 architecture — Architecture 페이지의 다이어그램.
 *
 * ⚠️ 모든 컴포넌트 이름·설명·기술 사양은 풍자 목적의 가공.
 *    frontier AI 마케팅 톤의 buzzword (Multi-Agent / AgentOS / Harness / Orchestration 등)
 *    적극 활용 — CLAUDE.md §3 "buzzword 적극 활용" 요구사항.
 */

import {
  Boxes,
  Cpu,
  Layers,
  Network,
  type LucideIcon,
} from "lucide-react";

export interface ArchComponent {
  name: string;
  description: string;
}

export interface ArchLayer {
  level: string; // "L4" .. "L1"
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accent: "primary" | "muted";
  components: readonly ArchComponent[];
}

export const archLayers: readonly ArchLayer[] = [
  {
    level: "L4",
    name: "Orchestration",
    tagline: "Frontier-grade request routing & response synthesis",
    description:
      "Receives raw user input, decomposes it into structured sub-goals, dispatches across specialized agents, and synthesizes a coherent final response — all under a single streaming envelope.",
    icon: Network,
    accent: "primary",
    components: [
      {
        name: "Request Router",
        description: "Intent classification → agent selection",
      },
      { name: "Plan Decomposer", description: "Goal → DAG of sub-tasks" },
      {
        name: "Response Synthesizer",
        description: "Streams unified output across agents",
      },
      {
        name: "Telemetry Stream",
        description: "OpenTelemetry trace export",
      },
    ],
  },
  {
    level: "L3",
    name: "Multi-Agent",
    tagline: "Role-specialized agent ensemble",
    description:
      "Constellation of role-specialized agents that operate in parallel and consensus. Each agent has its own context window, tool set, and constitutional policy.",
    icon: Boxes,
    accent: "primary",
    components: [
      {
        name: "Researcher Agent",
        description: "Long-context retrieval + synthesis",
      },
      {
        name: "Coder Agent",
        description: "Repository-aware code generation",
      },
      {
        name: "Critic Agent",
        description: "Self-correction + adversarial verification",
      },
      {
        name: "Planner Agent",
        description: "Multi-step task decomposition",
      },
      {
        name: "Tool-User Agent",
        description: "Parallel function-calling executor",
      },
    ],
  },
  {
    level: "L2",
    name: "AgentOS",
    tagline: "Proprietary agent scheduling, memory & state",
    description:
      "The operating system layer beneath the agents. Handles process isolation, persistent memory, cross-agent IPC, and observability — all on top of a constitutional safety substrate.",
    icon: Layers,
    accent: "primary",
    components: [
      { name: "Scheduler", description: "Fair-share + priority queues" },
      {
        name: "Memory Store",
        description: "Episodic · semantic · working",
      },
      {
        name: "Agent IPC",
        description: "Strongly-typed message passing",
      },
      {
        name: "State Manager",
        description: "Checkpoint / replay / fork",
      },
      {
        name: "Observability",
        description: "Distributed tracing → OTel",
      },
    ],
  },
  {
    level: "L1",
    name: "Harness",
    tagline: "Model inference, sandboxing & safety substrate",
    description:
      "The base substrate that runs the Nexora-1 foundation model. Handles tokenization, KV-cache, attention computation, and every safety guardrail before output reaches L2.",
    icon: Cpu,
    accent: "muted",
    components: [
      {
        name: "Inference Runtime",
        description: "Custom kernel · FP8 · KV-cache",
      },
      {
        name: "Sandbox",
        description: "WASM-isolated tool execution",
      },
      {
        name: "Safety Guardrails",
        description: "Pre-output constitutional checks",
      },
      {
        name: "Token Streamer",
        description: "Backpressure-aware streaming",
      },
    ],
  },
] as const;
