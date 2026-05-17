/**
 * 가공 4-레이어 architecture — Architecture 페이지의 다이어그램.
 *
 * ⚠️ 모든 컴포넌트 이름·설명·기술 사양은 풍자 목적의 가공.
 *    frontier AI 마케팅 톤의 buzzword (Multi-Agent / AgentOS / Harness / Orchestration 등)
 *    적극 활용 — CLAUDE.md §3 "buzzword 적극 활용" 요구사항.
 *
 * i18n 구조: name/tagline/description, components.name/description 은
 * `messages/{en,ko}.json` 의 `architecture.layers.<id>` 로 이동. 이 파일은
 * non-translatable identifier(레벨/아이콘/accent/컴포넌트 key 순서) 만 보유.
 */

import {
  Boxes,
  Cpu,
  Layers,
  Network,
  type LucideIcon,
} from "lucide-react";

export const archLayerIds = [
  "orchestration",
  "multiAgent",
  "agentOs",
  "harness",
] as const;

export type ArchLayerId = (typeof archLayerIds)[number];

export interface ArchLayerMeta {
  level: string;
  icon: LucideIcon;
  accent: "primary" | "muted";
  componentKeys: readonly string[];
}

export const archLayerMeta: Record<ArchLayerId, ArchLayerMeta> = {
  orchestration: {
    level: "L4",
    icon: Network,
    accent: "primary",
    componentKeys: ["router", "decomposer", "synthesizer", "telemetry"],
  },
  multiAgent: {
    level: "L3",
    icon: Boxes,
    accent: "primary",
    componentKeys: ["researcher", "coder", "critic", "planner", "toolUser"],
  },
  agentOs: {
    level: "L2",
    icon: Layers,
    accent: "primary",
    componentKeys: [
      "scheduler",
      "memory",
      "ipc",
      "state",
      "observability",
    ],
  },
  harness: {
    level: "L1",
    icon: Cpu,
    accent: "muted",
    componentKeys: ["runtime", "sandbox", "guardrails", "streamer"],
  },
};

// 페이지가 빌드해서 ArchitectureDiagram 에 전달하는 localized 레이어
export interface ArchComponent {
  name: string;
  description: string;
}

export interface ArchLayer {
  id: ArchLayerId;
  level: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accent: "primary" | "muted";
  components: readonly ArchComponent[];
}
