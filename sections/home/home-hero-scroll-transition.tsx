"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./textured-hero-section.responsive.module.css";

gsap.registerPlugin(ScrollTrigger);

type HomeHeroScrollTransitionProps = {
  children: ReactNode;
};

const finalWidthRem = 67;
const finalHeightRem = 37.25;
const finalWidthViewportRatio = finalWidthRem / 90;
const finalHeightViewportRatio = finalHeightRem / 56.25;

export function HomeHeroScrollTransition({
  children,
}: HomeHeroScrollTransitionProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const screen = stage.querySelector<HTMLElement>("[data-hero-screen]");
    const grid = stage.querySelector<HTMLElement>("[data-hero-floating-grid]");

    if (!screen || !grid) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(grid, { autoAlpha: 1 });
      gsap.set(screen, {
        height: "100%",
        width: "100%",
        xPercent: -50,
        yPercent: -50,
      });

      gsap.timeline({
        scrollTrigger: {
          end: "bottom bottom",
          invalidateOnRefresh: true,
          scrub: 0.35,
          start: "top top",
          trigger: stage,
        },
      })
        .to(screen, {
          duration: 1,
          ease: "none",
          width: () => {
            const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
            return Math.min(
              finalWidthRem * rootFontSize,
              window.innerWidth * finalWidthViewportRatio,
            );
          },
          height: () => {
            const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
            return Math.min(
              finalHeightRem * rootFontSize,
              window.innerHeight * finalHeightViewportRatio,
            );
          },
        }, 0);
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.scrollStage} ref={stageRef}>
      <div className={styles.stickyViewport}>{children}</div>
    </div>
  );
}
