import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — Benchmarks`;

export default function Image() {
  return generatePageOG({
    eyebrow: "Performance Report",
    title: "Benchmarks",
    description:
      "Frontier results across industry-standard evaluation suites — MMLU · HumanEval · GSM8K · MATH · AGIEval.",
  });
}
