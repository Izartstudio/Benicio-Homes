"use client";

import responsiveStyles from "./project-site-composition-section.responsive.module.css";
import type { ImageProps } from "next/image";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CdnImage } from "@/components/ui/cdn-image";
import { DifferenceText } from "@/components/ui/difference-text";
import { getCdnAsset } from "@/lib/getCdnAsset";
import { PDP_MEDIA_URLS } from "./pdp-texture";
import { Reveal } from "@/components/ui/reveal";

gsap.registerPlugin(ScrollTrigger);

type GuideLineVariant = "default" | "el-salva" | "zen";

type GuideLine = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

const GUIDE_LINE_SETS: Record<
  GuideLineVariant,
  { lines: readonly GuideLine[]; viewBox: string }
> = {
  default: {
    viewBox: "0 0 779 735",
    lines: [
      { x1: -400, y1: 730, x2: 730, y2: -195 },
      { x1: 320, y1: -144, x2: 880, y2: 352 },
      { x1: 1030, y1: -157, x2: 220, y2: 830 },
      { x1: 290, y1: 775, x2: 40, y2: 118 },
    ],
  },
  zen: {
    viewBox: "0 0 558 366",
    lines: [
      { x1: 32, y1: -70, x2: 32, y2: 436 },
      { x1: 520, y1: -70, x2: 520, y2: 436 },
      { x1: -70, y1: 20, x2: 628, y2: 20 },
      { x1: -70, y1: 258, x2: 628, y2: 258 },
      { x1: -70, y1: 365, x2: 628, y2: 365 },
    ],
  },
  "el-salva": {
    viewBox: "0 0 1119 727",
    lines: [
      { x1: -60.586, y1: 278.829, x2: 152.414, y2: 793.829 },
      { x1: 979.4, y1: -56.209, x2: 1206.92, y2: 376.055 },
      { x1: -100.182, y1: 429.316, x2: 1054.4, y2: -82.408 },
      { x1: -20.184, y1: 810.286, x2: 1267.16, y2: 228.592 },
    ],
  },
};

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
  guideLineVariant?: GuideLineVariant;
  heading: string;
  masterplanImage: SiteCompositionImage;
  masterplanVariant?: "default" | "vanam-large";
  specifications: readonly SiteCompositionSpecificationGroup[];
  textureSrc: string;
};

export function ProjectSiteCompositionSection({
  compass,
  description,
  guideLineVariant = "default",
  heading,
  masterplanImage,
  masterplanVariant = "default",
  specifications,
  textureSrc,
}: ProjectSiteCompositionSectionProps) {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement | null>(null);
  const guideLineSet = GUIDE_LINE_SETS[guideLineVariant];
  const zenUnderlayLine =
    guideLineVariant === "zen" ? guideLineSet.lines[0] : undefined;
  const sectionStyle = {
    "--site-composition-texture": `url("${getCdnAsset(textureSrc) ?? textureSrc}")`,
  } as CSSProperties;

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const guideLines = gsap.utils.toArray<SVGLineElement>(
      "[data-project-site-composition-guide-line]",
      section,
    );
    const headingElement = section.querySelector<HTMLElement>(
      "[data-project-site-composition-heading-wrapper]",
    );
    const descriptionElement = section.querySelector<HTMLElement>(
      "[data-project-site-composition-description-wrapper]",
    );
    const accentElement = section.querySelector<HTMLElement>(
      "[data-project-site-composition-decorative-accent]",
    );
    const compassElement = section.querySelector<HTMLElement>(
      "[data-project-site-composition-compass]",
    );
    const masterplanElement = section.querySelector<HTMLElement>(
      "[data-project-site-composition-masterplan-wrapper]",
    );
    const specificationElements = gsap.utils.toArray<HTMLElement>(
      '[data-reveal-id^="project-site-composition-specification-"]',
      section,
    );

    if (
      guideLines.length === 0 ||
      !headingElement ||
      !descriptionElement ||
      !accentElement ||
      !compassElement ||
      !masterplanElement
    ) {
      return;
    }

    const revealElements = [
      headingElement,
      descriptionElement,
      accentElement,
      compassElement,
      ...specificationElements,
    ];
    const guideLineEndpoints = guideLines.map((line) => ({
      x1: Number(line.getAttribute("x1")),
      x2: Number(line.getAttribute("x2")),
      y1: Number(line.getAttribute("y1")),
      y2: Number(line.getAttribute("y2")),
    }));

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (matchContext) => {
          const conditions = matchContext.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduceMotion: boolean;
          };
          if (conditions.reduceMotion) {
            guideLines.forEach((line, index) => {
              gsap.set(line, { attr: guideLineEndpoints[index] });
            });
            gsap.set([masterplanElement, ...revealElements], {
              clearProps: "clipPath,opacity,transform,visibility",
            });
            return;
          }

          guideLines.forEach((line, index) => {
            const endpoint = guideLineEndpoints[index];
            gsap.set(line, {
              attr: {
                x1: endpoint.x1,
                x2: endpoint.x1,
                y1: endpoint.y1,
                y2: endpoint.y1,
              },
            });
          });
          gsap.set(masterplanElement, {
            clipPath: "inset(100% 0% 0% 0%)",
            y: 0,
          });
          gsap.set([headingElement, descriptionElement], { y: 22 });
          gsap.set(accentElement, { autoAlpha: 0, y: 10 });
          gsap.set(compassElement, { autoAlpha: 0 });
          gsap.set(specificationElements, { autoAlpha: 0, y: 22 });

          const timeline = gsap.timeline({
            defaults: {
              overwrite: "auto",
            },
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              end: "top top",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

          timeline
            .to(
              headingElement,
              {
                duration: 0.7,
                ease: "power2.out",
                y: 0,
              },
              0,
            )
            .to(
              descriptionElement,
              {
                duration: 0.8,
                ease: "power2.out",
                y: 0,
              },
              0.12,
            );
          guideLines.forEach((line, index) => {
            const endpoint = guideLineEndpoints[index];
            timeline.to(
              line,
              {
                attr: {
                  x2: endpoint.x2,
                  y2: endpoint.y2,
                },
                duration: 1.15,
                ease: "none",
              },
              0.4 + index * 0.2,
            );
          });

          timeline.to(
              masterplanElement,
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.6,
                ease: "power2.inOut",
              },
              0.45,
            )
            .to(
              accentElement,
              {
                autoAlpha: 1,
                duration: 0.7,
                ease: "power2.out",
                y: 0,
              },
              1.55,
            )
            .to(
              specificationElements,
              {
                autoAlpha: 1,
                duration: 0.85,
                ease: "power2.out",
                stagger: 0.08,
                y: 0,
              },
              1.7,
            )
            .to(
              compassElement,
              {
                autoAlpha: 1,
                duration: 0.7,
                ease: "power2.out",
              },
              1.85,
            );

          return () => {
            timeline.kill();
            gsap.set([masterplanElement, ...revealElements], {
              clearProps: "clipPath,opacity,transform,visibility",
            });
          };
        },
      );
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, [pathname]);

  return (
    <section
      aria-labelledby="project-site-composition-title"
      className={`relative isolate overflow-hidden bg-[#343434] text-bone ${responsiveStyles.responsiveRoot}`}
      data-guide-line-variant={guideLineVariant}
      data-masterplan-variant={masterplanVariant}
      data-project-site-composition-section
      ref={sectionRef}
      style={sectionStyle}
    >
      <div
        aria-hidden="true"
        className={responsiveStyles.siteCompositionTexture}
        data-project-site-composition-background-texture
      />

      <Reveal
        aria-hidden="true"
        className="pointer-events-none absolute right-[clamp(1.5rem,5.28vw,4.75rem)] top-[clamp(3rem,5.1vw,4.625rem)] z-30"
        data-project-site-composition-decorative-accent
        revealId="project-site-composition-accent"
        revealMode="manual"
      >
        <span
          className="block size-[1.25rem] bg-cover bg-center"
          data-project-site-composition-decorative-square
          style={{ backgroundImage: `url('${PDP_MEDIA_URLS.orangeBlock}')` }}
        />
      </Reveal>

      <div
        className="relative z-10 mx-auto grid min-h-[56.25rem] w-full max-w-[1440px] grid-cols-1 gap-y-14 px-[clamp(1.5rem,5.28vw,4.75rem)] py-[clamp(4.5rem,5.6vw,5rem)] xl:grid-cols-[minmax(15rem,17.5rem)_minmax(28rem,1fr)_minmax(17rem,19.5rem)] xl:gap-x-[clamp(1.5rem,2.2vw,2rem)] xl:gap-y-0"
        data-project-site-composition-container
      >
        <div
          className="relative z-20 max-w-[20rem] lg:pt-0"
          data-project-site-composition-left-content
        >
          <Reveal
            data-project-site-composition-heading-wrapper
            fade={false}
            revealId="project-site-composition-heading"
            revealMode="manual"
          >
            <DifferenceText
              as="h2"
              className="font-display text-[clamp(1.75rem,2.15vw,2rem)] font-normal uppercase leading-none tracking-[0.01em]"
              id="project-site-composition-title"
            >
              {heading}
            </DifferenceText>
          </Reveal>

          <Reveal
            className="mt-[2.125rem]"
            data-project-site-composition-description-wrapper
            fade={false}
            revealId="project-site-composition-description"
            revealMode="manual"
          >
            <p className="max-w-[20rem] font-display text-[clamp(0.95rem,1.08vw,1rem)] font-light leading-[1.42] tracking-[0.01em] text-bone/80">
              {description}
            </p>
          </Reveal>
        </div>

        <div
          className="relative z-20 flex min-h-[39rem] items-center justify-center lg:min-h-[48rem] xl:-my-[2.25rem] xl:min-h-[51rem]"
          data-project-site-composition-masterplan-area
        >
          {zenUnderlayLine ? (
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full max-w-[43rem] -translate-x-1/2 -translate-y-1/2 overflow-visible xl:w-[min(54.1vw,48.7rem)] xl:max-w-none"
              data-guide-lines-layer="behind-masterplan"
              data-project-site-composition-guide-lines
              preserveAspectRatio="xMidYMid meet"
              viewBox={guideLineSet.viewBox}
            >
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="site-composition-zen-line-0"
                  x1={zenUnderlayLine.x1}
                  x2={zenUnderlayLine.x2}
                  y1={zenUnderlayLine.y1}
                  y2={zenUnderlayLine.y2}
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="22%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="78%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line
                data-project-site-composition-guide-line
                opacity="0.45"
                stroke="url(#site-composition-zen-line-0)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1={zenUnderlayLine.x1}
                x2={zenUnderlayLine.x2}
                y1={zenUnderlayLine.y1}
                y2={zenUnderlayLine.y2}
              />
            </svg>
          ) : null}

          <svg
            aria-hidden="true"
            className={`pointer-events-none absolute left-1/2 top-1/2 w-full max-w-[43rem] -translate-x-1/2 -translate-y-1/2 overflow-visible xl:w-[min(54.1vw,48.7rem)] xl:max-w-none ${guideLineVariant === "default" ? "z-0" : "z-20"}`}
            data-guide-lines-layer={
              guideLineVariant === "default"
                ? "behind-masterplan"
                : "over-masterplan"
            }
            data-project-site-composition-guide-lines
            preserveAspectRatio="xMidYMid meet"
            viewBox={guideLineSet.viewBox}
          >
            <defs>
              {guideLineSet.lines.map((line, index) =>
                guideLineVariant === "zen" && index === 0 ? null : (
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id={`site-composition-${guideLineVariant}-line-${index}`}
                    key={`gradient-${guideLineVariant}-${index}`}
                    x1={line.x1}
                    x2={line.x2}
                    y1={line.y1}
                    y2={line.y2}
                  >
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="22%" stopColor="#ffffff" stopOpacity="0.85" />
                    <stop offset="78%" stopColor="#ffffff" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                ),
              )}
            </defs>
            {guideLineSet.lines.map((line, index) =>
              guideLineVariant === "zen" && index === 0 ? null : (
                <line
                  data-project-site-composition-guide-line
                  key={`${guideLineVariant}-${index}`}
                  opacity="0.45"
                  stroke={`url(#site-composition-${guideLineVariant}-line-${index})`}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1={line.x1}
                  x2={line.x2}
                  y1={line.y1}
                  y2={line.y2}
                />
              ),
            )}
          </svg>

          <Reveal
            className="relative z-10 w-full max-w-[43rem] overflow-hidden xl:w-[min(54.1vw,48.7rem)] xl:max-w-none"
            data-project-site-composition-masterplan-wrapper
            fade={false}
            revealId="project-site-composition-masterplan"
            revealMode="manual"
            y={0}
          >
            <CdnImage
              alt={masterplanImage.alt}
              className="object-contain"
              data-project-site-composition-masterplan-image
              fill
              sizes="(min-width: 1280px) 55vw, 90vw"
              src={masterplanImage.src}
            />
          </Reveal>

          <Reveal
            aria-label={`${compass} compass direction`}
            className="absolute left-0 z-20 flex items-center gap-2.5 font-display text-[1.35rem] leading-none text-bone xl:-left-[19.5rem]"
            data-project-site-composition-compass
            revealId="project-site-composition-compass"
            revealMode="manual"
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
          className="relative z-20 space-y-[3.125rem] self-center"
          data-project-site-composition-right-content
        >
          {specifications.map((group, groupIndex) => (
            <section
              data-project-site-composition-specification-group
              key={group.title}
            >
              <Reveal
                revealId={`project-site-composition-specification-${groupIndex + 1}`}
                revealMode="manual"
              >
                <div
                  className="flex items-center gap-5"
                  data-project-site-composition-group-header
                >
                  <DifferenceText
                    as="h3"
                    className="shrink-0 font-display text-[0.875rem] font-normal uppercase leading-none"
                  >
                    {group.title}
                  </DifferenceText>
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
