import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — Architecture`;

export default function Image({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  return generatePageOG({
    eyebrow: isKo ? "시스템 아키텍처" : "System Architecture",
    title: isKo ? "아키텍처" : "Architecture",
    description: isKo
      ? "Orchestration → Multi-Agent → AgentOS → Harness — 4 레이어 에이전트 스택."
      : "Orchestration → Multi-Agent → AgentOS → Harness — a four-layer agentic stack.",
  });
}
