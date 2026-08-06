"use client";

import type { ImageProps } from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Reveal } from "@/components/ui/reveal";
import {
  ProjectHeroBackground,
  type ProjectHeroFocalPosition,
} from "./project-hero-background";
import { ProjectTitleTexture } from "./project-title-texture";
import { isSafariBrowser } from "@/utils/is-safari-browser";
import styles from "./project-hero.responsive.module.css";

type ProjectHeroImage = {
  alt: string;
  src: ImageProps["src"];
};

export type ProjectHeroMedia = {
  background: ProjectHeroImage;
  focalPosition?: ProjectHeroFocalPosition;
  foreground?: ProjectHeroImage;
  foregroundCanvasHeightRatio?: number;
  mediaAspectRatio: number;
};

export type ProjectHeroSequenceProps = {
  continuationStatement: string;
  description: string;
  layout?: "default" | "el-salva" | "nayan" | "zen";
  media: ProjectHeroMedia;
  title: string;
};

export function ProjectHeroSequence({
  continuationStatement,
  description,
  layout = "default",
  media,
  title,
}: ProjectHeroSequenceProps) {
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const continuationStatementRef = useRef<HTMLDivElement | null>(null);
  const mediaMotionRef = useRef<HTMLDivElement | null>(null);
  const sequenceRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const titleWords = title.trim().split(/\s+/);
  const titleLines =
    layout === "nayan" || layout === "el-salva"
      ? titleWords.length > 1
        ? [titleWords[0], titleWords.slice(1).join(" ")]
        : [title]
      : null;
  useLayoutEffect(() => {
    const sequence = sequenceRef.current;
    const backgroundImage = backgroundImageRef.current;
    const continuationStatement = continuationStatementRef.current;
    const mediaMotion = mediaMotionRef.current;
    const title = titleRef.current;
    if (
      !sequence ||
      !backgroundImage ||
      !continuationStatement ||
      !mediaMotion ||
      !title
    ) {
      return;
    }

    let context: gsap.Context | null = null;
    let mediaMatcher: gsap.MatchMedia | null = null;
    let disposed = false;

    const initialize = () => {
      if (disposed || context) {
        return;
      }

      context = gsap.context(() => {
        mediaMatcher = gsap.matchMedia();
        mediaMatcher.add(
          {
            desktop: "(min-width: 1024px)",
            tablet: "(min-width: 768px) and (max-width: 1023px)",
            mobile: "(max-width: 767px)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (matchContext) => {
            const conditions = matchContext.conditions as {
              desktop: boolean;
              mobile: boolean;
              tablet: boolean;
              reduceMotion: boolean;
            };
            const animatedMedia = [mediaMotion, title];

            if (conditions.reduceMotion) {
              gsap.set([...animatedMedia, continuationStatement], {
                clearProps: "opacity,transform,visibility,willChange",
              });
              return;
            }

            gsap.set(continuationStatement, {
              autoAlpha: 0,
              y: conditions.desktop ? 24 : 16,
            });

            // Native touch scrolling should track the finger exactly. A
            // scrubbed catch-up transform makes the image and title chase the
            // viewport on mobile, which reads as jitter. Keep a lightweight
            // one-shot statement reveal while leaving the hero layers stable.
            if (
              conditions.mobile ||
              conditions.tablet ||
              isSafariBrowser()
            ) {
              const statementTween = gsap.to(continuationStatement, {
                autoAlpha: 1,
                duration: 0.48,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: continuationStatement,
                  start: "top 90%",
                  once: true,
                },
                y: 0,
              });

              return () => {
                statementTween.kill();
                gsap.set(continuationStatement, {
                  clearProps: "opacity,transform,visibility,willChange",
                });
              };
            }

            const setWillChange = (active: boolean) => {
              animatedMedia.forEach((element) => {
                if (element instanceof HTMLElement) {
                  element.style.willChange = active ? "transform" : "";
                }
              });
            };

            const timeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: sequence,
                start: "top top",
                end: "bottom bottom",
                scrub: conditions.desktop ? 0.8 : 0.45,
                invalidateOnRefresh: true,
                onEnter: () => setWillChange(true),
                onEnterBack: () => setWillChange(true),
                onLeave: () => setWillChange(false),
                onLeaveBack: () => setWillChange(false),
              },
            });

            timeline.to(
              mediaMotion,
              {
                force3D: true,
                scale: 1.035,
                yPercent: -1.25,
              },
              0,
            );

            timeline
              .to(
                title,
                {
                  yPercent: conditions.desktop ? -3 : -1.5,
                },
                0,
              )
              .to(
                continuationStatement,
                {
                  autoAlpha: 1,
                  duration: 0.18,
                  y: 0,
                },
                0.5,
              );

            return () => {
              setWillChange(false);
              timeline.kill();
              gsap.set([...animatedMedia, continuationStatement], {
                clearProps:
                  "opacity,transform,transformOrigin,visibility,willChange",
              });
            };
          },
        );
      }, sequence);
    };

    if (backgroundImage.complete && backgroundImage.naturalWidth > 0) {
      initialize();
    } else {
      backgroundImage.addEventListener("load", initialize, { once: true });
    }

    return () => {
      disposed = true;
      backgroundImage.removeEventListener("load", initialize);
      mediaMatcher?.revert();
      context?.revert();
    };
  }, []);

  return (
    <section
      className={styles.heroSequence}
      data-hero-layout={layout}
      ref={sequenceRef}
    >
      <section
        aria-labelledby="project-hero-title"
        className={styles.hero}
        data-project-hero
      >
        <ProjectHeroBackground
          backgroundImage={media.background}
          backgroundImageRef={backgroundImageRef}
          focalPosition={media.focalPosition}
          foregroundCanvasHeightRatio={media.foregroundCanvasHeightRatio}
          foregroundImage={media.foreground}
          mediaAspectRatio={media.mediaAspectRatio}
          ref={mediaMotionRef}
        />

        <div
          className={styles.heroTitleLayer}
          data-hero-title-layer
          ref={titleRef}
        >
          <Reveal
            className={styles.heroTitleReveal}
            delay={0.12}
            duration={0.92}
            fade={false}
            revealId="project-hero-title"
            revealMode="mount"
            y={36}
          >
            <ProjectTitleTexture
              className={styles.heroTitle}
              id="project-hero-title"
            >
              {titleLines
                ? titleLines.map((line, index) => (
                    <span
                      className={styles.heroTitleLine}
                      data-hero-title-line={index + 1}
                      key={line}
                    >
                      {line}
                    </span>
                  ))
                : title}
            </ProjectTitleTexture>
          </Reveal>
        </div>

        <div className={styles.heroContent}>
          <Reveal
            className={styles.heroDescriptionReveal}
            duration={0.82}
            revealId="project-hero-description"
            revealMode="mount"
            y={18}
          >
            <p className={styles.heroDescription}>{description}</p>
          </Reveal>
        </div>

        <div
          className={styles.continuationContent}
          data-project-hero-continuation
          ref={continuationStatementRef}
        >
          <span aria-hidden="true" className={styles.continuationAccent} />
          <p className={styles.continuationStatement}>
            {continuationStatement}
          </p>
        </div>
      </section>
    </section>
  );
}
