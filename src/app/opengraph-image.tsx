import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 85% 10%, rgba(255,122,24,0.45), transparent 45%), radial-gradient(circle at 0% 100%, rgba(155,107,255,0.3), transparent 45%), linear-gradient(160deg, #2A182D, #1F1024 60%, #170B1B)",
          color: "#F8F3FA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: "linear-gradient(135deg, #FFA45C, #F97316)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "#1A0C10",
            }}
          >
            H
          </div>
          <div style={{ fontSize: 28, color: "#B8A6C1" }}>{site.domain}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 110, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>
            {site.name}
            <span style={{ color: "#FF7A18" }}>.</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 52, fontWeight: 700, color: "#FF7A18" }}>Software Developer</div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 30, color: "#E4D9E9" }}>
            {`Digital Marketer • Graphic Designer • ${site.experienceLabel}`}
          </div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Web Development", "App Development", "Desktop Development", "Custom Software"].map((t) => (
            <div
              key={t}
              style={{
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.06)",
                fontSize: 22,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
