import type { Metadata } from "next";
import "./globals.css";

import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${brand.company.domain}`),
  title: {
    default: `${brand.company.name} — ${brand.tagline.primary}`,
    template: `%s | ${brand.company.name}`,
  },
  description: brand.model.description,
  keywords: [
    "AI",
    "AGI",
    "foundation model",
    "frontier model",
    "multimodal",
    "agentic AI",
    "AgentOS",
    "harness",
    "orchestration",
    "alignment",
    "Nexora",
    "Nexora-1",
    "Korean AI",
    "Seoul AI",
  ],
  authors: [
    { name: brand.company.name, url: `https://${brand.company.domain}` },
  ],
  creator: brand.company.name,
  publisher: brand.company.legalName,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: `https://${brand.company.domain}`,
    siteName: brand.company.name,
    title: `${brand.company.name} — ${brand.tagline.primary}`,
    description: brand.tagline.secondary,
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.company.name} — ${brand.tagline.primary}`,
    description: brand.tagline.secondary,
    creator: brand.social.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
