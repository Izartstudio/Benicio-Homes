"use client";

import Image from "next/image";
import { useEffect } from "react";
import { setupSectionReveals } from "@/utils/setup-section-reveals";

const texturePath = "/assets/textures/concrete-background-textures-09-1.svg";
const orangeBlockPath = "/assets/blocks/orange-block.svg";

const storyImages = {
  upper: {
    src: "/assets/projects/palm-house-front-view.png",
    loading: "eager",
    alt: "Open sky above a tropical villa",
  },
  hero: {
    src: "/assets/storysection/storysection.svg",
    loading: "eager",
    alt: "Goan coastal landscape and villa atmosphere",
  },
} as const;

export function StorySection() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('[data-section="story"]');

    if (!section) {
      return;
    }

    return setupSectionReveals(section);
  }, []);

  return (
    <section
      aria-labelledby="story-section-title"
      className="relative isolate overflow-hidden bg-[#2d2d2d] text-bone"
      data-section="story"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        data-story-background-layer
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,#464646_0%,#2d2d2d_100%)]"
          data-story-gradient-overlay
        />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 mix-blend-overlay"
          data-story-texture-layer
          style={{ backgroundImage: `url("${texturePath}")` }}
        />
      </div>

      <div
        className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between px-[3.5%] pt-[clamp(3.25rem,5vw,4.75rem)] font-display text-[clamp(1rem,1.35vw,1.25rem)] uppercase tracking-[0.03em] text-silver"
        data-reveal-child
        data-story-reveal-group="1"
        data-story-intro
      >
        <p data-story-label="existing">EXISTING</p>
        <div
          aria-hidden="true"
          className="h-px w-[clamp(44px,3.5vw,56px)] bg-laterite"
          data-story-orange-divider
        />
        <p data-story-label="enduring">ENDURING</p>
      </div>

      <div
        className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-[1fr_1fr] gap-[clamp(5rem,11vw,10rem)] px-[5.2%] pt-[clamp(6rem,8.4vw,7.5rem)]"
        data-reveal-child
        data-story-reveal-group="2"
        data-story-copy
      >
        <h2
          id="story-section-title"
          className="max-w-[33rem] whitespace-pre-line font-display text-[clamp(1.85rem,2.35vw,2.5rem)] font-normal leading-[1.34] tracking-[0.015em] text-bone"
          data-story-copy-heading
        >
          {"The Difference Is Found\nIn What You Don't See"}
        </h2>
        <p
          className="ml-auto max-w-[20rem] font-mono text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.32] tracking-[0.01em] text-silver"
          data-story-copy-paragraph
        >
          Long before construction begins, every proportion, opening, and
          material is considered. Those unseen decisions are what make a
          Benicio home feel timeless.
        </p>
      </div>

      <figure
        className="relative z-20 mx-auto mt-[-1.4rem] aspect-[0.74] w-[clamp(8rem,10.4vw,9.375rem)] overflow-hidden"
        data-reveal-child
        data-story-reveal-group="3"
        data-story-upper-image
      >
        <Image
          src={storyImages.upper.src}
          alt={storyImages.upper.alt}
          fill
          sizes="10vw"
          className="object-cover object-top"
        />
      </figure>

      <div
        className="relative z-10 mt-0 pt-0"
        data-reveal-child
        data-story-reveal-group="4"
        data-story-hero-composition
      >
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-30 grid h-[clamp(8rem,11.8vw,10.625rem)] w-[clamp(8rem,10.4vw,9.375rem)] -translate-x-1/2 place-items-center bg-smoke"
          data-story-grey-block
        >
          <div
            aria-hidden="true"
            className="size-[clamp(38px,3.45vw,50px)] bg-cover bg-center"
            data-story-orange-block
            style={{ backgroundImage: `url("${orangeBlockPath}")` }}
          />
        </div>
        <figure
          className="relative z-20 h-[clamp(28rem,36.111vw,32.5rem)] w-full overflow-hidden"
          data-story-hero-image
        >
          <Image
            src={storyImages.hero.src}
            alt={storyImages.hero.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </figure>
      </div>
    </section>
  );
}
