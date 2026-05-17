import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — Benchmarks`;

export default function Image({ params }: { params: { locale: string } }) {
  const isKo = params.locale === "ko";
  return generatePageOG({
    eyebrow: isKo ? "성능 리포트" : "Performance Report",
    title: isKo ? "벤치마크" : "Benchmarks",
    description: isKo
      ? "업계 표준 평가 스위트 전반의 프론티어 결과 — MMLU · HumanEval · GSM8K · MATH · AGIEval."
      : "Frontier results across industry-standard evaluation suites — MMLU · HumanEval · GSM8K · MATH · AGIEval.",
  });
}
