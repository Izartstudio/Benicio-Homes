"use client";

import responsiveStyles from "./about-section.responsive.module.css";
import { OptimizedImage as Image } from "@/components/ui/optimized-image";
import { useLayoutEffect } from "react";
import { setupSectionReveals } from "@/utils/setup-section-reveals";
import { CdnImage } from "@/components/ui/cdn-image";
import { OrangeBlock } from "@/components/ui/orange-block";

const texturePath = "/assets/textures/concrete-background-textures-09-1.webp";

const aboutImages = {
  textureLeft: {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/about-section-diagonal1.webp",
    alt: "Warm material texture with shadow",
  },
  villaEntry: {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/about-section-diagonal2.webp",
    alt: "Architecture image with pool and garden",
  },
  stone: {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/about-section-diagonal3.webp",
    alt: "Pale stone texture panel",
  },
  courtyard: {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/about-section-diagonal4.webp",
    alt: "Villa courtyard and landscape",
  },
  palm: {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/about-section-diagonal5.webp",
    alt: "Palm shadow and coastal atmosphere",
  },
  villaRight: {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/about-section-diagonal6.webp",
    alt: "Villa pool and green boundary wall",
  },
} as const;

export function AboutSection() {
  useLayoutEffect(() => {
    const section = document.querySelector<HTMLElement>('[data-section="about"]');

    if (!section) {
      return;
    }

    const tabletMedia = window.matchMedia(
      "(min-width: 768px) and (max-width: 1199px)",
    );
    let cleanupReveals = () => {};

    const setupReveals = () => {
      cleanupReveals();
      const isTablet = tabletMedia.matches;
      cleanupReveals = setupSectionReveals(section, {
        duration: isTablet ? 0.68 : undefined,
        groupTrigger: isTablet ? section : undefined,
        selector: isTablet
          ? [
              "[data-about-heading-reveal]",
              '[data-about-reveal="2"]',
              '[data-about-reveal="3"]',
              '[data-about-reveal="4"]',
              '[data-about-reveal="5"]',
            ].join(", ")
          : "[data-reveal-child]",
        stagger: isTablet ? 0.07 : undefined,
        start: isTablet ? "top 115%" : undefined,
      });
    };

    setupReveals();
    tabletMedia.addEventListener("change", setupReveals);

    return () => {
      tabletMedia.removeEventListener("change", setupReveals);
      cleanupReveals();
    };
  }, []);

  return (
    <section
      aria-labelledby="about-section-title"
      className={`relative overflow-x-clip overflow-y-visible bg-[#b9b9b9] text-[#232323] ${responsiveStyles.responsiveRoot}`}
      data-section="about"
      id="about"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        data-about-background-layer
      >
        <div
          className="absolute inset-0 bg-[#b9b9b9]"
          data-about-background-fill
        />
        <div
          className="pointer-events-none absolute inset-0 select-none bg-cover bg-center opacity-20 mix-blend-multiply [mask-image:linear-gradient(to_bottom,#000_0%,#000_calc(100%_-_5rem),transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_calc(100%_-_5rem),transparent_100%)]"
          data-about-background-texture
          style={{ backgroundImage: `url("${texturePath}")` }}
        />
      </div>

      <div
        className="relative mx-auto min-h-[clamp(850px,66vw,950px)] w-full max-w-[1440px] px-[3.8%] pb-[clamp(5rem,7vw,7rem)]"
        data-about-content-container
      >
        <div
          className="pointer-events-none relative h-[clamp(2.85rem,4.65vw,4.15rem)] w-full overflow-visible"
          data-about-reveal="1"
        >
          <h2
            id="about-section-title"
            className={`absolute left-1/2 top-[clamp(-2.5rem,-2.75vw,-1.7rem)] z-40 w-[min(96vw,1440px)] whitespace-nowrap text-center font-display text-[clamp(3.25rem,7.05vw,102.4px)] font-[350] leading-[135%] tracking-[0] text-white capitalize mix-blend-overlay lg:text-[102.4px] ${responsiveStyles.aboutHeading}`}
            data-about-heading
          >
            <span
              className="block"
              data-about-heading-reveal
              data-reveal-child
            >
              GOA WRITES THE FIRST DRAFT.
            </span>
          </h2>
        </div>

        <div
          className="relative z-20 mx-auto max-w-[47rem] pt-[clamp(5rem,8.4vw,7.5rem)]"
          data-reveal-child
          data-about-reveal="2"
        >
          <p
            className="text-justify font-display text-[clamp(1.05rem,1.45vw,1.375rem)] font-light leading-[135%] tracking-[0.01em] text-[#2d2d2d] lg:text-[20px]"
            data-about-intro
          >
            Every development is planned with longevity in mind, balancing
            architecture, landscape, and craftsmanship to create homes that
            continue to hold value, relevance, and meaning over time.
          </p>
        </div>

        <div
          className="relative z-20 mt-[clamp(3rem,5vw,4.5rem)] h-[clamp(650px,50vw,720px)]"
          data-reveal-child
          data-about-reveal="3"
          data-about-collage
        >
          <div
            aria-hidden="true"
            className="absolute bottom-[calc(2%+20.83px)] left-1/2 top-[calc(4%+20.83px)] z-0 w-px -translate-x-1/2 bg-[#9c9a9a] max-md:bottom-[calc(2%+10px)] max-md:top-[calc(4%+10px)]"
            data-about-vertical-divider
          />

          <div
            className="absolute inset-0"
            data-about-left-image-stack
          >
            <figure
              className="absolute left-[4%] top-[3%] z-20 h-[clamp(7.85rem,11.04vw,9.9375rem)] w-[clamp(14rem,19.65vw,17.6875rem)] overflow-hidden"
              data-about-image="texture-left"
            >
              <CdnImage
                src={aboutImages.textureLeft.url}
                alt={aboutImages.textureLeft.alt}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </figure>
            <figure
              className="absolute left-[19%] top-[16%] z-10 h-[clamp(7.85rem,11.04vw,9.9375rem)] w-[clamp(14rem,19.65vw,17.6875rem)] overflow-hidden"
              data-about-image="villa-entry"
            >
              <CdnImage
                src={aboutImages.villaEntry.url}
                alt={aboutImages.villaEntry.alt}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </figure>
          </div>

          <div
            className="absolute inset-y-0 left-1/2 z-50 w-px -translate-x-1/2"
            data-about-center-axis
          >
            <OrangeBlock
              className="absolute left-1/2 top-[4%] -translate-x-1/2"
              data-about-axis-marker="top"
            />
            <figure
              className="absolute right-1/2 top-[34%] z-10 h-[clamp(7.85rem,11.04vw,9.9375rem)] w-[clamp(14rem,19.65vw,17.6875rem)] overflow-hidden"
              data-about-image="stone"
            >
              <CdnImage
                src={aboutImages.stone.url}
                alt={aboutImages.stone.alt}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </figure>
            <div
              className="absolute left-1/2 top-[54%] z-60 flex h-[clamp(3.25rem,4.5vw,4rem)] w-[clamp(5.5rem,6vw,6.5rem)] -translate-x-1/2 items-center justify-center overflow-hidden bg-[#b9b9b9]"
              data-about-logo
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply"
                style={{ backgroundImage: `url("${texturePath}")` }}
              />
              <Image
                src="/assets/footer/Logo-footer.svg"
                alt="Benicio Homes"
                width={75}
                height={57}
                className="relative z-10 h-[clamp(2.35rem,3.5vw,3.25rem)] w-auto"
              />
            </div>
            <OrangeBlock
              className="absolute bottom-[2%] left-1/2 -translate-x-1/2"
              data-about-axis-marker="bottom"
            />
          </div>

          <div
            className="absolute inset-0"
            data-about-right-image-stack
          >
            <figure
              className="absolute left-1/2 top-[47%] z-30 h-[clamp(7.85rem,11.04vw,9.9375rem)] w-[clamp(14rem,19.65vw,17.6875rem)] overflow-hidden"
              data-about-image="courtyard"
            >
              <CdnImage
                src={aboutImages.courtyard.url}
                alt={aboutImages.courtyard.alt}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </figure>
            <figure
              className="absolute left-[64%] top-[62%] z-20 h-[clamp(7.85rem,11.04vw,9.9375rem)] w-[clamp(14rem,19.65vw,17.6875rem)] overflow-hidden"
              data-about-image="palm"
            >
              <CdnImage
                src={aboutImages.palm.url}
                alt={aboutImages.palm.alt}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </figure>
            <figure
              className="absolute right-[0] top-[77%] z-10 h-[clamp(7.85rem,11.04vw,9.9375rem)] w-[clamp(14rem,19.65vw,17.6875rem)] overflow-hidden"
              data-about-image="villa-right"
            >
              <CdnImage
                src={aboutImages.villaRight.url}
                alt={aboutImages.villaRight.alt}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </figure>
          </div>
        </div>

        <div
          className="absolute left-[7.4%] top-[67%] z-30 flex max-w-[34rem] items-start gap-[clamp(2.5rem,4vw,3.75rem)]"
          data-reveal-child
          data-about-reveal="4"
        >
          <OrangeBlock
            className="mt-2"
            data-about-orange-square="left-copy"
          />
          <p
            className="max-w-[27rem] text-justify font-serif text-[12.557px] font-normal leading-normal text-[#232323]"
            data-about-copy="left"
          >
            Every opening is shaped by light, breeze, and landscape, allowing
            the home to breathe with its surroundings.
          </p>
        </div>

        <div
          className="absolute right-[4.8%] top-[54%] z-40 flex max-w-[33rem] items-start gap-[clamp(2rem,3vw,3rem)]"
          data-reveal-child
          data-about-reveal="5"
        >
          <p
            className="max-w-[24rem] text-justify font-serif text-[12.557px] font-normal leading-normal text-[#232323]"
            data-about-copy="right"
          >
            Every material is chosen to weather with grace, letting the
            architecture mature alongside the landscape.
          </p>
          <OrangeBlock
            className="mt-2"
            data-about-orange-square="right-copy"
          />
        </div>
      </div>
    </section>
  );
}
