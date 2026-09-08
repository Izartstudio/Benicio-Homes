export const brochures = {
  "el-salva-villa": {
    copy: "Step into El Salva, where heritage and nature come together.",
    pdfPath: "/assets/pdf/el-salva-villa.pdf",
    projectName: "Villa El Salva",
  },
  "nayan-villa": {
    copy: "For brochure, contact our team.",
    projectName: "Nayan Villas",
  },
  "vanam-villas": {
    copy:
      "Every aspect serves a reason. Discover the full concept behind Vanam Villas.",
    pdfPath: "/assets/pdf/vanam-villas.pdf",
    projectName: "Vanam Villas",
  },
  "villa-perola": {
    copy:
      "Discover the restoration story and considered details behind Villa Perola.",
    pdfPath: "/assets/pdf/villa-perola.pdf",
    projectName: "Villa Perola",
  },
  "zen-villas-2": {
    copy:
      "Every space reflects a purpose. Discover the vision behind Zen Villa II.",
    pdfPath: "/assets/pdf/zen-villas-2.pdf",
    projectName: "Zen Villa II",
  },
} as const;

export type BrochureProjectSlug = keyof typeof brochures;

export function getBrochure(projectSlug: string) {
  return brochures[projectSlug as BrochureProjectSlug];
}
