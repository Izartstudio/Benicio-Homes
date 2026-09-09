import { ImageResponse } from "next/og";
export async function GET(request: Request) {
 const title = (new URL(request.url).searchParams.get("title") || "Benicio Homes").slice(0, 180);
 return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 72, background: "#232323", color: "#e3ded4" }}><div style={{ display: "flex", fontSize: 30, color: "#dc4c28" }}>BENICIO HOMES · GOA</div><div style={{ display: "flex", fontSize: 64, lineHeight: 1.12 }}>{title}</div><div style={{ display: "flex", fontSize: 24 }}>Architecture · Tropical homes · Restoration</div></div>, { width: 1200, height: 630 });
}
