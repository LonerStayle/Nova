import {
  generatePageOG,
  ogContentType,
  ogSize,
} from "@/lib/og/page-image-template";
import { brand } from "@/lib/brand";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${brand.company.name} — About`;

export default function Image() {
  return generatePageOG({
    eyebrow: "About",
    title: brand.company.name,
    description:
      "Building frontier AI from Seoul — the team and the mission behind Nexora-1.",
  });
}
