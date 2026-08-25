"use client";

import responsiveStyles from "./project-site-showcase-section.responsive.module.css";
import type { ImageProps } from "next/image";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CdnImage } from "@/components/ui/cdn-image";
import { PDP_MEDIA_URLS } from "./pdp-texture";
import { ArchitecturalStairs } from "@/components/ArchitecturalStairs";
import { CTA } from "@/components/ui/cta";
import { Reveal } from "@/components/ui/reveal";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { OPEN_BROCHURE_FORM_EVENT } from "./brochure-prompt";

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_REVEAL_START = "top 88%";
const SHOWCASE_REVEAL_TRIGGER = "[data-project-site-showcase-section]";

type SiteShowcaseImage = {
  alt: string;
  src: ImageProps["src"];
};

type SiteShowcaseCta = {
  href: string;
  label: string;
};

export type ProjectSiteShowcaseSectionProps = {
  cta: SiteShowcaseCta;
  description: string;
  heading: string;
  image: SiteShowcaseImage;
};

export function ProjectSiteShowcaseSection({
  cta,
  description,
  heading,
  image,
}: ProjectSiteShowcaseSectionProps) {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const stairs = section.querySelector<HTMLElement>(
      "[data-project-site-showcase-steps]",
    );
    const dividers = gsap.utils.toArray<HTMLElement>(
      "[data-project-site-showcase-left-divider]",
      section,
    );
    const imageWrapper = section.querySelector<HTMLElement>(
      "[data-project-site-showcase-image-wrapper]",
    );
    const moodboardSection = document.querySelector<HTMLElement>(
      SHOWCASE_REVEAL_TRIGGER,
    );

    if (!stairs || dividers.length === 0 || !imageWrapper) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(stairs, { autoAlpha: 1, y: 0 });
      gsap.set(dividers, { scaleX: 1 });
      gsap.set(imageWrapper, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(stairs, { autoAlpha: 0, y: 20 });
      gsap.set(dividers, { scaleX: 0 });
      gsap.set(dividers[0], { transformOrigin: "right center" });
      gsap.set(dividers[1], { transformOrigin: "left center" });
      gsap.set(imageWrapper, {
        clipPath: "inset(100% 0% 0% 0%)",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: moodboardSection ?? section,
            start: moodboardSection ? SHOWCASE_REVEAL_START : "top 78%",
            once: true,
          },
        })
        .to(stairs, {
          autoAlpha: 1,
          duration: 0.78,
          ease: "power3.out",
          y: 0,
        });

      gsap.to(imageWrapper, {
        clipPath: "inset(0% 0% 0% 0%)",
        delay: 0.42,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: moodboardSection ?? section,
          start: moodboardSection ? SHOWCASE_REVEAL_START : "top 78%",
          once: true,
        },
      });

      gsap.to(dividers, {
        delay: 0.92,
        duration: 0.8,
        ease: "power2.out",
        scaleX: 1,
        scrollTrigger: {
          trigger: moodboardSection ?? section,
          start: moodboardSection ? SHOWCASE_REVEAL_START : "top 78%",
          once: true,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, [pathname]);

  return (
    <section
      aria-labelledby="project-site-showcase-title"
      className={`relative isolate overflow-hidden bg-[#343434] text-bone ${responsiveStyles.responsiveRoot}`}
      data-project-site-showcase-section
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#343434] bg-cover bg-center bg-blend-overlay"
        data-project-site-showcase-background-texture
        style={{ backgroundImage: `url('${PDP_MEDIA_URLS.concreteTexture}')` }}
      />

      <div
        className="relative z-10 mx-auto h-[clamp(48rem,62.5vw,56.25rem)] w-full max-w-[1440px] overflow-hidden"
        data-project-site-showcase-canvas
      >
        <Reveal
          className="absolute inset-x-0 bottom-0 top-[15rem] z-10 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-[31.556%] after:bg-gradient-to-b after:from-[#343434]/0 after:to-[#343434] md:top-[2.1875rem]"
          data-project-site-showcase-image-wrapper
          fade={false}
          revealId="project-site-showcase-image"
          start={SHOWCASE_REVEAL_START}
          triggerSelector={SHOWCASE_REVEAL_TRIGGER}
          y={0}
        >
          <ParallaxMedia amount={3} trigger="[data-project-site-showcase-section]">
            <CdnImage
              alt={image.alt}
              className="object-cover object-center"
              data-project-site-showcase-image
              fill
              sizes="(min-width: 1440px) 1440px, 100vw"
              src={image.src}
            />
          </ParallaxMedia>
        </Reveal>

        <div
          className="absolute inset-0 z-20"
          data-project-site-showcase-top-editorial-layout
        >
        <div
  aria-hidden="true"
  className="absolute inset-x-0 top-[2.8rem] z-0 h-[16rem] md:inset-0 md:top-0 md:h-auto md:after:absolute md:after:right-0 md:after:top-0 md:after:h-[54.667%] md:after:w-[1.389%] md:after:bg-[#343434]"
  data-project-site-showcase-steps
>
            <ArchitecturalStairs
              className="[&>[data-stair-index='1']]:left-0 [&>[data-stair-index='1']]:top-0 [&>[data-stair-index='1']]:h-[6.778%] [&>[data-stair-index='1']]:w-[27.710%] [&>[data-stair-index='2']]:left-[27.710%] [&>[data-stair-index='2']]:top-0 [&>[data-stair-index='2']]:h-[20.333%] [&>[data-stair-index='2']]:w-[6.458%] [&>[data-stair-index='3']]:left-[34.167%] [&>[data-stair-index='3']]:top-0 [&>[data-stair-index='3']]:h-[24%] [&>[data-stair-index='3']]:w-[45.486%] [&>[data-stair-index='4']]:left-[79.653%] [&>[data-stair-index='4']]:top-0 [&>[data-stair-index='4']]:h-[30.222%] [&>[data-stair-index='4']]:w-[18.958%]"
              stairClassName="bg-transparent"
              variant="ascending"
            />
          </div>

          <h2 className="sr-only" id="project-site-showcase-title">
            {heading}
          </h2>

          <Reveal
            className="absolute inset-x-0 top-[2rem] z-20 flex items-center md:top-[3.1875rem]"
            data-project-site-showcase-left-header
            delay={0.92}
            duration={0.78}
            fade={false}
            revealId="project-site-showcase-left-header"
            start={SHOWCASE_REVEAL_START}
            triggerSelector={SHOWCASE_REVEAL_TRIGGER}
          >
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-silver/25 md:w-[27.708%] md:flex-none"
              data-project-site-showcase-left-divider
            />
            <span
              aria-hidden="true"
              className="block size-[1.25rem] shrink-0 bg-cover bg-center"
              data-project-site-showcase-left-accent
              style={{ backgroundImage: `url('${PDP_MEDIA_URLS.orangeBlock}')` }}
            />
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-silver/25 md:w-[40.104%] md:flex-none"
              data-project-site-showcase-left-divider
            />
          </Reveal>

          <div
            className="absolute left-[1.5rem] right-[1.5rem] top-[7.15rem] z-20 md:left-auto md:right-0 md:top-0 md:w-[29.583%]"
            data-project-site-showcase-right-content
          >
            <Reveal
              className="pr-0 md:pr-[5rem]"
              data-project-site-showcase-copy-wrapper
              delay={1.08}
              revealId="project-site-showcase-copy"
              start={SHOWCASE_REVEAL_START}
              triggerSelector={SHOWCASE_REVEAL_TRIGGER}
            >
              <p className="max-w-[22rem] font-display text-[clamp(1.125rem,1.39vw,1.25rem)] font-normal leading-[1.45] tracking-[0.01em] text-bone">
                {description}
              </p>
            </Reveal>

            <Reveal
              className="relative mt-[1.25rem] w-full max-w-[14.0625rem]"
              data-project-site-showcase-cta-wrapper
              delay={1.24}
              revealId="project-site-showcase-cta"
              start={SHOWCASE_REVEAL_START}
              triggerSelector={SHOWCASE_REVEAL_TRIGGER}
            >
              <CTA
                arrowClassName="translate-y-[0.1rem] text-lg"
                className="inline-flex h-[3.125rem] w-full items-center justify-between px-3 font-display text-[0.95rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone"
                data-project-site-showcase-cta
                darkBackground="#575757"
                onClick={() => window.dispatchEvent(new Event(OPEN_BROCHURE_FORM_EVENT))}
                type="button"
              >
                {cta.label}
              </CTA>
              <span
                aria-hidden="true"
                className="absolute left-[22.25rem] top-[-1.1875rem] hidden h-px w-[4.25rem] bg-silver/25 md:block"
                data-project-site-showcase-right-divider
              />
            </Reveal>
          </div>
        </div>

        <Reveal
          aria-hidden="true"
          className="pointer-events-none absolute right-[clamp(1.5rem,5.208vw,4.6875rem)] top-[72.556%] z-30"
          data-project-site-showcase-floating-accent
          delay={1.4}
          revealId="project-site-showcase-floating-accent"
          start={SHOWCASE_REVEAL_START}
          triggerSelector={SHOWCASE_REVEAL_TRIGGER}
          y={0}
        >
          <span
            className="block size-[1.25rem] bg-cover bg-center"
            data-project-site-showcase-floating-square
            style={{ backgroundImage: `url('${PDP_MEDIA_URLS.orangeBlock}')` }}
          />
        </Reveal>
      </div>
    </section>
  );
}
