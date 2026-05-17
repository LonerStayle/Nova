import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — Careers`;

export default function Image({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  return generatePageOG({
    eyebrow: isKo ? "합류하기" : "Careers",
    title: isKo ? "서울에서 frontier 를 만듭니다" : "Build the frontier from Seoul",
    description: isKo
      ? "60명. 600명처럼 출시. 리서치 · 엔지니어링 · 안전 · 프로덕트 · 오퍼레이션 채용 중."
      : "Sixty people. Shipping like six hundred. Hiring across research, engineering, safety, product, and operations.",
  });
}
