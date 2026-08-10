"use client";

import responsiveStyles from "./project-floor-plan-section.responsive.module.css";
import type { ImageProps } from "next/image";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CdnImage } from "@/components/ui/cdn-image";
import { ArchitecturalStairs } from "@/components/ArchitecturalStairs";
import { Reveal } from "@/components/ui/reveal";
import { PDP_MEDIA_URLS, PDP_TEXTURE_URL } from "./pdp-texture";
import { cn } from "@/utils/cn";

gsap.registerPlugin(ScrollTrigger);

type FloorPlanDrawing = {
  alt: string;
  src: ImageProps["src"];
};

type FloorPlanSpecification = {
  label: string;
  value: string;
};

export type ProjectFloorPlanSectionProps = {
  description: string;
  footerLabel: string;
  leftDrawing: FloorPlanDrawing;
  mirrored?: boolean;
  rightDrawing: FloorPlanDrawing;
  specifications: readonly FloorPlanSpecification[];
  villaLabel: string;
};

function FloorPlanCopy({
  description,
}: Pick<ProjectFloorPlanSectionProps, "description">) {
  return (
    <Reveal
      data-project-floor-plan-copy-wrapper
      delay={0.72}
      fade={false}
      revealId="project-floor-plan-copy"
      start="top 78%"
      triggerClosest="[data-project-floor-plan-section]"
      y={18}
    >
      <p className="max-w-[15.25rem] text-justify font-display text-[0.875rem] font-normal leading-[1.3] tracking-[0.01em] text-[#1a1a1a]">
        {description}
      </p>
    </Reveal>
  );
}

function FloorPlanSpecifications({
  specifications,
}: Pick<ProjectFloorPlanSectionProps, "specifications">) {
  return (
    <Reveal
      delay={0.82}
      fade={false}
      revealId="project-floor-plan-specifications"
      start="top 78%"
      triggerClosest="[data-project-floor-plan-section]"
      y={18}
    >
      <dl data-project-floor-plan-specification-list>
        {specifications.map((specification, specificationIndex) => (
          <div
            className="relative h-[2.5625rem] font-display text-[0.875rem] leading-none"
            data-project-floor-plan-specification-row
            key={specification.label}
          >
            <div className="flex items-start justify-between gap-[1.5rem] pt-[0.3125rem]">
              <dt className="text-[#1a1a1a]/55">{specification.label}</dt>
              <dd className="shrink-0 text-right font-serif text-[#1a1a1a]">
                {specification.value}
              </dd>
            </div>
            {specificationIndex < specifications.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute left-0 top-[1.8594rem] block h-px w-full bg-[#1a1a1a]/25"
                data-project-floor-plan-specification-divider
              />
            ) : null}
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

export function ProjectFloorPlanSection({
  description,
  footerLabel,
  leftDrawing,
  mirrored = false,
  rightDrawing,
  specifications,
  villaLabel,
}: ProjectFloorPlanSectionProps) {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const stairs = section.querySelector<HTMLElement>(
      "[data-project-floor-plan-top-editorial-layout]",
    );
    const upperAxisLine = section.querySelector<HTMLElement>(
      "[data-project-floor-plan-axis-line-upper]",
    );
    const lowerAxisLine = section.querySelector<HTMLElement>(
      "[data-project-floor-plan-axis-line-lower]",
    );
    const leftDrawing = section.querySelector<HTMLElement>(
      "[data-project-floor-plan-left-drawing-image-wrapper]",
    );
    const rightDrawing = section.querySelector<HTMLElement>(
      "[data-project-floor-plan-right-drawing-image-wrapper]",
    );

    if (
      !stairs ||
      !upperAxisLine ||
      !lowerAxisLine ||
      !leftDrawing ||
      !rightDrawing
    ) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(stairs, { autoAlpha: 1, y: 0 });
      gsap.set([upperAxisLine, lowerAxisLine], { scaleY: 1 });
      gsap.set([leftDrawing, rightDrawing], {
        clipPath: "inset(0% 0% 0% 0%)",
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(stairs, { autoAlpha: 0, y: 20 });
      gsap.set([upperAxisLine, lowerAxisLine], {
        scaleY: 0,
        transformOrigin: "top center",
      });
      gsap.set([leftDrawing, rightDrawing], {
        clipPath: "inset(100% 0% 0% 0%)",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        })
        .addLabel("stepsReveal", 0)
        .to(
          stairs,
          {
            autoAlpha: 1,
            duration: 0.78,
            ease: "power3.out",
            y: 0,
          },
          "stepsReveal",
        )
        .to(
          upperAxisLine,
          {
            duration: 1.35,
            ease: "power2.inOut",
            scaleY: 1,
          },
          "stepsReveal",
        )
        .to(
          lowerAxisLine,
          {
            duration: 1.65,
            ease: "power2.inOut",
            scaleY: 1,
          },
          1.55,
        )
        .to(
          leftDrawing,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power2.inOut",
          },
          0.72,
        )
        .to(
          rightDrawing,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power2.inOut",
          },
          0.86,
        );
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [pathname]);

  return (
    <section
      aria-label={`${villaLabel} floor plans`}
      className={`relative isolate -mt-px overflow-hidden bg-[#fafafa] text-[#1a1a1a] ${responsiveStyles.responsiveRoot}`}
      data-layout={mirrored ? "mirrored" : "default"}
      data-project-floor-plan-section
      ref={sectionRef}
      style={
        {
          "--pdp-concrete-texture": `url('${PDP_MEDIA_URLS.concreteTexture}')`,
        } as CSSProperties
      }
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#fafafa] bg-cover bg-center opacity-50 mix-blend-multiply"
        data-project-floor-plan-background-texture
        style={{ backgroundImage: `url('${PDP_TEXTURE_URL}')` }}
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 z-10 hidden h-[22.8125rem] w-full max-w-[1440px] -translate-x-1/2 bg-[#343434] bg-[length:1440px_365px] bg-left-top bg-no-repeat bg-blend-overlay [background-image:var(--pdp-concrete-texture)] [clip-path:polygon(0_0,72.2917%_0,72.2917%_15.3425%,65.8333%_15.3425%,65.8333%_24.3836%,20.3472%_24.3836%,20.3472%_39.726%,1.3889%_39.726%,1.3889%_100%,0_100%)]",
          !mirrored && "lg:block",
        )}
        data-project-floor-plan-top-editorial-layout
      >
        <ArchitecturalStairs
          className="[&>[data-stair-index='1']]:left-0 [&>[data-stair-index='1']]:top-0 [&>[data-stair-index='1']]:h-full [&>[data-stair-index='1']]:w-[1.3889%] [&>[data-stair-index='2']]:left-0 [&>[data-stair-index='2']]:top-0 [&>[data-stair-index='2']]:h-[39.726%] [&>[data-stair-index='2']]:w-[20.3472%] [&>[data-stair-index='3']]:left-0 [&>[data-stair-index='3']]:top-0 [&>[data-stair-index='3']]:h-[24.3836%] [&>[data-stair-index='3']]:w-[65.8333%] [&>[data-stair-index='4']]:left-0 [&>[data-stair-index='4']]:top-0 [&>[data-stair-index='4']]:h-[15.3425%] [&>[data-stair-index='4']]:w-[72.2917%]"
          stairClassName="bg-transparent"
          variant="ascending"
        />
      </div>

      <div
        className="relative z-20 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-[4.5rem] px-[clamp(1.5rem,5.208vw,4.6875rem)] pb-[5rem] pt-[12rem] lg:block lg:h-[56.25rem] lg:px-0 lg:py-0"
        data-project-floor-plan-container
      >
        <div
          className={cn(
            "lg:absolute lg:left-[3.4722%]",
            mirrored
              ? "lg:top-[5.5556%] lg:w-[17.0833%]"
              : "lg:top-[18.6667%] lg:w-[16.9444%]",
          )}
          data-project-floor-plan-left-content
        >
          {mirrored ? (
            <FloorPlanSpecifications specifications={specifications} />
          ) : (
            <FloorPlanCopy description={description} />
          )}
        </div>

        <div
          className="relative grid grid-cols-1 gap-[2rem] sm:grid-cols-2 sm:gap-0 lg:absolute lg:left-[25.2083%] lg:top-[33%] lg:h-[56%] lg:w-[49.5833%]"
          data-project-floor-plan-area
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[4.4375rem] -top-[10.0625rem] left-1/2 z-20 hidden w-[5rem] -translate-x-1/3 sm:block"
            data-project-floor-plan-vertical-axis
          >
            <span
              className="absolute inset-0"
              data-project-floor-plan-axis-line
            >
              <span
                className="absolute left-1/2 top-0 h-[6.841rem] w-px -translate-x-1/2 bg-[#151414]"
                data-project-floor-plan-axis-line-upper
              />
              <span
                className="absolute left-1/2 top-[9.715rem] h-[33.5625rem] w-px -translate-x-1/2 bg-[#151414]"
                data-project-floor-plan-axis-line-lower
              />
            </span>

            <div
              className="absolute left-1/4 top-[6.6638rem] flex h-[3.0496rem] w-full -translate-x-1/4 flex-col items-center justify-between"
              data-project-floor-plan-villa-marker
            >
              <Reveal
                className="shrink-0"
                delay={1.34}
                fade={false}
                revealId="project-floor-plan-villa-marker-accent"
                start="top 78%"
                triggerClosest="[data-project-floor-plan-section]"
                y={8}
              >
                <span
                  className="block size-[0.4634rem] bg-[#d45231]"
                  data-project-floor-plan-villa-marker-accent
                />
              </Reveal>
              <Reveal
                delay={1.42}
                fade={false}
                revealId="project-floor-plan-villa-label"
                start="top 78%"
                triggerClosest="[data-project-floor-plan-section]"
                y={10}
              >
                <span className="block font-serif text-[0.75rem] uppercase leading-none tracking-[0.01em] text-center">
                  {villaLabel}
                </span>
              </Reveal>
              <Reveal
                aria-hidden="true"
                className="shrink-0"
                delay={1.5}
                fade={false}
                revealId="project-floor-plan-villa-marker-accent-bottom"
                start="top 78%"
                triggerClosest="[data-project-floor-plan-section]"
                y={8}
              >
                <span
                  className="block size-[0.4634rem] bg-[#d45231]"
                  data-project-floor-plan-villa-marker-accent-bottom
                />
              </Reveal>
            </div>

            <div
              className="absolute bottom-0 left-1/2 h-[2.7216rem] w-full -translate-x-1/2"
              data-project-floor-plan-bottom-marker
            >
              <Reveal
                className="absolute left-1/2 top-[1rem] -translate-x-1/2"
                delay={3.44}
                fade={false}
                revealId="project-floor-plan-footer-label"
                start="top 78%"
                triggerClosest="[data-project-floor-plan-section]"
                y={10}
              >
                <span className="block font-serif text-[0.75rem] uppercase leading-none tracking-[0.01em]">
                  {footerLabel}
                </span>
              </Reveal>
              <Reveal
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                delay={3.54}
                fade={false}
                revealId="project-floor-plan-bottom-marker-accent"
                start="top 78%"
                triggerClosest="[data-project-floor-plan-section]"
                y={8}
              >
                <span
                  className="block size-[0.4634rem] bg-[#d45231]"
                  data-project-floor-plan-bottom-marker-accent
                />
              </Reveal>
            </div>
          </div>

          <figure data-project-floor-plan-left-drawing>
            <Reveal
              className="relative aspect-[365/504] w-full lg:h-full lg:aspect-auto"
              data-project-floor-plan-left-drawing-image-wrapper
              delay={0.72}
              fade={false}
              revealId="project-floor-plan-left-drawing"
              start="top 78%"
              triggerClosest="[data-project-floor-plan-section]"
              y={0}
            >
              <CdnImage
                alt={leftDrawing.alt}
                className="object-contain mix-blend-multiply"
                data-project-floor-plan-left-drawing-image
                fill
                sizes="(min-width: 1024px) 357px, (min-width: 640px) 50vw, 100vw"
                src={leftDrawing.src}
              />
            </Reveal>
          </figure>

          <div data-project-floor-plan-right-drawing>
            <Reveal
              className="relative aspect-[365/504] w-full lg:h-full lg:aspect-auto"
              data-project-floor-plan-right-drawing-image-wrapper
              delay={0.86}
              fade={false}
              revealId="project-floor-plan-right-drawing"
              start="top 78%"
              triggerClosest="[data-project-floor-plan-section]"
              y={0}
            >
              <CdnImage
                alt={rightDrawing.alt}
                className="object-contain mix-blend-multiply"
                data-project-floor-plan-right-drawing-image
                fill
                sizes="(min-width: 1024px) 357px, (min-width: 640px) 50vw, 100vw"
                src={rightDrawing.src}
              />
            </Reveal>
          </div>
        </div>

        <div
          className={cn(
            "lg:absolute lg:top-[5.5556%]",
            mirrored
              ? "lg:left-[79.1667%] lg:w-[17.3611%]"
              : "lg:left-[77.7083%] lg:w-[17.0833%]",
          )}
          data-project-floor-plan-right-content
        >
          {mirrored ? (
            <FloorPlanCopy description={description} />
          ) : (
            <FloorPlanSpecifications specifications={specifications} />
          )}
        </div>
      </div>
    </section>
  );
}
