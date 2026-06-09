import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)", borderRadius: "20%" }}>
        <div style={{ fontSize: 160, fontWeight: 800, color: "white", fontFamily: "monospace" }}>TIME</div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
