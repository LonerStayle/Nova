import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

import { brand } from "@/lib/brand";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-accent)/0.4)]"
          >
            Skip to main content
          </a>
          <div className="flex min-h-screen flex-col">
            <SiteNav />
            <div id="main-content" className="flex-1">
              {children}
            </div>
            <SiteFooter />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
