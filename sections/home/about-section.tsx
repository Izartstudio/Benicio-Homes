"use client";

import Image from "next/image";
import { useEffect } from "react";
import { setupSectionReveals } from "@/utils/setup-section-reveals";

const texturePath = "/assets/textures/concrete-background-textures-09-1.svg";
const orangeBlockPath = "/assets/blocks/orange-block.svg";

const aboutImages = {
  textureLeft: {
    src: "/assets/carousel/carousel1.svg",
    alt: "Warm material texture with shadow",
  },
  villaEntry: {
    src: "/assets/carousel/carousel2.svg",
    alt: "Architecture image with pool and garden",
  },
  stone: {
    src: "/assets/carousel/carousel3.svg",
    alt: "Pale stone texture panel",
  },
  courtyard: {
    src: "/assets/carousel/carousel4.svg",
    alt: "Villa courtyard and landscape",
  },
  palm: {
    src: "/assets/carousel/carousel5.svg",
    loading: "eager",
    alt: "Palm shadow and coastal atmosphere",
  },
  villaRight: {
    src: "/assets/carousel/carousel6.svg",
    alt: "Villa pool and green boundary wall",
  },
} as const;

export function AboutSection() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('[data-section="about"]');

    if (!section) {
      return;
    }

    return setupSectionReveals(section);
  }, []);

  return (
    <section
      aria-labelledby="about-section-title"
      className="relative isolate overflow-x-clip overflow-y-visible bg-[#b9b9b9] text-[#232323]"
      data-section="about"
      id="about"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        data-about-background-layer
      >
        <div className="absolute inset-0 bg-[#b9b9b9]" data-about-background-fill />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply"
          data-about-background-texture
          style={{ backgroundImage: `url("${texturePath}")` }}
        />
      </div>

      <div
        className="relative z-10 mx-auto min-h-[clamp(850px,66vw,950px)] w-full max-w-[1440px] px-[3.8%] pb-[clamp(5rem,7vw,7rem)]"
        data-about-content-container
      >
        <div
          className="pointer-events-none relative z-40 h-[clamp(2.85rem,4.65vw,4.15rem)] w-full overflow-visible"
          data-reveal-child
          data-about-reveal="1"
        >
          <h2
            id="about-section-title"
            className="absolute left-1/2 top-[clamp(-3.1rem,-3.4vw,-1.7rem)] w-[min(96vw,1440px)] -translate-x-1/2 whitespace-nowrap text-center font-display text-[clamp(3.25rem,7.05vw,6.35rem)] font-normal uppercase leading-[0.78] tracking-[0] text-white"
            data-about-heading
          >
            GOA WRITES THE FIRST DRAFT.
          </h2>
        </div>

        <div
          className="relative z-20 mx-auto max-w-[47rem] pt-[clamp(5rem,8.4vw,7.5rem)]"
          data-reveal-child
          data-about-reveal="2"
        >
          <p
            className="text-left font-mono text-[clamp(1.05rem,1.45vw,1.375rem)] leading-[1.42] tracking-[0.01em] text-[#232323]"
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
            className="absolute inset-0"
            data-about-left-image-stack
          >
            <figure
              className="absolute left-[4%] top-[3%] z-20 h-[clamp(7.85rem,11.04vw,9.9375rem)] w-[clamp(14rem,19.65vw,17.6875rem)] overflow-hidden"
              data-about-image="texture-left"
            >
              <Image
                src={aboutImages.textureLeft.src}
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
              <Image
                src={aboutImages.villaEntry.src}
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
            <div
              className="absolute left-1/2 top-[4%] size-[clamp(16px,1.4vw,22px)] -translate-x-1/2 bg-cover bg-center"
              data-about-axis-marker="top"
              style={{ backgroundImage: `url("${orangeBlockPath}")` }}
            />
            <div
              className="absolute left-1/2 top-[8%] h-[85%] w-px -translate-x-1/2 bg-[#9c9a9a]"
              data-about-vertical-divider
            />
            <figure
              className="absolute right-1/2 top-[34%] z-10 h-[clamp(7.85rem,11.04vw,9.9375rem)] w-[clamp(14rem,19.65vw,17.6875rem)] overflow-hidden"
              data-about-image="stone"
            >
              <Image
                src={aboutImages.stone.src}
                alt={aboutImages.stone.alt}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </figure>
            <div
              className="absolute left-1/2 top-[54%] z-60 flex h-[clamp(3.25rem,4.5vw,4rem)] w-[clamp(5.5rem,6vw,6.5rem)] -translate-x-1/2 items-center justify-center bg-[#b9b9b9]"
              data-about-logo
            >
              <Image
                src="/assets/footer/Logo-footer.svg"
                alt="Benicio"
                width={75}
                height={57}
                className="h-[clamp(2.35rem,3.5vw,3.25rem)] w-auto"
              />
            </div>
            <div
              className="absolute bottom-[2%] left-1/2 size-[clamp(16px,1.4vw,22px)] -translate-x-1/2 bg-cover bg-center"
              data-about-axis-marker="bottom"
              style={{ backgroundImage: `url("${orangeBlockPath}")` }}
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
              <Image
                src={aboutImages.courtyard.src}
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
              <Image
                src={aboutImages.palm.src}
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
              <Image
                src={aboutImages.villaRight.src}
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
          <div
            aria-hidden="true"
            className="mt-2 size-[clamp(10px,0.85vw,13px)] shrink-0 bg-cover bg-center"
            data-about-orange-square="left-copy"
            style={{ backgroundImage: `url("${orangeBlockPath}")` }}
          />
          <p
            className="max-w-[27rem] font-display text-[clamp(0.95rem,1.08vw,1rem)] leading-[1.28] text-[#232323]"
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
            className="max-w-[24rem] font-display text-[clamp(0.95rem,1.08vw,1rem)] leading-[1.28] text-[#232323]"
            data-about-copy="right"
          >
            Every material is chosen to weather with grace, letting the
            architecture mature alongside the landscape.
          </p>
          <div
            aria-hidden="true"
            className="mt-2 size-[clamp(10px,0.85vw,13px)] shrink-0 bg-cover bg-center"
            data-about-orange-square="right-copy"
            style={{ backgroundImage: `url("${orangeBlockPath}")` }}
          />
        </div>
      </div>
    </section>
  );
}
