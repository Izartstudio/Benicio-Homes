"use client";

import Image, { type ImageProps } from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/reveal";

gsap.registerPlugin(ScrollTrigger);

export type ProjectHeroImage = {
  alt: string;
  src: ImageProps["src"];
};

export type ProjectHeroProps = {
  description: string;
  heroImage: ProjectHeroImage;
  title: string;
};

export function ProjectHero({
  description,
  heroImage,
  title,
}: ProjectHeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const image = hero?.querySelector<HTMLImageElement>(
      "[data-project-hero-image] img",
    );

    if (!hero || !image) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(image, {
        scale: 1.06,
        transformOrigin: "50% 50%",
        yPercent: -1.5,
      });

      const imageScrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      imageScrollTimeline.to(image, {
        ease: "none",
        yPercent: 1.5,
      });
    }, hero);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      aria-labelledby="project-hero-title"
      className="relative isolate h-[100svh] overflow-hidden bg-[#232323] text-bone"
      data-project-hero
      ref={heroRef}
    >
      <div
        className="absolute inset-0 z-0"
        data-project-hero-image-wrapper
      >
        <div className="absolute inset-0" data-project-hero-image>
          <Image
            alt={heroImage.alt}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={heroImage.src}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/25"
          data-project-hero-image-overlay
        />
      </div>

      <div
        className="relative z-20 mx-auto flex h-full w-full max-w-[1440px] flex-col px-[clamp(1.5rem,5.28vw,4.75rem)] pb-[clamp(2.5rem,5.7vh,4.25rem)] pt-[clamp(8rem,17vh,11rem)]"
        data-project-hero-content
      >
        <Reveal
          className="max-w-[30rem]"
          data-project-hero-description-wrapper
          revealId="project-hero-description"
        >
          <p
            className="font-display text-[clamp(1rem,1.35vw,1.25rem)] leading-[1.4] tracking-[0.01em] text-bone"
            data-project-hero-description
          >
            {description}
          </p>
        </Reveal>

        <Reveal
          className="mt-auto w-full"
          data-project-hero-title-wrapper
          delay={0.12}
          revealId="project-hero-title"
        >
          <h1
            className="whitespace-pre-line font-display text-[clamp(4rem,10.8vw,9.75rem)] font-normal uppercase leading-[0.78] tracking-[0.01em] text-bone"
            id="project-hero-title"
            data-project-hero-heading
          >
            {title}
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
