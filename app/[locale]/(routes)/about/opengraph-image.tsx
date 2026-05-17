import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — About`;

export default function Image({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  return generatePageOG({
    eyebrow: isKo ? "회사 소개" : "About",
    title: brand.company.name,
    description: isKo
      ? "서울에서 만드는 프론티어 AI — Nexora-1 을 만든 팀과 미션."
      : "Building frontier AI from Seoul — the team and the mission behind Nexora-1.",
  });
}
