import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Time Shuttle - Free Online Timestamp & Date Converter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: 28, background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", marginBottom: 32 }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: "white", fontFamily: "ui-monospace, monospace" }}>TIME</div>
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, color: "#1e1b4b", letterSpacing: "-0.02em" }}>Time Shuttle</div>
        <div style={{ fontSize: 32, color: "#4c1d95", marginTop: 16, maxWidth: 900, textAlign: "center" }}>Convert timestamps &amp; dates in your browser — 100% private</div>
      </div>
    ),
    { ...size }
  );
}
