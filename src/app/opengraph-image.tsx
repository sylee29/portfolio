import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Simple branded card in the E4 teal palette. English only, so the built-in font suffices. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #05080F 0%, #0B1A33 45%, #0E3B45 100%)",
          color: "#FFFFFF",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 10, color: "rgba(255,255,255,0.74)", fontWeight: 600 }}>
          {site.hero.kicker.name}
        </div>
        <div style={{ display: "flex", fontSize: 150, fontWeight: 800, lineHeight: 1, letterSpacing: -4, marginTop: 28 }}>
          {site.hero.title.line1}
        </div>
        <div style={{ display: "flex", fontSize: 150, fontWeight: 800, lineHeight: 1, letterSpacing: -4 }}>
          {site.hero.title.line2}
          <span style={{ color: "#5EEAD4" }}>{site.hero.title.dot}</span>
        </div>
        <div style={{ fontSize: 28, letterSpacing: 16, color: "#5EEAD4", fontWeight: 600, marginTop: 36 }}>{site.hero.sub}</div>
      </div>
    ),
    size,
  );
}
