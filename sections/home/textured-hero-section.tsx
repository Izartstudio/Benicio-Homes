import { PROJECT_MEDIA } from "@/app/projects/data/project-media";
import responsiveStyles from "./textured-hero-section.responsive.module.css";
import { HomeHeroSequence } from "./home-hero-sequence";
import { HomeHeroScrollTransition } from "./home-hero-scroll-transition";
import { HeroFloatingGrid } from "./hero-floating-grid";
import type { HeroImage } from "./hero-shrinking-gallery";

const heroImages: readonly HeroImage[] = [
  {
    src: PROJECT_MEDIA.vanamVillas.hero,
    alt: "Vanam Villa by Benicio Homes",
  },
  {
    src: PROJECT_MEDIA.zenVillas2.hero,
    alt: "Zen Villa 2 by Benicio Homes",
  },
  {
    src: PROJECT_MEDIA.villaPerola.hero,
    alt: "Villa Perola by Benicio Homes",
  },
  {
    src: PROJECT_MEDIA.nayanVilla.hero,
    alt: "Nayan Villa by Benicio Homes",
  },
  {
    src: PROJECT_MEDIA.elSalvaVilla.hero,
    alt: "El Salva Villa by Benicio Homes",
  },
  {
    src: PROJECT_MEDIA.zenVilla1.hero,
    alt: "Zen Villa 1 by Benicio Homes",
  },
] as const;

const floatingImageColumns = [
  heroImages.slice(0, 3).map((image) => image.src),
  heroImages.slice(3).map((image) => image.src),
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
