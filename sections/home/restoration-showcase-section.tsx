import {
  FeaturedProjectsSection,
  type FeaturedProject,
} from "./featured-projects-section";

export type RestorationSlide = {
  id: string;
  heading: string;
  leftLabel: string;
  rightLabel: string;
  href: string;
  number: string;
  url: string;
  alt: string;
};

const defaultRestorationSlides: readonly RestorationSlide[] = [
  {
    id: "villa-el-salva-01",
    heading: "VILLA EL SALVA",
    leftLabel: "Heritage Value",
    rightLabel: "Portuguese-Inspired Architecture",
    href: "/projects/el-salva-villa",
    number: "",
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/restoration-showcase-villa1.webp",
    alt: "Restored Goan villa interior opening into tropical landscape",
  },
  {
    id: "villa-el-salva-02",
    heading: "VILLA PEROLA",
    leftLabel: "Heritage Value",
    rightLabel: "Portuguese-Inspired Architecture",
    href: "/projects/villa-perola",
    number: "",
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/legacy-section-villa2.webp",
    alt: "Restoration project facade with warm laterite material",
  },
] as const;

type RestorationShowcaseSectionProps = {
  backgroundPosition?: string;
  backgroundTexture?: string;
  designSource?: string;
  labelFont?: "site" | "roboto-slab";
  showLabels?: boolean;
  smoothContactTransition?: boolean;
  slides?: readonly RestorationSlide[];
};

export function RestorationShowcaseSection({
  backgroundPosition = "center",
  backgroundTexture = "/assets/textures/heritage-texture.webp",
  showLabels = true,
  smoothContactTransition = false,
  slides = defaultRestorationSlides,
}: RestorationShowcaseSectionProps = {}) {
  const restorationSlides = slides.length > 0 ? slides : defaultRestorationSlides;
  const restorationProjects: readonly FeaturedProject[] = restorationSlides.map(
    (slide) => ({
      id: slide.id,
      title: slide.heading,
      href: slide.href,
      url: slide.url,
      imageAlt: slide.alt,
      description: slide.number,
      metadata: showLabels
        ? [[slide.leftLabel, slide.rightLabel]]
        : [],
    }),
  );

  return (
    <FeaturedProjectsSection
      ctaLabel="View Project"
      bottomTransition={smoothContactTransition}
      kicker="Restoration"
      projects={restorationProjects}
      sectionKey="restoration-showcase"
      sectionTitle="Restoration Showcase"
      texturePath={backgroundTexture}
      texturePosition={backgroundPosition}
      theme="restoration"
    />
  );
}
