"use client";

import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const texturePath = "/assets/textures/concrete-background-textures-09-1.svg";

const projects = [
  {
    id: "majorda",
    title: "MAJORDA",
    image: "/assets/projects/majorda-front-view.png",
    imageAlt: "Majorda villa front elevation",
    description:
      "Majorda is a tropical residence that adapts to Goa's climate with overhangs, courtyards, and spaces for natural light and ventilation.",
    metadata: [
      ["Built Up Area", "3408 sqft."],
      ["Saleable Area", "3518 sqft."],
      ["Villa Configuration", "4BHK"],
    ],
  },
  {
    id: "casa-verde",
    title: "CASA VERDE",
    image: "/assets/projects/casa-verde-front-view.png",
    imageAlt: "Casa Verde villa exterior with arched facade",
    description:
      "Majorda is a tropical residence that adapts to Goa's climate with overhangs, courtyards, and spaces for natural light and ventilation.",
    metadata: [
      ["Built Up Area", "3120 sqft."],
      ["Saleable Area", "3285 sqft."],
      ["Villa Configuration", "3BHK"],
    ],
  },
  {
    id: "palm-house",
    title: "PALM HOUSE",
    image: "/assets/projects/majorda-front-view.png",
    loading: 'eager',
    imageAlt: "Palm House villa exterior with tropical landscape",
    description:
      "Majorda is a tropical residence that adapts to Goa's climate with overhangs, courtyards, and spaces for natural light and ventilation.",
    metadata: [
      ["Built Up Area", "3650 sqft."],
      ["Saleable Area", "3820 sqft."],
      ["Villa Configuration", "4BHK"],
    ],
  },
] as const;

const imageStateClasses = [
  "left-0 top-[21.78%] z-30 h-[51.46%] w-[64.24%] opacity-100",
  "bottom-[-3.5%] left-[5.56%] z-20 h-[23.5%] w-[50.7%] scale-[0.96] opacity-40 blur-[3px]",
  "bottom-[-14%] left-[19%] z-10 h-[21%] w-[45%] scale-[0.9] opacity-0 blur-[4px]",
] as const;

export function FeaturedProjectsSection() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(
      '[data-section="featured-projects"]',
    );
    const canvas = section?.querySelector<HTMLElement>(
      "[data-featured-animation-canvas]",
    );

    if (!section || !canvas) {
      return;
    }

    const ctx = gsap.context(() => {
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
        images.length < projects.length ||
        titles.length < projects.length ||
        contentGroups.length < projects.length
      ) {
        return;
      }

      const activeImageState = {
        left: "0%",
        top: "21.78%",
        bottom: "auto",
        width: "64.24%",
        height: "51.46%",
      };

      gsap.set(images, { transformOrigin: "50% 50%" });
      gsap.set(images, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(titles, { y: 16 });
      gsap.set(titles[0], { autoAlpha: 0.55, y: 0 });
      gsap.set(titles.slice(1), { autoAlpha: 0 });
      gsap.set(contentGroups[0], { autoAlpha: 1, y: 0 });
      gsap.set(contentGroups.slice(1), { autoAlpha: 0, y: 18 });
      gsap.set(progressFills, { width: "33%" });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.inOut",
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const transitionToProject = (fromIndex: number, toIndex: number) => {
        const position = toIndex;
        const progressWidth = `${((toIndex + 1) / projects.length) * 100}%`;

        timeline
          .set(images[toIndex], { zIndex: 40 }, position)
          .set(images[fromIndex], { zIndex: 30 }, position)
          .set(
            images[toIndex],
            {
              ...activeImageState,
              autoAlpha: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              clipPath: "inset(100% 0% 0% 0%)",
            },
            position,
          )
          .set(
            images[fromIndex],
            {
              ...activeImageState,
              autoAlpha: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              clipPath: "inset(0% 0% 0% 0%)",
            },
            position,
          )
          .to(
            images[toIndex],
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.66,
            },
            position,
          )
          .set(images[fromIndex], { autoAlpha: 0, zIndex: 20 }, position + 0.67)
          .to(
            titles[fromIndex],
            {
              autoAlpha: 0,
              y: -18,
              duration: 0.46,
            },
            position,
          )
          .to(
            titles[toIndex],
            {
              autoAlpha: 0.55,
              y: 0,
              duration: 0.58,
            },
            position + 0.1,
          )
          .to(
            contentGroups[fromIndex],
            {
              autoAlpha: 0,
              y: -18,
              duration: 0.5,
            },
            position,
          )
          .to(
            contentGroups[toIndex],
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.62,
            },
            position + 0.08,
          )
          .to(
            progressFills,
            {
              width: progressWidth,
              duration: 0.58,
            },
            position + 0.08,
          );
      };

      timeline.to({}, { duration: 1 });
      transitionToProject(0, 1);
      timeline.to({}, { duration: 0.75 });
      transitionToProject(1, 2);
      timeline.to({}, { duration: 1 });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      aria-labelledby="featured-projects-title"
      className="relative isolate overflow-hidden bg-graphite text-bone"
      data-section="featured-projects"
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
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,#464646_10%,#2d2d2d_100%)]"
            data-featured-gradient-overlay
          />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90 mix-blend-overlay"
            data-featured-texture-layer
            style={{ backgroundImage: `url("${texturePath}")` }}
          />
        </div>

        <div
          className="relative h-full min-h-[860px] overflow-hidden"
          data-featured-animation-canvas
        >
          <div
            className="absolute inset-0 z-20"
            data-featured-image-stack
          >
            {projects.map((project, index) => (
              <figure
                key={project.id}
                className={`absolute overflow-hidden ${imageStateClasses[index]}`}
                data-featured-image={project.id}
                data-featured-image-index={index + 1}
              >
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 z-30 w-[64.24%] overflow-hidden"
            data-featured-floating-title-stack
          >
            {projects.map((project, index) => (
              <p
                key={project.id}
                className={`absolute left-0 top-[14.2%] w-full whitespace-nowrap bg-[linear-gradient(180deg,rgba(255,255,255,0.68)_0%,rgba(185,185,185,0.28)_52%,rgba(255,255,255,0.12)_100%)] bg-clip-text text-center font-display text-[clamp(5rem,9.5vw,8.75rem)] font-normal uppercase leading-[0.82] tracking-[0.04em] text-transparent mix-blend-screen [-webkit-text-stroke:1px_rgba(255,255,255,0.16)] [text-shadow:0_1px_22px_rgba(255,255,255,0.08)] ${
                  index === 0 ? "opacity-55" : "opacity-0"
                }`}
                data-featured-floating-title={project.id}
                data-featured-title-index={index + 1}
              >
                {project.title}
              </p>
            ))}
          </div>

          <aside
            className="absolute bottom-0 right-0 top-0 z-40 w-full border-silver/35 lg:w-[35.76%] lg:border-l"
            aria-labelledby="featured-projects-title"
            data-featured-information-panel
          >
            <div
              className="relative h-full px-[8.95%] pb-[8%] pt-[15.35%]"
              data-featured-panel-layout
            >
              <h2 id="featured-projects-title" className="sr-only">
                Featured Projects
              </h2>
              <div
                className="relative h-full overflow-hidden"
                data-featured-project-content-stack
              >
                {projects.map((project, index) => (
                  <article
                    key={project.id}
                    className={`absolute inset-0 grid h-full content-start gap-[clamp(3.5rem,6vh,4.75rem)] ${
                      index === 0 ? "opacity-100" : "opacity-0"
                    }`}
                    data-featured-project-content={project.id}
                    data-featured-content-index={index + 1}
                  >
                    <div
                      className="grid gap-[clamp(4rem,7vh,5rem)]"
                      data-featured-header-block
                      data-featured-header-region
                    >
                      <div
                        className="flex w-full items-center gap-3"
                        data-featured-progress-rail
                      >
                        <p
                          className="shrink-0 font-display text-sm font-semibold text-bone"
                          data-featured-panel-kicker
                        >
                          Featured
                        </p>
                        <div
                          aria-hidden="true"
                          className="h-px w-[18%] bg-laterite"
                          data-featured-progress-fill
                        />
                        <div
                          aria-hidden="true"
                          className="h-px flex-1 bg-silver/70"
                          data-featured-progress-track
                        />
                      </div>

                      <div
                        aria-hidden="true"
                        className="h-px w-full bg-[linear-gradient(90deg,#b9b9b9_0%,rgba(83,83,83,0)_100%)]"
                        data-featured-decorative-line="panel-top"
                      />

                      <p
                        className="max-w-[19.5rem] font-display text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.42] text-bone"
                        data-featured-description={project.id}
                      >
                        {project.description}
                      </p>
                    </div>

                    <dl
                      className="font-display text-sm"
                      data-featured-metadata={project.id}
                      data-featured-metadata-region
                    >
                      {project.metadata.map(([label, value]) => (
                        <div
                          key={label}
                          className="grid grid-cols-[1fr_auto] gap-6 border-b border-transparent bg-[linear-gradient(90deg,#b9b9b9_0%,rgba(83,83,83,0)_100%)] bg-[length:100%_1px] bg-bottom bg-no-repeat py-3"
                          data-featured-metadata-row
                        >
                          <dt>{label}</dt>
                          <dd className="text-right text-silver">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div
                      className="flex items-start"
                      data-featured-cta-region
                    >
                      <a
                        href="#"
                        className="inline-flex h-[4.5rem] w-full max-w-[20rem] items-center justify-between bg-[#333333] px-8 font-display text-[1.0625rem] text-bone"
                        data-featured-cta={project.id}
                      >
                        View Project
                        <span
                          aria-hidden="true"
                          className="translate-y-[0.18rem] text-2xl leading-none text-bone"
                        >
                          &rsaquo;
                        </span>
                      </a>
                    </div>

                    <div
                      aria-hidden="true"
                      className="h-px w-full bg-[linear-gradient(90deg,#b9b9b9_0%,rgba(83,83,83,0)_100%)]"
                      data-featured-decorative-line="panel-bottom"
                    />
                  </article>
                ))}
              </div>
            </div>
          </aside>

          <div
            aria-hidden="true"
            className="absolute inset-0 z-[35]"
            data-featured-decorative-layer
          >
            <div
              className="absolute left-[64.24%] top-[6.25%] h-[84.9%] w-px bg-[linear-gradient(180deg,rgba(185,185,185,0)_0%,#b9b9b9_25%,#b9b9b9_75%,rgba(185,185,185,0)_100%)]"
              data-featured-decorative-line="vertical-panel"
            />
            <div
              className="absolute left-[62.5%] top-[45.7%] size-[clamp(38px,3.47vw,50px)] bg-[url('/assets/blocks/orange-block.svg')] bg-cover bg-center"
              data-featured-decorative-accent="laterite-square"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
