import { ImageResponse } from "next/og";

import { brand } from "@/lib/brand";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png" as const;

interface PageOGProps {
  eyebrow: string;
  title: string;
  description: string;
}

/**
 * 공통 OG 이미지 템플릿 — 페이지별 opengraph-image.tsx 가 호출.
 * 검정 배경 + brand 그라데이션 백드롭 + 상단 로고 + 하단 (eyebrow / title / description).
 * ImageResponse 의 Satori 제약: 모든 div 가 display 명시, system font 만 사용.
 */
export function generatePageOG({
  eyebrow,
  title,
  description,
}: PageOGProps): ImageResponse {
  const primary = brand.palette.primary.hex;
  const accent = brand.palette.accent.hex;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
          padding: "80px",
          position: "relative",
          color: "white",
        }}
      >
        {/* subtle background tint */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background: `linear-gradient(135deg, ${primary}55 0%, ${accent}22 100%)`,
          }}
        />

        {/* top: logo + company name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              display: "flex",
              borderRadius: "10px",
              background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`,
            }}
          />
          <div
            style={{
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {brand.company.name}
          </div>
        </div>

        {/* spacer */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* bottom: eyebrow + title + description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: `${accent}cc`,
              fontFamily: "monospace",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "100px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "rgba(255, 255, 255, 0.55)",
              maxWidth: "960px",
              lineHeight: 1.3,
            }}
          >
            {description}
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
