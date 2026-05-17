/**
 * 가공 capability spec — Capabilities 페이지의 5 카드.
 *
 * ⚠️ 모든 수치 / 사양은 풍자 목적의 가공. 실존 모델과 무관.
 *
 * i18n 구조: 카드의 user-visible 텍스트(category/name/description, specs.label)는
 * `messages/{en,ko}.json` 의 `capabilities.cards.<id>` 로 이동. 이 파일은
 * non-translatable identifier + 아이콘 + 가공 수치값만 보유.
 */

import {
  BookOpen,
  Bot,
  Code2,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const capabilityIds = [
  "multimodal",
  "context",
  "tools",
  "code",
  "agentic",
  "scale",
] as const;

export type CapabilityId = (typeof capabilityIds)[number];

export const capabilityIcons: Record<CapabilityId, LucideIcon> = {
  multimodal: Sparkles,
  context: BookOpen,
  tools: Wrench,
  code: Code2,
  agentic: Bot,
  scale: Zap,
};

// 각 카드의 spec key 순서 — 페이지가 이 순서로 messages 의 label 을 lookup 한다.
export const capabilitySpecKeys: Record<CapabilityId, readonly string[]> = {
  multimodal: [
    "modalities",
    "imageRes",
    "videoLen",
    "audioCtx",
    "chartDoc",
  ],
  context: [
    "window",
    "output",
    "needle",
    "reasoning100k",
    "streaming",
  ],
  tools: [
    "functionCalling",
    "outputSchemas",
    "parallelCalls",
    "selectionAcc",
    "errorRecovery",
  ],
  code: [
    "languages",
    "humanEval",
    "sweBench",
    "multiPL",
    "repoContext",
  ],
  agentic: [
    "planning",
    "selfCorrection",
    "planRevision",
    "longHorizon",
    "agentEval",
  ],
  scale: [
    "params",
    "corpus",
    "gpus",
    "compute",
    "duration",
  ],
};

// 가공 수치 값 — non-translatable
export const capabilitySpecValues: Record<
  CapabilityId,
  Record<string, string>
> = {
  multimodal: {
    modalities: "Text · Image · Audio · Video",
    imageRes: "up to 2048 × 2048",
    videoLen: "up to 60 min",
    audioCtx: "up to 4 hr",
    chartDoc: "91.3% / 88.7%",
  },
  context: {
    window: "200,000 tokens",
    output: "32,000 tokens",
    needle: "99.4%",
    reasoning100k: "87.8%",
    streaming: "available",
  },
  tools: {
    functionCalling: "native",
    outputSchemas: "JSON · XML · YAML",
    parallelCalls: "up to 16",
    selectionAcc: "94.2%",
    errorRecovery: "88.6%",
  },
  code: {
    languages: "80+",
    humanEval: "87.3%",
    sweBench: "64.1%",
    multiPL: "79.4%",
    repoContext: "up to 200K tok",
  },
  agentic: {
    planning: "native",
    selfCorrection: "enabled",
    planRevision: "avg 2.3",
    longHorizon: "73.1%",
    agentEval: "81.7%",
  },
  scale: {
    params: "10¹⁷ (~100 quadrillion)",
    corpus: "50 PB curated text",
    gpus: "5,000 × H100, 12 sites",
    compute: "2.4 zettaflop",
    duration: "18 months continuous",
  },
};
