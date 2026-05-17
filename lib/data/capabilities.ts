/**
 * 가공 capability spec — Capabilities 페이지의 5 카드.
 *
 * ⚠️ 모든 수치 / 사양은 풍자 목적의 가공. 실존 모델과 무관.
 *    카테고리 / 능력 이름은 frontier AI 마케팅 톤의 표준 표현 (Multi-modal, Tool use 등).
 */

import {
  BookOpen,
  Bot,
  Code2,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface CapabilitySpec {
  label: string;
  value: string;
}

export interface Capability {
  category: string;
  name: string;
  description: string;
  icon: LucideIcon;
  specs: readonly CapabilitySpec[];
}

export const capabilities: readonly Capability[] = [
  {
    category: "Vision · Audio · Video",
    name: "Multi-modal reasoning",
    description:
      "Unified token-stream model accepts text, images, audio, and video as input — reasons jointly across modalities without external encoders.",
    icon: Sparkles,
    specs: [
      { label: "Input modalities", value: "Text · Image · Audio · Video" },
      { label: "Image resolution", value: "up to 2048 × 2048" },
      { label: "Video duration", value: "up to 60 min" },
      { label: "Audio context", value: "up to 4 hr" },
      { label: "ChartQA / DocVQA", value: "91.3% / 88.7%" },
    ],
  },
  {
    category: "Context · Memory",
    name: "Long-context understanding",
    description:
      "200K input context with native long-context attention — recall and reasoning quality stays consistent across the entire window.",
    icon: BookOpen,
    specs: [
      { label: "Context window", value: "200,000 tokens" },
      { label: "Output limit", value: "32,000 tokens" },
      { label: "Needle-in-haystack @200K", value: "99.4%" },
      { label: "Reasoning @ 100K", value: "87.8%" },
      { label: "Streaming", value: "available" },
    ],
  },
  {
    category: "Function calling",
    name: "Tool use & structured output",
    description:
      "First-class tool calling with parallel execution, strict JSON/XML/YAML modes, and automatic error recovery on malformed tool outputs.",
    icon: Wrench,
    specs: [
      { label: "Function calling", value: "native" },
      { label: "Output schemas", value: "JSON · XML · YAML" },
      { label: "Parallel tool calls", value: "up to 16" },
      { label: "Tool selection accuracy", value: "94.2%" },
      { label: "Error recovery rate", value: "88.6%" },
    ],
  },
  {
    category: "Engineering",
    name: "Code generation & repository understanding",
    description:
      "Production-grade coding across 80+ languages, repository-level context awareness, and SWE-Bench Verified parity with hand-written PRs.",
    icon: Code2,
    specs: [
      { label: "Languages", value: "80+" },
      { label: "HumanEval pass@1", value: "87.3%" },
      { label: "SWE-Bench Verified", value: "64.1%" },
      { label: "MultiPL-E avg", value: "79.4%" },
      { label: "Repository context", value: "up to 200K tok" },
    ],
  },
  {
    category: "Multi-step reasoning",
    name: "Agentic workflows",
    description:
      "Native multi-step planning, self-correction, and long-horizon task completion — backed by the proprietary AgentOS scheduler and Harness layer.",
    icon: Bot,
    specs: [
      { label: "Multi-step planning", value: "native" },
      { label: "Self-correction", value: "enabled" },
      { label: "Plan revision rounds", value: "avg 2.3" },
      { label: "Long-horizon completion", value: "73.1%" },
      { label: "AgentEval Pro", value: "81.7%" },
    ],
  },
] as const;
