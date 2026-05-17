import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — Security`;

export default function Image() {
  return generatePageOG({
    eyebrow: "Safety & Security",
    title: "Security",
    description:
      "Alignment · red-teaming · compliance · provenance — constitutional safety practice for frontier AI.",
  });
}
