import responsiveStyles from "./textured-hero-section.responsive.module.css";
import { HomeHeroSequence } from "./home-hero-sequence";
import { HomeHeroScrollTransition } from "./home-hero-scroll-transition";
import { HeroFloatingGrid } from "./hero-floating-grid";
import type { HeroImage } from "./hero-shrinking-gallery";

const heroImages: readonly HeroImage[] = [
  {
    src: "/assets/projects/bgvanam-hero.webp",
    alt: "Vanam Villa by Benicio Homes",
  },
  {
    src: "/assets/projects/zen-villa-2-hero.webp",
    alt: "Zen Villa 2 by Benicio Homes",
  },
  {
    src: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/perola/villaperolabg.webp",
    alt: "Villa Perola by Benicio Homes",
  },
  {
    src: "/assets/projects/nayan-hero.webp",
    alt: "Nayan Villa by Benicio Homes",
  },
  {
    src: "/assets/projects/el-salva-hero.webp",
    alt: "El Salva Villa by Benicio Homes",
  },
  {
    src: "/assets/projects/zen-villa-1-hero.webp",
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
