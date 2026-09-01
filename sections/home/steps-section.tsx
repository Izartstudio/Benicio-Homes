"use client";

import responsiveStyles from "./steps-section.responsive.module.css";
import { ArchitecturalStairs } from "@/components/ArchitecturalStairs";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OrangeBlock } from "@/components/ui/orange-block";

gsap.registerPlugin(ScrollTrigger);

const texturePath =
  "/assets/textures/concrete-background-textures-09-1.webp";

const dividers = [
  {
    id: "location-left",
    className: "left-0 top-[48.95%] w-[3.47%]",
  },
  {
    id: "location-right",
    className: "left-[14.44%] top-[48.95%] w-[64.65%]",
  },
  {
    id: "about-left",
    className: "left-0 top-[56.86%] w-[3.47%]",
  },
  {
    id: "about-right",
    className: "left-[18.05%] top-[56.86%] w-[15.55%]",
  },
] as const;

const markers = [
  {
    id: "location-marker",
    className: "left-[79.1%] top-[47.86%]",
  },
  {
    id: "about-marker",
    className: "left-[33.61%] top-[55.71%]",
  },
] as const;

export function StepsSection() {
  useLayoutEffect(() => {
    const canvas = document.querySelector<HTMLElement>(
      "[data-steps-animation-canvas]",
    );
    const section = canvas?.closest("section");
    const previousSection = section?.previousElementSibling as
      | HTMLElement
      | null;
    const stairs = gsap.utils.toArray<HTMLElement>(
      "[data-architectural-stair]",
      canvas ?? undefined,
    );

    if (!canvas || !section || stairs.length === 0) {
      return;
    }

    const mainParagraph = canvas.querySelector<HTMLElement>("[data-step-copy]");
    const supportingLabels = [
      canvas.querySelector<HTMLElement>("[data-step-location]"),
      canvas.querySelector<HTMLElement>("[data-step-link]"),
    ].filter(Boolean) as HTMLElement[];
    const firstDividerLine = canvas.querySelector<HTMLElement>(
      '[data-divider-index="1"]',
    );
    const secondDividerLine = canvas.querySelector<HTMLElement>(
      '[data-divider-index="2"]',
    );
    const thirdDividerLine = canvas.querySelector<HTMLElement>(
      '[data-divider-index="3"]',
    );
    const fourthDividerLine = canvas.querySelector<HTMLElement>(
      '[data-divider-index="4"]',
    );
    const animatedDividerLines = [
      firstDividerLine,
      secondDividerLine,
      thirdDividerLine,
      fourthDividerLine,
    ].filter(Boolean) as HTMLElement[];
    const locationDividerLines = [
      firstDividerLine,
      secondDividerLine,
    ].filter(Boolean) as HTMLElement[];
    const aboutDividerLines = [
      thirdDividerLine,
      fourthDividerLine,
    ].filter(Boolean) as HTMLElement[];

    const [firstStair, ...animatedStairs] = stairs;

    gsap.set(firstStair, { autoAlpha: 1, y: 0 });
    gsap.set(animatedStairs, { autoAlpha: 0, y: 20 });
    gsap.set(animatedDividerLines, { scaleX: 0 });
    if (firstDividerLine) {
      gsap.set(firstDividerLine, { transformOrigin: "left center" });
    }
    if (secondDividerLine) {
      gsap.set(secondDividerLine, { transformOrigin: "right center" });
    }
    if (thirdDividerLine) {
      gsap.set(thirdDividerLine, { transformOrigin: "left center" });
    }
    if (fourthDividerLine) {
      gsap.set(fourthDividerLine, { transformOrigin: "right center" });
    }
    if (mainParagraph) {
      gsap.set(mainParagraph, { autoAlpha: 0, y: 14 });
    }
    gsap.set(supportingLabels, { autoAlpha: 0, y: 8 });
    [...stairs, mainParagraph, ...supportingLabels]
      .filter(Boolean)
      .forEach((element) => {
        (element as HTMLElement).dataset.revealInitialized = "";
      });

    const paragraphTimeline = mainParagraph
      ? gsap
          .timeline({
            paused: true,
            defaults: {
              duration: 0.68,
              ease: "power3.out",
            },
          })
          .to(mainParagraph, {
            autoAlpha: 1,
            y: 0,
          })
      : null;

    const secondDividerTimeline =
      locationDividerLines.length > 0
        ? gsap
            .timeline({
              paused: true,
              defaults: {
                duration: 0.8,
                ease: "power2.out",
              },
            })
            .to(locationDividerLines, {
              scaleX: 1,
            })
        : null;

    const thirdDividerTimeline =
      aboutDividerLines.length > 0
        ? gsap
            .timeline({
              paused: true,
              defaults: {
                duration: 0.8,
                ease: "power2.out",
              },
            })
            .to(aboutDividerLines, {
              scaleX: 1,
            })
        : null;

    const labelsTimeline =
      supportingLabels.length > 0
        ? gsap
            .timeline({
              paused: true,
              defaults: {
                duration: 0.4,
                ease: "power3.out",
              },
            })
            .to(supportingLabels, {
              autoAlpha: 1,
              y: 0,
              stagger: 0.055,
            })
        : null;

    const createStairTimeline = (stair: HTMLElement) =>
      gsap
        .timeline({
          paused: true,
          defaults: {
            duration: 0.78,
            ease: "power3.out",
          },
        })
        .to(stair, {
          autoAlpha: 1,
          y: 0,
        });

    let paragraphStarted = false;
    let secondPhaseStarted = false;
    let thirdDividerStarted = false;
    let thirdStairStarted = false;
    let fourthStairStarted = false;
    let labelsStarted = false;

    const playParagraph = () => {
      if (paragraphStarted) {
        return;
      }

      paragraphStarted = true;
      paragraphTimeline?.play(0);
    };

    const firstPhaseTimeline = gsap
      .timeline({ paused: true })
      .call(playParagraph, [], 0.42);
    const timelines = animatedStairs.map(createStairTimeline);

    const playSecondPhase = () => {
      if (secondPhaseStarted) {
        return;
      }

      secondPhaseStarted = true;
      timelines[0]?.play(0);
      secondDividerTimeline?.play(0);
    };

    const playLabels = () => {
      if (labelsStarted) {
        return;
      }

      labelsStarted = true;
      labelsTimeline?.play(0);
    };

    const playThirdStair = () => {
      if (thirdStairStarted) {
        return;
      }

      thirdStairStarted = true;
      timelines[1]?.play(0);
    };

    const playFourthStair = () => {
      if (fourthStairStarted) {
        return;
      }

      fourthStairStarted = true;
      timelines[2]?.play(0);
    };

    const completeThirdDividerPhase = () => {
      playThirdStair();
      playLabels();
    };

    const playThirdDivider = () => {
      if (!thirdDividerTimeline) {
        completeThirdDividerPhase();
        return;
      }

      if (thirdDividerTimeline.progress() >= 1) {
        completeThirdDividerPhase();
        return;
      }

      playSecondPhase();

      if (thirdDividerStarted) {
        return;
      }

      thirdDividerStarted = true;
      playThirdStair();
      thirdDividerTimeline.play(0);
    };

    thirdDividerTimeline?.eventCallback("onComplete", () => {
      completeThirdDividerPhase();
    });

    const triggers: ScrollTrigger[] = [];

    if (previousSection) {
      triggers.push(
        ScrollTrigger.create({
          trigger: previousSection,
          start: "bottom 65%",
          once: true,
          onEnter: () => {
            firstPhaseTimeline.play(0);
          },
        }),
      );
    }

    let secondaryWindowComplete = false;

    const runSecondaryPhases = (progress: number) => {
      if (secondaryWindowComplete) {
        return;
      }

      playSecondPhase();

      if (progress >= 0.47) {
        playThirdDivider();
      }

      if (progress >= 1) {
        playFourthStair();
        secondaryWindowComplete = true;
      }
    };

    let secondaryTrigger: ScrollTrigger | null = null;

    secondaryTrigger =
      ScrollTrigger.create({
        trigger: section,
        start: "top 52%",
        end: "top 37%",
        onEnter: (self) => {
          runSecondaryPhases(self.progress);
        },
        onUpdate: (self) => {
          runSecondaryPhases(self.progress);
        },
        onLeave: () => {
          runSecondaryPhases(1);
          secondaryTrigger?.kill();
        },
      });

    triggers.push(
      secondaryTrigger,
    );

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      timelines.forEach((timeline) => timeline.kill());
      firstPhaseTimeline.kill();
      paragraphTimeline?.kill();
      secondDividerTimeline?.kill();
      thirdDividerTimeline?.kill();
      labelsTimeline?.kill();
      gsap.set(stairs, { clearProps: "opacity,visibility,transform" });
      gsap.set(animatedDividerLines, {
        clearProps: "transform,transformOrigin",
      });
      if (mainParagraph) {
        gsap.set(mainParagraph, { clearProps: "opacity,visibility,transform" });
      }
      gsap.set(supportingLabels, {
        clearProps: "opacity,visibility,transform",
      });
    };
  }, []);

  return (
    <section
      aria-labelledby="steps-section-title"
      className={`relative isolate overflow-hidden bg-graphite ${responsiveStyles.responsiveRoot}`}
    >
      <div
        className="relative h-[clamp(560px,48.611vw,700px)] min-h-[560px] w-full overflow-hidden"
        data-steps-animation-canvas
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-[#2d2d2d]"
          data-steps-background-fill
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 select-none bg-cover bg-center opacity-62"
          data-steps-background-texture
          style={{ backgroundImage: `url("${texturePath}")` }}
        />

        <ArchitecturalStairs />

        <div
          aria-hidden="true"
          className="absolute inset-0 z-20"
          data-steps-divider-layer
        >
          {dividers.map((divider, index) => (
            <div
              key={divider.id}
              className={`absolute h-px bg-silver/45 ${divider.className}`}
              data-step-divider={divider.id}
              data-divider-index={index + 1}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 z-30"
          data-steps-marker-layer
        >
          {markers.map((marker, index) => (
            <OrangeBlock
              key={marker.id}
              className={`absolute ${marker.className}`}
              data-step-marker={marker.id}
              data-marker-index={index + 1}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-40" data-steps-content-layer>
          <h2 id="steps-section-title" className="sr-only">
            THE PRACTICE
          </h2>
          <p
            className="absolute left-[5.28%] top-[15.7%] max-w-[61rem] font-display text-[2rem] font-light leading-[1.42] tracking-[0.01em] text-[#eeeeee]"
            data-step-copy
          >
            Good Architecture should respect the climate of the land, and not stay apart from it
          
          </p>

          <p
            className="absolute left-[5.28%] top-[47.75%] font-mono text-[1.25rem] font-medium uppercase tracking-[0.08em] text-[#b9b9b9]"
            data-step-location
          >
            GOA, IN
          </p>

          <a
            href="/about"
            className="absolute left-[5.28%] top-[55.85%] inline-flex items-center gap-3 font-mono text-[1.375rem] font-medium uppercase leading-[1.35] tracking-[0.04em] text-[#dc4c28]"
            data-step-link
            style={{ color: "#DC4C28" }}
          >
            THE PRACTICE
            <span aria-hidden="true" className="translate-y-[-1px]">
              &rsaquo;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
