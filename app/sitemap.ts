import type { MetadataRoute } from "next";

import { brand } from "@/lib/brand";

const ROUTES: ReadonlyArray<{
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/benchmarks", changeFrequency: "monthly", priority: 0.9 },
  { path: "/capabilities", changeFrequency: "monthly", priority: 0.8 },
  { path: "/architecture", changeFrequency: "monthly", priority: 0.8 },
  { path: "/security", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${brand.company.domain}`;
  const lastModified = new Date();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
