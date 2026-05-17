import { ImageResponse } from "next/og";

import { brand } from "@/lib/brand";

export const alt = `${brand.company.name} — ${brand.tagline.primary}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            background: `linear-gradient(135deg, ${primary}66 0%, ${accent}33 100%)`,
          }}
        />

        {/* top: logo + company name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              display: "flex",
              borderRadius: "14px",
              background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`,
            }}
          />
          <div
            style={{
              fontSize: "36px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {brand.company.name}
          </div>
        </div>

        {/* middle spacer — push bottom content down */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* bottom: location pill, tagline, secondary */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "22px",
              color: `${accent}cc`,
              fontFamily: "monospace",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            {brand.company.location}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "92px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {brand.tagline.primary}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "28px",
              color: "rgba(255, 255, 255, 0.55)",
              maxWidth: "960px",
            }}
          >
            {brand.tagline.secondary}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
