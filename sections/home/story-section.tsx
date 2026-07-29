"use client";

import responsiveStyles from "./story-section.responsive.module.css";
import Image from "next/image";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { setupSectionReveals } from "@/utils/setup-section-reveals";
import { CdnImage } from "@/components/ui/cdn-image";
import { OrangeBlock } from "@/components/ui/orange-block";

gsap.registerPlugin(ScrollTrigger);

const storyImages = {
  upper: {
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/story-section-upper.webp",
    loading: "eager",
    alt: "Open sky above a tropical villa",
  },
  hero: {
    url: "/assets/storysection/story-hero.webp",
    loading: "eager",
    alt: "Goan coastal landscape and villa atmosphere",
  },
} as const;

export function StorySection() {
  useLayoutEffect(() => {
    const section = document.querySelector<HTMLElement>('[data-section="story"]');

    if (!section) {
      return;
    }

    const divider = section.querySelector<HTMLElement>(
      "[data-story-orange-divider]",
    );
    const tabletMedia = window.matchMedia(
      "(min-width: 768px) and (max-width: 1199px)",
    );
    let cleanupReveals = () => {};
    let cleanupDivider = () => {};

    const setupAnimations = () => {
      cleanupReveals();
      cleanupDivider();

      const isTablet = tabletMedia.matches;
      cleanupReveals = setupSectionReveals(section, {
        duration: isTablet ? 0.68 : undefined,
        groupTrigger: isTablet ? section : undefined,
        stagger: isTablet ? 0.08 : undefined,
        start: isTablet ? "top 115%" : undefined,
      });

      if (!divider) {
        cleanupDivider = () => {};
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(divider, {
          scaleX: 1,
          transformOrigin: "center center",
        });
        cleanupDivider = () => {
          gsap.set(divider, {
            clearProps: "transform,transformOrigin",
          });
        };
        return;
      }

      const dividerTween = gsap.to(divider, {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: isTablet ? "top 115%" : "top 84%",
          once: true,
        },
      });

      cleanupDivider = () => {
        dividerTween.scrollTrigger?.kill();
        dividerTween.kill();
        gsap.set(divider, {
          clearProps: "transform,transformOrigin",
        });
      };
    };

    setupAnimations();
    tabletMedia.addEventListener("change", setupAnimations);

    return () => {
      tabletMedia.removeEventListener("change", setupAnimations);
      cleanupReveals();
      cleanupDivider();
    };
  }, []);

  return (
    <section
      aria-labelledby="story-section-title"
      className={`relative overflow-x-clip overflow-y-visible bg-[#464646] text-bone ${responsiveStyles.responsiveRoot}`}
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
          className="pointer-events-none absolute inset-0 select-none bg-cover bg-center opacity-90 mix-blend-overlay"
          data-story-texture-layer

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
          className="h-px w-[clamp(44px,3.5vw,56px)] origin-center scale-x-0 bg-laterite motion-reduce:scale-x-100"
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
        <CdnImage
          src={storyImages.upper.url}
          alt={storyImages.upper.alt}
          fill
          loading="eager"
          sizes="10vw"
          className="object-cover object-top"
        />
      </figure>

      <div
        className="relative z-10 mt-0 pt-0"
        data-story-reveal-group="4"
        data-story-hero-composition
      >
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-30 grid h-[clamp(8rem,11.8vw,10.625rem)] w-[clamp(8rem,10.4vw,9.375rem)] -translate-x-1/2 place-items-center bg-smoke"
          data-story-grey-block
        >
          <OrangeBlock
            data-story-orange-block
          />
        </div>
        <figure
          className="relative z-20 h-[clamp(28rem,36.111vw,32.5rem)] w-full overflow-hidden"
        data-story-hero-image
      >
          <ParallaxMedia
            amount={5}
            className={responsiveStyles.storyHeroMedia}
          >
            <Image
              src={storyImages.hero.url}
              alt={storyImages.hero.alt}
              fill
              loading="eager"
              sizes="100vw"
              className="object-cover object-center"
            />
          </ParallaxMedia>
        </figure>
      </div>
    </section>
  );
}
