import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — Capabilities`;

export default function Image() {
  return generatePageOG({
    eyebrow: "Model Capabilities",
    title: "Capabilities",
    description:
      "Multimodal reasoning · long-context · tool use · code generation · agentic workflows.",
  });
}
