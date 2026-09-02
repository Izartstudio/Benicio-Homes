"use client";

import responsiveStyles from "./featured-projects-section.responsive.module.css";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlendScope } from "@/components/ui/blend-scope";
import { CdnImage } from "@/components/ui/cdn-image";
import { CTA } from "@/components/ui/cta";
import { OrangeBlock } from "@/components/ui/orange-block";

gsap.registerPlugin(ScrollTrigger);

const defaultTexturePath = "/assets/textures/concrete-background-textures-09-1.webp";

export type FeaturedProject = {
  id: string;
  title: string;
  href: string;
  url: string;
  imageAlt: string;
  description: string;
  metadata: readonly (readonly [string, string])[];
};

const defaultProjects: readonly FeaturedProject[] = [
  {
    id: "majorda",
    title: "NAYAN",
    href: "/projects/nayan-villa",
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/featuredprojects-villa1.webp",
    imageAlt: "Majorda villa front elevation",
    description:
      "Nayan Villas is a collection of six tropical 4 bedroom private pool Villas, each set on an independent plot within an exclusive gated community in Majorda, South Goa.",
    metadata: [
      ["Built Up Area", "3408 sqft."],
      ["Saleable Area", "3518 sqft."],
      ["Villa Configuration", "4BHK"],
    ],
  },
  {
    id: "casa-verde",
    title: "VANAM",
    href: "/projects/vanam-villas",
    url: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Home-Page/featuredprojects-villa2.webp",
    imageAlt: "Casa Verde villa exterior with arched facade",
    description:
      "Vanam Villas features six tropical residences in Anjuna's lush landscape. Each villa balances privacy, architecture, and nature for a serene retreat.",
    metadata: [
      ["Built Up Area", "3408 sqft."],
      ["Saleable Area", "3518 sqft."],
      ["Villa Configuration", "4BHK"],
    ],
  },
  {
    id: "palm-house",
    title: "ZEN VILLA II",
    href: "/projects/zen-villas-2",
    url: "/assets/projects/zen-villa-2-bg.png",
    imageAlt: "Palm House villa exterior with tropical landscape",
    description:
      "An architectural sanctuary of modern design, Zen Villa II offers a secluded retreat defined by contemporary elegance and luxury. ",
    metadata: [
      ["Built Up Area", "339 sqft."],
      ["Saleable Area", "351 sqft."],
      ["Villa Configuration", "3BHK"],
    ],
  },
] as const;

type FeaturedProjectsSectionProps = {
  projects?: readonly FeaturedProject[];
  sectionKey?: string;
  sectionTitle?: string;
  kicker?: string;
  ctaLabel?: string;
  texturePath?: string;
  texturePosition?: string;
  theme?: "dark" | "restoration";
  bottomTransition?: boolean;
};

export function FeaturedProjectsSection({
  projects = defaultProjects,
  sectionKey = "featured-projects",
  sectionTitle = "Featured Projects",
  kicker = "Featured",
  ctaLabel = "View Project",
  texturePath = defaultTexturePath,
  texturePosition = "center",
  theme = "dark",
  bottomTransition = false,
}: FeaturedProjectsSectionProps = {}) {
  const featuredProjects = projects.length > 0 ? projects : defaultProjects;
  const isRestorationTheme = theme === "restoration";
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = section?.querySelector<HTMLElement>(
      "[data-featured-animation-canvas]",
    );

    if (!section || !canvas) {
      return;
    }

    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 1200px)",
        tablet: "(min-width: 768px) and (max-width: 1199px)",
        mobile:
          "(max-width: 767px), ((max-width: 1199px) and (max-height: 500px))",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const ctx = gsap.context(() => {
          const isMobile = Boolean(context.conditions?.mobile);
          const reduceMotion = Boolean(context.conditions?.reduceMotion);
          const titleTravel = reduceMotion ? 0 : isMobile ? 5 : 8;
          const contentTravel = reduceMotion ? 0 : 18;
          const images = gsap.utils.toArray<HTMLElement>(
            "[data-featured-image]",
            canvas,
          );
          const titles = gsap.utils.toArray<HTMLElement>(
            "[data-featured-floating-title]",
            canvas,
          );
          const contentGroups = gsap.utils.toArray<HTMLElement>(
            "[data-featured-project-content]",
            canvas,
          );
          const progressFills = gsap.utils.toArray<HTMLElement>(
            "[data-featured-progress-fill]",
            canvas,
          );

          if (
            images.length < featuredProjects.length ||
            titles.length < featuredProjects.length ||
            contentGroups.length < featuredProjects.length
          ) {
            return;
          }

          const activeImageState = isMobile
            ? {
                left: "clamp(1.5rem, 8.974vw, 2.1875rem)",
                right: "clamp(1.5rem, 8.974vw, 2.1875rem)",
                top: "6.6875rem",
                bottom: "auto",
                width: "auto",
                height: "min(70.513vw, 17.1875rem)",
              }
            : {
                left: "0%",
                top: "19.65%",
                bottom: "auto",
                width: "64.24%",
                height: "clamp(32rem, 42vw, 50rem)",
              };

          gsap.set(images, {
            ...activeImageState,
            autoAlpha: 0,
            clipPath: "inset(100% 0% 0% 0%)",
            willChange: "clip-path, opacity",
          });
          gsap.set(images[0], {
            ...activeImageState,
            autoAlpha: 1,
            clipPath: "inset(0% 0% 0% 0%)",
          });
          gsap.set(titles, {
            autoAlpha: 0,
            y: titleTravel,
            force3D: true,
          });
          gsap.set(titles[0], {
            autoAlpha: 1,
            y: 0,
          });
          gsap.set(contentGroups[0], {
            autoAlpha: 1,
            force3D: true,
            y: 0,
          });
          gsap.set(contentGroups.slice(1), {
            autoAlpha: 0,
            force3D: true,
            y: contentTravel,
          });
          gsap.set(progressFills, {
            width: `${100 / featuredProjects.length}%`,
          });

          const timeline = gsap.timeline({
            defaults: {
              ease: "power3.inOut",
            },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              // Native sticky positioning holds the visual surface. The outer
              // scene owns the complete distance, so Story cannot enter until
              // the sticky interaction has cleanly released.
              end: "bottom bottom",
              scrub: reduceMotion ? true : 0.25,
              invalidateOnRefresh: true,
            },
          });

          const transitionToProject = (
            fromIndex: number,
            toIndex: number,
          ) => {
            const position = toIndex;
            const progressWidth = `${((toIndex + 1) / featuredProjects.length) * 100}%`;
            const titleTransitionDuration = reduceMotion ? 0.01 : 0.52;
            const imageTransitionDuration = reduceMotion ? 0.01 : 0.66;
            const contentTransitionDuration = reduceMotion ? 0.01 : 0.5;

            timeline
              .set(images[toIndex], { zIndex: 20 }, position)
              .set(images[fromIndex], { zIndex: 19 }, position)
              .set(
                images[toIndex],
                {
                  ...activeImageState,
                  autoAlpha: 1,
                  clipPath: "inset(100% 0% 0% 0%)",
                },
                position,
              )
              .set(
                images[fromIndex],
                {
                  ...activeImageState,
                  autoAlpha: 1,
                  clipPath: "inset(0% 0% 0% 0%)",
                },
                position,
              )
              .to(
                images[toIndex],
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: imageTransitionDuration,
                },
                position,
              )
              .set(
                images[fromIndex],
                { autoAlpha: 0, zIndex: 10 },
                position + imageTransitionDuration + 0.01,
              )
              .to(
                titles[fromIndex],
                {
                  autoAlpha: 0,
                  y: -titleTravel,
                  duration: titleTransitionDuration,
                  ease: "power2.inOut",
                },
                position,
              )
              .to(
                titles[toIndex],
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: titleTransitionDuration,
                  ease: "power2.inOut",
                },
                position,
              )
              .to(
                contentGroups[fromIndex],
                {
                  autoAlpha: 0,
                  y: -contentTravel,
                  duration: contentTransitionDuration,
                },
                position,
              )
              .to(
                contentGroups[toIndex],
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: reduceMotion ? 0.01 : 0.62,
                },
                position + (reduceMotion ? 0 : 0.08),
              )
              .to(
                progressFills,
                {
                  width: progressWidth,
                  duration: reduceMotion ? 0.01 : 0.58,
                },
                position + (reduceMotion ? 0 : 0.08),
              );
          };

          timeline.to({}, { duration: 1 });
          featuredProjects.slice(1).forEach((_, index) => {
            const toIndex = index + 1;
            transitionToProject(toIndex - 1, toIndex);

            if (toIndex < featuredProjects.length - 1) {
              timeline.to({}, { duration: 0.75 });
            }
          });
          timeline.to({}, { duration: isMobile ? 0.35 : 1 });
        }, section);

        return () => ctx.revert();
      },
    );

    return () => media.revert();
  }, [featuredProjects]);

  return (
    <BlendScope
      as="section"
      aria-labelledby={`${sectionKey}-title`}
      className={`relative isolate overflow-clip ${
        isRestorationTheme
          ? "bg-[#FAFAFA] text-[#232323]"
          : "bg-graphite text-bone"
      } ${responsiveStyles.responsiveRoot}`}
      data-section={sectionKey}
      data-featured-theme={theme}
      ref={sectionRef}
    >
      <div
        className="relative min-h-[860px] lg:h-[clamp(860px,71.111vw,1024px)]"
        data-featured-scroll-container
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          data-featured-background-layer
        >
          {!isRestorationTheme ? (
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#464646_0%,#2d2d2d_100%)] mix-blend-multiply"
              data-featured-gradient-overlay
            />
          ) : null}
          <div
            className={`pointer-events-none absolute inset-0 select-none bg-cover bg-center ${
              isRestorationTheme
                ? "opacity-70 mix-blend-multiply"
                : "opacity-90 mix-blend-overlay"
            }`}
            data-featured-texture-layer
            style={{
              backgroundImage: `url("${texturePath}")`,
              backgroundPosition: texturePosition,
            }}
          />
          {!isRestorationTheme ? (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 top-[73.24%] bg-[linear-gradient(180deg,rgba(70,70,70,0)_0%,#464646_100%)]"
              data-featured-lower-gradient-overlay
            />
          ) : null}
        </div>

        <div
          className="relative h-full min-h-[860px] overflow-hidden"
          data-featured-animation-canvas
        >
          <div
            aria-hidden="true"
            data-featured-mobile-progress-rail
          >
            <p
              className={`shrink-0 font-display font-semibold ${
                isRestorationTheme ? "text-[#232323]" : "text-bone"
              }`}
              data-featured-panel-kicker
            >
              {kicker}
            </p>
            <div
              className={`relative h-px flex-1 ${
                isRestorationTheme ? "bg-[#232323]/25" : "bg-[#fafafa]"
              }`}
              data-featured-progress-track
            >
              <div
                className="absolute inset-y-0 left-0 h-px bg-[#d45231]"
                data-featured-progress-fill
                style={{ width: `${100 / featuredProjects.length}%` }}
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-20"
            data-featured-image-stack
          >
            {featuredProjects.map((project, index) => (
              <figure
                key={project.id}
                className={`absolute left-0 top-[19.65%] h-[clamp(32rem,42vw,50rem)] w-[64.24%] overflow-hidden ${
                  index === 0 ? "z-20 opacity-100" : "invisible z-10 opacity-0"
                }`}
                data-featured-image={project.id}
                data-featured-image-index={index + 1}
              >
                <CdnImage
                  src={project.url}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[64.24%] overflow-hidden mix-blend-difference"
            data-featured-floating-title-stack
          >
            {featuredProjects.map((project, index) => (
              <p
                key={project.id}
                className={`absolute left-0 top-[12.8%] w-full whitespace-nowrap text-center font-display font-light uppercase leading-[135%] tracking-[0] text-white ${
                  index === 0 ? "visible" : "invisible"
                }`}
                data-featured-floating-title={project.id}
                data-featured-title-index={index + 1}
              >
                {project.title}
              </p>
            ))}
          </div>

          <aside
            className={`absolute bottom-0 right-0 top-0 z-40 w-full lg:w-[35.76%] lg:border-l ${
              isRestorationTheme ? "border-[#232323]/25" : "border-silver/35"
            }`}
            aria-labelledby={`${sectionKey}-title`}
            data-featured-information-panel
          >
            <div
              className="relative h-full px-[8.95%] pb-[8%] pt-[15.35%]"
              data-featured-panel-layout
            >
              <h2 id={`${sectionKey}-title`} className="sr-only">
                {sectionTitle}
              </h2>
              <div
                className="relative h-full"
                data-featured-project-content-shell
              >
                <div
                  className="relative h-full overflow-visible"
                  data-featured-project-content-stack
                >
                  <div
                    className="absolute inset-x-0 top-0 z-20 flex h-5 w-full items-center gap-3"
                    data-featured-desktop-progress-rail
                    data-featured-progress-rail
                  >
                    <p
                      className={`shrink-0 font-display text-sm font-semibold ${
                        isRestorationTheme ? "text-[#232323]" : "text-bone"
                      }`}
                      data-featured-panel-kicker
                    >
                      {kicker}
                    </p>
                    <div
                      aria-hidden="true"
                      className={`relative h-px flex-1 ${
                        isRestorationTheme ? "bg-[#232323]/25" : "bg-[#fafafa]"
                      }`}
                      data-featured-progress-track
                    >
                      <div
                        className="absolute inset-y-0 left-0 h-px bg-[#d45231]"
                        data-featured-progress-fill
                        style={{ width: `${100 / featuredProjects.length}%` }}
                      />
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    className="h-px w-full bg-[linear-gradient(90deg,#b9b9b9_0%,rgba(83,83,83,0)_100%)]"
                    data-featured-decorative-line="panel-top"
                  />

                  {featuredProjects.map((project, index) => (
                    <article
                      key={project.id}
                      className={`absolute inset-0 grid h-full content-start gap-[clamp(3.5rem,6vh,4.75rem)] ${
                        index === 0 ? "opacity-100" : "opacity-0"
                      }`}
                      data-featured-project-content={project.id}
                      data-featured-content-index={index + 1}
                    >
                      <h3 className="sr-only">{project.title}</h3>
                      <div
                        className="grid gap-[clamp(4rem,7vh,5rem)]"
                        data-featured-header-block
                        data-featured-header-region
                      >
                        <div
                          aria-hidden="true"
                          className="h-5 w-full"
                          data-featured-progress-spacer
                        />

                        <p
                          className={`max-w-[19.5rem] font-display ${
                            isRestorationTheme
                              ? "text-[clamp(0.95rem,1.12vw,1rem)] leading-none text-[#D45231]"
                              : "text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.42] text-bone"
                          }`}
                          data-featured-description={project.id}
                        >
                          {project.description}
                        </p>
                      </div>

                      {project.metadata.length > 0 ? (
                        <dl
                          className="font-display text-sm"
                          data-featured-metadata={project.id}
                          data-featured-metadata-region
                        >
                          {project.metadata.map(([label, value]) => (
                            <div
                              key={label}
                              className={`grid grid-cols-[1fr_auto] gap-6 border-b border-transparent bg-[length:100%_1px] bg-bottom bg-no-repeat py-3 ${
                                isRestorationTheme
                                  ? "bg-[linear-gradient(90deg,rgba(35,35,35,0.45)_0%,rgba(35,35,35,0)_100%)]"
                                  : "bg-[linear-gradient(90deg,#b9b9b9_0%,rgba(83,83,83,0)_100%)]"
                              }`}
                              data-featured-metadata-row
                            >
                              <dt>{label}</dt>
                              <dd
                                className={`text-right ${
                                  isRestorationTheme
                                    ? "text-[#575757]"
                                    : "text-silver"
                                }`}
                              >
                                {value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      ) : null}

                      <div
                        className="flex items-start"
                        data-featured-cta-region
                      >
                        <CTA
                          arrowClassName="translate-y-[0.18rem] text-2xl leading-none"
                          className="inline-flex h-[4.5rem] w-full max-w-[20rem] items-center justify-between px-8 font-display text-[1.0625rem]"
                          darkBackground="#333333"
                          data-featured-cta={project.id}
                          href={project.href}
                          variant="dark"
                        >
                          {ctaLabel}
                        </CTA>
                      </div>
                    </article>
                  ))}

                  <div
                    aria-hidden="true"
                    className="h-px w-full bg-[linear-gradient(90deg,#b9b9b9_0%,rgba(83,83,83,0)_100%)]"
                    data-featured-decorative-line="panel-bottom"
                  />
                </div>
              </div>
            </div>
          </aside>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[35]"
            data-featured-decorative-layer
          >
            <div
              className="absolute bottom-[8.85%] left-[64.24%] top-[6.25%] w-px"
              data-featured-line-wrapper="vertical-panel"
            >
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(83,83,83,0)_0%,#b9b9b9_10%,#b9b9b9_90%,rgba(83,83,83,0)_100%)]"
                data-featured-decorative-line="vertical-panel"
              />
              <OrangeBlock
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                data-featured-decorative-accent="laterite-square"
              />
            </div>
          </div>
        </div>
      </div>

      {bottomTransition ? (
        <div
          aria-hidden="true"
          data-featured-bottom-transition
        >
          <CdnImage
            alt=""
            className="object-cover object-bottom"
            fill
            quality={75}
            sizes="100vw"
            src="/assets/textures/contact-texture.webp"
          />
        </div>
      ) : null}
    </BlendScope>
  );
}
