import { ImageResponse } from "next/og";

import { brand } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(135deg, ${brand.palette.primary.hex} 0%, ${brand.palette.accent.hex} 100%)`,
          borderRadius: "32px",
        }}
      />
    ),
    { ...size },
  );
}
