"use client";

import type { ImageProps } from "next/image";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CdnImage } from "@/components/ui/cdn-image";
import { Reveal } from "@/components/ui/reveal";
import { ProjectTitleTexture } from "./project-title-texture";
import { isSafariBrowser } from "@/utils/is-safari-browser";
import styles from "./project-hero.responsive.module.css";

gsap.registerPlugin(ScrollTrigger);

type ProjectHeroImage = {
  alt: string;
  src: ImageProps["src"];
};

export type ProjectHeroMedia = {
  background: ProjectHeroImage;
  continuation: ProjectHeroImage;
  foreground?: ProjectHeroImage;
  objectPosition?: {
    desktop?: string;
    mobile?: string;
    tablet?: string;
  };
  scale?: {
    continuation?: number;
    desktop?: number;
    mobile?: number;
    tablet?: number;
  };
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
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const continuationStatementRef = useRef<HTMLDivElement | null>(null);
  const foregroundRef = useRef<HTMLDivElement | null>(null);
  const sequenceRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const objectPosition = media.objectPosition;
  const titleLines =
    layout === "nayan"
      ? ["Nayan", "Villas"]
      : layout === "el-salva"
        ? ["Villa", "El Salva"]
        : null;
  const stageStyle = {
    "--continuation-media-scale": media.scale?.continuation ?? 1,
    "--hero-media-scale-desktop": media.scale?.desktop ?? 1,
    "--hero-media-scale-mobile":
      media.scale?.mobile ?? media.scale?.tablet ?? 1,
    "--hero-media-scale-tablet":
      media.scale?.tablet ?? media.scale?.desktop ?? 1,
    "--hero-object-position-desktop": objectPosition?.desktop ?? "50% 50%",
    "--hero-object-position-mobile":
      objectPosition?.mobile ?? objectPosition?.tablet ?? "50% 50%",
    "--hero-object-position-tablet":
      objectPosition?.tablet ?? objectPosition?.desktop ?? "50% 50%",
  } as CSSProperties;

  useLayoutEffect(() => {
    const sequence = sequenceRef.current;
    const background = backgroundRef.current;
    const backgroundImage = backgroundImageRef.current;
    const continuationStatement = continuationStatementRef.current;
    const foreground = foregroundRef.current;
    const title = titleRef.current;
    const hasStitchedContinuation = sequence?.dataset.heroLayout !== "default";

    if (
      !sequence ||
      !background ||
      !backgroundImage ||
      !continuationStatement ||
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
            mobile: "(max-width: 1023px)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (matchContext) => {
            const conditions = matchContext.conditions as {
              desktop: boolean;
              mobile: boolean;
              reduceMotion: boolean;
            };
            const animatedMedia = [background, foreground, title].filter(
              Boolean,
            );

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
            if (conditions.mobile || isSafariBrowser()) {
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

            const heroMediaLayers = [background, foreground].filter(Boolean);
            const mediaShift = hasStitchedContinuation
              ? conditions.desktop
                ? 8
                : 4
              : conditions.desktop
                ? 4
                : 2;

            timeline.to(
              heroMediaLayers,
              {
                // The background and foreground are two crops of the same
                // source composition. Moving them as a single transform group
                // keeps every pixel aligned throughout the parallax motion.
                // Stitched heroes also grow by the translation amount so their
                // lower edge stays locked to the static continuation image.
                scaleY: hasStitchedContinuation ? 1 + mediaShift / 100 : 1,
                transformOrigin: "50% 0%",
                yPercent: -mediaShift,
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
      style={stageStyle}
    >
      <section
        aria-labelledby="project-hero-title"
        className={styles.hero}
        data-project-hero
      >
        <div className={styles.heroVisualStage}>
          <div
            className={`${styles.heroMediaLayer} ${styles.heroBackgroundMedia}`}
            data-hero-background
            ref={backgroundRef}
          >
            <CdnImage
              alt={media.background.alt}
              className={styles.heroMediaImage}
              fill
              loading="eager"
              preload
              ref={backgroundImageRef}
              sizes="100vw"
              src={media.background.src}
            />
          </div>

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

          {media.foreground ? (
            <div
              aria-hidden="true"
              className={`${styles.heroMediaLayer} ${styles.heroForegroundMedia}`}
              data-hero-foreground
              ref={foregroundRef}
            >
              <CdnImage
                alt={media.foreground.alt}
                className={styles.heroMediaImage}
                fill
                sizes="100vw"
                src={media.foreground.src}
              />
            </div>
          ) : null}
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
      </section>

      <section
        aria-label="Project introduction"
        className={styles.continuation}
        data-project-hero-continuation
      >
        <div className={styles.continuationMedia} data-continuation-media>
          <CdnImage
            alt={media.continuation.alt}
            className={styles.continuationImage}
            fill
            sizes="100vw"
            src={media.continuation.src}
          />
        </div>
        <div aria-hidden="true" className={styles.continuationShade} />

        <div
          className={styles.continuationContent}
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
