import { PROJECT_MEDIA } from "@/app/projects/data/project-media";
import responsiveStyles from "./textured-hero-section.responsive.module.css";
import { HomeHeroSequence } from "./home-hero-sequence";
import { HomeHeroScrollTransition } from "./home-hero-scroll-transition";
import { HeroFloatingGrid } from "./hero-floating-grid";
import type { HeroImage } from "./hero-shrinking-gallery";

const heroImages: readonly HeroImage[] = [
  {
    src: "/assets/hero/loader/interior-kitchen.jpg",
    alt: "A light-filled kitchen opening onto a tropical garden",
  },
  {
    src: "/assets/hero/loader/illuminated-rural-house.png",
    alt: "A rural house framed by an illuminated installation",
  },
  {
    src: "/assets/hero/loader/city-sky-billboard.png",
    alt: "A city installation reflecting the sky",
  },
  {
    src: "/assets/hero/loader/sunset-installation.png",
    alt: "A glowing sunset installation in a public landscape",
  },
  {
    src: "/assets/hero/loader/forest-house.png",
    alt: "A modern house surrounded by dense vegetation",
  },
  {
    src: "/assets/hero/loader/tree-oculus.png",
    alt: "A tree viewed through a circular architectural opening",
  },
  {
    src: "/assets/hero/loader/concrete-harbour-building.png",
    alt: "A sculptural concrete building beside a harbour",
  },
  {
    src: "/assets/hero/loader/landscape-mirror-installation.png",
    alt: "A mirrored installation crossing a green landscape",
  },
  {
    src: "/assets/hero/loader/garden-pool.jpg",
    alt: "A secluded swimming pool surrounded by tropical planting",
  },
  {
    src: "/assets/hero/loader/living-room.jpg",
    alt: "A warm contemporary living room overlooking a garden",
  },
] as const;

const floatingImageColumns = [
  [
    PROJECT_MEDIA.vanamVillas.hero,
    PROJECT_MEDIA.zenVillas2.hero,
    PROJECT_MEDIA.villaPerola.hero,
  ],
  [
    PROJECT_MEDIA.nayanVilla.hero,
    PROJECT_MEDIA.elSalvaVilla.hero,
    PROJECT_MEDIA.zenVilla1.hero,
  ],
] as const;

export function TexturedHeroSection() {
  return (
    <section
      aria-label="Benicio Residences"
      className={`relative isolate ${responsiveStyles.responsiveRoot}`}
      data-section="textured-hero"
    >
      <HomeHeroScrollTransition>
        <HeroFloatingGrid columns={floatingImageColumns} />
        <div className={responsiveStyles.heroScreen} data-hero-screen>
          <HomeHeroSequence images={heroImages} />
        </div>
      </HomeHeroScrollTransition>
      <div
        aria-hidden="true"
        className={responsiveStyles.heroToStepsBlend}
      />
    </section>
  );
}
