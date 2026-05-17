import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — Developer Documentation`;

export default function Image({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  return generatePageOG({
    eyebrow: isKo ? "개발 문서" : "Developer Documentation",
    title: isKo ? `${brand.model.flagship} 으로 만드세요` : `Build with ${brand.model.flagship}`,
    description: isKo
      ? "퀵스타트 · API 레퍼런스 · 스트리밍 · 툴 사용 — 프로덕션 통합에 필요한 모든 것."
      : "Quickstart · API reference · streaming · tool use — everything you need to ship a production integration.",
  });
}
