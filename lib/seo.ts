import type { Metadata } from "next";
export const siteUrl = "https://benicio.co.in";
export const pageSeo: Record<string, readonly [string, string]> = {
  "/": [
    "Luxury Villas & Design-Led Homes in Goa | Benicio",
    "Brutalist Tropical Homes in Goa"
  ],
  "/the-practice": [
    "Design-Led Real Estate Developer in Goa | Benicio",
    "A Design-Led Real Estate Practice in Goa"
  ],
  "/projects": [
    "Luxury Villas and Homes in Goa | Benicio Projects",
    "Homes and Villas by Benicio"
  ],
  "/journal": [
    "Goa Architecture, Materials & Restoration | Benicio Journal",
    "Notes from Goa"
  ],
  "/projects/nayan-villa": [
    "4 BHK Villas for Sale in Majorda, South Goa | Nayan",
    "Nayan Villas in Majorda, South Goa"
  ],
  "/projects/vanam-villas": [
    "Vanam Villas, Anjuna Goa | 4 BHK Tropical Homes",
    "Vanam Villas in Anjuna, Goa"
  ],
  "/projects/zen-villas-2": [
    "Zen Villa II, Assagao Goa | 3 BHK Private Villa",
    "Zen Villa II in Assagao, Goa"
  ],
  "/projects/zen-villa-1": [
    "Zen Villa I, Assagao Goa | 3 BHK Tropical Home",
    "Zen Villa I in Assagao, Goa"
  ],
  "/projects/el-salva-villa": [
    "Restored 5 BHK Villa in Salvador do Mundo | El Salva",
    "Villa El Salva in Salvador do Mundo, Goa"
  ],
  "/projects/villa-perola": [
    "Villa Perola, Socorro Goa | Restored Heritage Home",
    "Villa Perola in Socorro, Goa"
  ]
};
export function pageMetadata(path: string, title: string, description: string): Metadata {
  title = pageSeo[path]?.[0] ?? title;
  const image = `${siteUrl}/social?title=${encodeURIComponent(title)}`;
  return {
    title, description, alternates: { canonical: `${siteUrl}${path === "/" ? "" : path}` },
    openGraph: { title, description, url: `${siteUrl}${path}`, type: "website", siteName: "Benicio Homes", images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
