import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — Capabilities`;

export default function Image({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  return generatePageOG({
    eyebrow: isKo ? "모델 능력" : "Model Capabilities",
    title: isKo ? "능력" : "Capabilities",
    description: isKo
      ? "멀티모달 추론 · 롱컨텍스트 · 도구 사용 · 코드 생성 · 에이전트 워크플로."
      : "Multimodal reasoning · long-context · tool use · code generation · agentic workflows.",
  });
}
