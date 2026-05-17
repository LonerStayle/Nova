import type { MetadataRoute } from "next";

import { brand } from "@/lib/brand";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${brand.company.domain}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
