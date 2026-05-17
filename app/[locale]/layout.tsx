import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import "../globals.css";

import { brand } from "@/lib/brand";
import { routing, type Locale } from "@/i18n/routing";
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brand" });

  const tagline = t("tagline");
  const secondary = t("secondary");
  const description = t("modelDescription");
  const ogLocale = locale === "ko" ? "ko_KR" : "en_US";

  return {
    metadataBase: new URL(`https://${brand.company.domain}`),
    title: {
      default: `${brand.company.name} — ${tagline}`,
      template: `%s | ${brand.company.name}`,
    },
    description,
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
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ko: "/ko",
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: `https://${brand.company.domain}/${locale}`,
      siteName: brand.company.name,
      title: `${brand.company.name} — ${tagline}`,
      description: secondary,
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.company.name} — ${tagline}`,
      description: secondary,
      creator: brand.social.twitter,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <NextIntlClientProvider locale={locale as Locale} messages={messages}>
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
              {t("skipToMain")}
            </a>
            <div className="flex min-h-screen flex-col">
              <SiteNav />
              <div id="main-content" className="flex-1">
                {children}
              </div>
              <SiteFooter />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
