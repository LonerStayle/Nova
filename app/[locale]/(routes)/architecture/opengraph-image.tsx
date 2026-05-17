import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — Architecture`;

export default function Image() {
  return generatePageOG({
    eyebrow: "System Architecture",
    title: "Architecture",
    description:
      "Orchestration → Multi-Agent → AgentOS → Harness — a four-layer agentic stack.",
  });
}
