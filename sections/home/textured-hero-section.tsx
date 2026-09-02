import responsiveStyles from "./textured-hero-section.responsive.module.css";
import { HomeHeroSequence } from "./home-hero-sequence";
import { HomeHeroScrollTransition } from "./home-hero-scroll-transition";
import { HeroFloatingGrid } from "./hero-floating-grid";
import type { HeroImage } from "./hero-shrinking-gallery";

const heroImages: readonly HeroImage[] = [
  {
    src: "/assets/projects/zen-villa-2-bg.png",
    alt: "A home surrounded by tropical planting",
  },
  {
    src: "/assets/projects/gallery-earth-light-shelter.jpg",
    alt: "A light-filled interior framed by natural materials",
  },
  {
    src: "/assets/projects/vanam-site-showcase.png",
    alt: "Vanam residence at golden hour",
  },
  {
    src: "/assets/projects/villaelsalvabg.png",
    alt: "A restored Goan villa set among palm trees",
  },
  {
    src: "/assets/projects/gallery-calm-through-craft.png",
    alt: "Sunlight casting a palm shadow across a textured wall",
  },
] as const;

const floatingImageColumns = [
  [
    "/assets/projects/NAYANBG.png",
    "/assets/projects/villaelsalvabg.png",
    "/assets/projects/gallery-earth-light-shelter.jpg",
    "/assets/projects/vanam-site-showcase.png",
  ],
  [
    "/assets/projects/villaperolabg.png",
    "/assets/projects/gallery-built-around-nature.png",
    "/assets/projects/zen-villa-2-bg.png",
    "/assets/projects/gallery-calm-through-craft.png",
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
          <div
            aria-hidden="true"
            className={responsiveStyles.concreteBackground}
            data-hero-background-fill
          />
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
