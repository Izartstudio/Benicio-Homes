"use client";

import Image, { type ImageProps } from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/reveal";

gsap.registerPlugin(ScrollTrigger);

type SiteCompositionImage = {
  alt: string;
  src: ImageProps["src"];
};

type SiteCompositionSpecification = {
  label: string;
  value: string;
};

type SiteCompositionSpecificationGroup = {
  items: readonly SiteCompositionSpecification[];
  title: string;
};

export type ProjectSiteCompositionSectionProps = {
  compass: string;
  description: string;
  heading: string;
  masterplanImage: SiteCompositionImage;
  specifications: readonly SiteCompositionSpecificationGroup[];
};

export function ProjectSiteCompositionSection({
  compass,
  description,
  heading,
  masterplanImage,
  specifications,
}: ProjectSiteCompositionSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const lineTop = section.querySelector<SVGLineElement>(
      "[data-project-site-composition-guide-line-top]",
    );
    const lineRight = section.querySelector<SVGLineElement>(
      "[data-project-site-composition-guide-line-right]",
    );
    const lineBottom = section.querySelector<SVGLineElement>(
      "[data-project-site-composition-guide-line-bottom]",
    );
    const lineLeft = section.querySelector<SVGLineElement>(
      "[data-project-site-composition-guide-line-left]",
    );
    const masterplan = section.querySelector<HTMLElement>(
      "[data-project-site-composition-masterplan-wrapper]",
    );

    if (
      !lineTop ||
      !lineRight ||
      !lineBottom ||
      !lineLeft ||
      !masterplan
    ) {
      return;
    }

    const guideLines = [lineTop, lineRight, lineBottom, lineLeft];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(guideLines, { strokeDashoffset: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const lineTimeline = gsap.timeline({
        delay: 0.55,
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      gsap.set(guideLines, { strokeDashoffset: 1 });
      gsap.set(masterplan, {
        clipPath: "inset(100% 0% 0% 0%)",
      });

      lineTimeline
        .to(lineTop, {
          duration: 1.45,
          ease: "power2.out",
          strokeDashoffset: 0,
        })
        .to(
          lineRight,
          {
            duration: 1.45,
            ease: "power2.out",
            strokeDashoffset: 0,
          },
          "-=1.05",
        )
        .to(
          lineBottom,
          {
            duration: 1.45,
            ease: "power2.out",
            strokeDashoffset: 0,
          },
          "-=1.05",
        )
        .to(
          lineLeft,
          {
            duration: 1.45,
            ease: "power2.out",
            strokeDashoffset: 0,
          },
          "-=1.05",
        );

      gsap.to(masterplan, {
        clipPath: "inset(0% 0% 0% 0%)",
        delay: 0.82,
        duration: 0.94,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      aria-labelledby="project-site-composition-title"
      className="relative isolate overflow-hidden bg-[#343434] text-bone"
      data-project-site-composition-section
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#343434] bg-[url('/assets/textures/concrete-background-textures-09-1.svg')] bg-cover bg-center bg-blend-overlay"
        data-project-site-composition-background-texture
      />

      <Reveal
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(1.5rem,5.28vw,4.75rem)] top-[clamp(3rem,5.1vw,4.625rem)] z-30"
        data-project-site-composition-decorative-accent
        delay={1.32}
        revealId="project-site-composition-accent"
        start="top 78%"
        triggerClosest="[data-project-site-composition-section]"
        y={10}
      >
        <span
          className="block size-[1.25rem] bg-[url('/assets/blocks/orange-block.svg')] bg-cover bg-center"
          data-project-site-composition-decorative-square
        />
      </Reveal>

      <div
        className="relative z-20 mx-auto grid min-h-[56.25rem] w-full max-w-[1440px] grid-cols-1 gap-y-14 px-[clamp(1.5rem,5.28vw,4.75rem)] py-[clamp(4.5rem,5.6vw,5rem)] xl:grid-cols-[minmax(15rem,17.5rem)_minmax(28rem,1fr)_minmax(17rem,19.5rem)] xl:gap-x-[clamp(1.5rem,2.2vw,2rem)] xl:gap-y-0"
        data-project-site-composition-container
      >
        <div
          className="relative z-20 max-w-[20rem] lg:pt-0"
          data-project-site-composition-left-content
        >
          <Reveal
            data-project-site-composition-heading-wrapper
            duration={0.72}
            fade={false}
            revealId="project-site-composition-heading"
            start="top 78%"
            triggerClosest="[data-project-site-composition-section]"
          >
            <h2
              className="font-display text-[clamp(1.75rem,2.15vw,2rem)] font-normal uppercase leading-none tracking-[0.01em]"
              id="project-site-composition-title"
            >
              {heading}
            </h2>
          </Reveal>

          <Reveal
            className="mt-[2.125rem]"
            data-project-site-composition-description-wrapper
            delay={0.18}
            duration={0.78}
            fade={false}
            revealId="project-site-composition-description"
            start="top 78%"
            triggerClosest="[data-project-site-composition-section]"
          >
            <p className="max-w-[20rem] font-display text-[clamp(0.95rem,1.08vw,1rem)] font-light leading-[1.42] tracking-[0.01em] text-bone/80">
              {description}
            </p>
          </Reveal>
        </div>

        <div
          className="relative flex min-h-[39rem] items-center justify-center lg:min-h-[48rem] xl:-my-[2.25rem] xl:min-h-[51rem]"
          data-project-site-composition-masterplan-area
        >
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-[779/735] w-full max-w-[43rem] -translate-x-1/2 -translate-y-1/2 overflow-visible"
            data-project-site-composition-guide-lines
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 779 735"
          >
            <defs>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="site-composition-line-top-gradient"
                x1="-400"
                x2="730"
                y1="730"
                y2="-195"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="78%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="93%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="site-composition-line-right-gradient"
                x1="320"
                x2="880"
                y1="-144"
                y2="352"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="78%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="93%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="site-composition-line-bottom-gradient"
                x1="220"
                x2="1030"
                y1="830"
                y2="-157"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="78%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="93%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                id="site-composition-line-left-gradient"
                x1="40"
                x2="290"
                y1="118"
                y2="775"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="78%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="93%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line
              data-project-site-composition-guide-line-top
              opacity="0.45"
              pathLength="1"
              stroke="url(#site-composition-line-top-gradient)"
              strokeDasharray="1"
              strokeDashoffset="1"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="-400"
              x2="730"
              y1="730"
              y2="-195"
            />
            <line
              data-project-site-composition-guide-line-right
              opacity="0.45"
              pathLength="1"
              stroke="url(#site-composition-line-right-gradient)"
              strokeDasharray="1"
              strokeDashoffset="1"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="320"
              x2="880"
              y1="-144"
              y2="352"
            />
            <line
              data-project-site-composition-guide-line-bottom
              opacity="0.45"
              pathLength="1"
              stroke="url(#site-composition-line-bottom-gradient)"
              strokeDasharray="1"
              strokeDashoffset="1"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="1030"
              x2="220"
              y1="-157"
              y2="830"
            />
            <line
              data-project-site-composition-guide-line-left
              opacity="0.45"
              pathLength="1"
              stroke="url(#site-composition-line-left-gradient)"
              strokeDasharray="1"
              strokeDashoffset="1"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="290"
              x2="40"
              y1="775"
              y2="118"
            />
          </svg>

          <Reveal
            className="relative z-10 aspect-[779/735] w-full max-w-[43rem] overflow-hidden"
            data-project-site-composition-masterplan-wrapper
            fade={false}
            revealId="project-site-composition-masterplan"
            start="top 78%"
            triggerClosest="[data-project-site-composition-section]"
            y={0}
          >
            <Image
              alt={masterplanImage.alt}
              className="object-contain"
              data-project-site-composition-masterplan-image
              fill
              sizes="(min-width: 1280px) 48vw, 90vw"
              src={masterplanImage.src}
            />
          </Reveal>

          <Reveal
            aria-label={`${compass} compass direction`}
            className="absolute bottom-0 left-0 z-20 flex items-center gap-2.5 font-display text-[1.35rem] leading-none text-bone lg:bottom-[1.375rem] xl:-left-[19.5rem]"
            data-project-site-composition-compass
            delay={1.88}
            revealId="project-site-composition-compass"
            start="top 78%"
            triggerClosest="[data-project-site-composition-section]"
            y={0}
          >
            <span>{compass}</span>
            <span
              aria-hidden="true"
              className="relative block size-4 rounded-full bg-bone"
              data-project-site-composition-compass-indicator
            >
              <span className="absolute left-[0.29rem] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[0.22rem] border-l-[0.42rem] border-y-transparent border-l-[#7a7a7a]" />
            </span>
          </Reveal>
        </div>

        <aside
          aria-label={`${heading} specifications`}
          className="relative z-20 space-y-[3.125rem] self-center xl:pt-[8.5rem]"
          data-project-site-composition-right-content
        >
          {specifications.map((group, groupIndex) => (
            <section
              data-project-site-composition-specification-group
              key={group.title}
            >
              <Reveal
                delay={1.48 + groupIndex * 0.2}
                revealId={`project-site-composition-specification-${groupIndex + 1}`}
                start="top 78%"
                triggerClosest="[data-project-site-composition-section]"
              >
                <div
                  className="flex items-center gap-5"
                  data-project-site-composition-group-header
                >
                  <h3 className="shrink-0 font-display text-[0.875rem] font-normal uppercase leading-none text-laterite">
                    {group.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-laterite/80"
                    data-project-site-composition-group-divider
                  />
                </div>

                <dl
                  className="mt-[0.875rem]"
                  data-project-site-composition-specification-list
                >
                  {group.items.map((item) => (
                    <div
                      className="flex items-center justify-between gap-6 border-b border-bone/20 py-[0.625rem] font-display text-[0.875rem] leading-none text-bone"
                      data-project-site-composition-specification-row
                      key={item.label}
                    >
                      <dt>{item.label}</dt>
                      <dd className="shrink-0 text-right text-bone/80">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </section>
          ))}
        </aside>
      </div>
    </section>
  );
}
