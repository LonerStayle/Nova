import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — Security`;

export default function Image({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  return generatePageOG({
    eyebrow: isKo ? "안전 · 보안" : "Safety & Security",
    title: isKo ? "보안" : "Security",
    description: isKo
      ? "Alignment · Red-teaming · Compliance · Provenance — 프론티어 AI 를 위한 constitutional 안전 실천."
      : "Alignment · red-teaming · compliance · provenance — constitutional safety practice for frontier AI.",
  });
}
