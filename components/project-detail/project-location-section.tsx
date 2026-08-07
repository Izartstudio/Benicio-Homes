"use client";

import responsiveStyles from "./project-location-section.responsive.module.css";
import type { ImageProps } from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CdnImage } from "@/components/ui/cdn-image";
import { PDP_MEDIA_URLS } from "./pdp-texture";
import { DifferenceText } from "@/components/ui/difference-text";
import { Reveal } from "@/components/ui/reveal";

gsap.registerPlugin(ScrollTrigger);

type ProjectLocationImage = {
  alt: string;
  src: ImageProps["src"];
};

export type ProjectLocationSectionProps = {
  decorativeImage: ProjectLocationImage;
  description: readonly string[];
  featureImage: ProjectLocationImage;
  location: string;
};

export function ProjectLocationSection({
  decorativeImage,
  description,
  featureImage,
  location,
}: ProjectLocationSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const featureImageReveal = section.querySelector<HTMLElement>(
      "[data-project-location-feature-image-reveal]",
    );
    const decorativeImage = section.querySelector<HTMLElement>(
      "[data-project-location-decorative-image-wrapper]",
    );

    if (!featureImageReveal || !decorativeImage) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(featureImageReveal, {
        clipPath: "inset(0% 100% 0% 0%)",
      });
      gsap.set(decorativeImage, { x: 40 });

      const imageTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      imageTimeline
        .to(
          featureImageReveal,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power2.inOut",
          },
          0.14,
        )
        .to(
          decorativeImage,
          {
            duration: 0.9,
            ease: "power2.out",
            x: 0,
          },
          0.62,
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      aria-labelledby="project-location-title"
      className={`relative isolate overflow-hidden bg-[#343434] text-bone ${responsiveStyles.responsiveRoot}`}
      data-project-location-section
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#343434] bg-cover bg-center bg-blend-overlay"
        data-project-location-background-texture
        style={{ backgroundImage: `url('${PDP_MEDIA_URLS.concreteTexture}')` }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[18rem] bg-gradient-to-b from-[#050505] via-[#232323]/80 to-transparent"
        data-project-location-top-gradient
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5rem] top-0 z-20 h-[25rem] w-[min(44rem,52vw)] overflow-hidden [mask-image:linear-gradient(135deg,transparent_0%,black_26%,black_100%)]"
        data-project-location-decorative-image-wrapper
      >
        <CdnImage
          alt={decorativeImage.alt}
          className="object-cover object-[82%_12%]"
          fill
          sizes="52vw"
          src={decorativeImage.src}
        />
      </div>

      <div
        className="relative mx-auto w-full max-w-[1440px] min-[1441px]:max-w-none pb-[clamp(7rem,9vw,8rem)] pt-[clamp(7.5rem,9vw,8.125rem)]"
        data-project-location-content
      >
        <Reveal
          className="relative z-30 flex items-center gap-[clamp(1.25rem,1.8vw,1.75rem)] px-[clamp(1.5rem,5.28vw,4.75rem)]"
          data-project-location-row
          duration={0.78}
          fade={false}
          revealId="project-location-row"
          start="top 78%"
          triggerClosest="[data-project-location-section]"
        >
          <DifferenceText
            as="h2"
            className="shrink-0 font-display text-[0.875rem] font-normal leading-none"
            id="project-location-title"
          >
            {location}
          </DifferenceText>
          <span
            aria-hidden="true"
            className="h-px w-[clamp(10rem,24vw,21.5rem)] bg-laterite/70"
            data-project-location-divider
          />
        </Reveal>

        <div
          className="relative z-30 mt-[2.5rem] h-[9.5rem] w-full overflow-hidden min-[1441px]:left-1/2 min-[1441px]:w-screen min-[1441px]:-translate-x-1/2"
          data-project-location-feature-image-reveal
        >
          <div
            className="absolute inset-0"
            data-project-location-feature-image
          >
            <CdnImage
              alt={featureImage.alt}
              className="object-cover object-center"
              fill
              sizes="(min-width: 1440px) 1440px, 100vw"
              src={featureImage.src}
            />
          </div>
        </div>

        <div
          className="relative z-30 mt-[clamp(2.5rem,3.1vw,2.875rem)] grid grid-cols-1 px-[clamp(1.5rem,5.28vw,4.75rem)] lg:grid-cols-2"
          data-project-location-text-row
        >
          <div aria-hidden="true" data-project-location-empty-column />

          <div
            className="lg:flex lg:justify-end"
            data-project-location-copy-column
          >
            <Reveal
              className="max-w-[29rem] space-y-[1.5rem] font-display text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.38] tracking-[0.01em] text-bone"
              data-project-location-copy-wrapper
              delay={0.76}
              duration={0.82}
              revealId="project-location-copy"
              start="top 78%"
              triggerClosest="[data-project-location-section]"
            >
              {description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="absolute bottom-[4.625rem] left-[clamp(1.5rem,5.28vw,4.75rem)] block size-[1.25rem] bg-cover bg-center"
          data-project-location-bottom-accent
          style={{ backgroundImage: `url('${PDP_MEDIA_URLS.orangeBlock}')` }}
        />
      </div>
    </section>
  );
}
