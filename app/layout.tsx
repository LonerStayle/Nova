import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nova",
  description:
    "Bootstrap placeholder — 가공 회사 identity 및 풍자 메타데이터는 후속 iter 에서 교체됩니다.",
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
