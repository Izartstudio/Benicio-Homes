"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SectionCrosshair } from "@/components/ui/section-crosshair";
import { addCrosshair } from "@/lib/animations/crosshair";
import { HeroFinalComposition } from "./hero-final-composition";
import {
  HeroShrinkingGallery,
  type HeroImage,
} from "./hero-shrinking-gallery";
import styles from "./textured-hero-section.responsive.module.css";

type HomeHeroSequenceProps = {
  images: readonly HeroImage[];
};

const imageStep = 0.15;
const sizeRatios = [1, 0.78, 0.58, 0.4, 0.23] as const;

export function HomeHeroSequence({ images }: HomeHeroSequenceProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const frame = root.querySelector<HTMLElement>("[data-hero-sequence-frame]");
    const imageLayers = Array.from(
      root.querySelectorAll<HTMLElement>("[data-hero-sequence-image]"),
    );
    const orangeImage = root.querySelector<HTMLElement>("[data-hero-orange-image]");
    const crosshair = root.querySelector<HTMLElement>("[data-section-crosshair]");
    const copy = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-copy]"));

    if (!frame || !imageLayers.length || !orangeImage || !crosshair) {
      return;
    }

    const frameBounds = frame.getBoundingClientRect();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.set(imageLayers, { autoAlpha: 0 });
      gsap.set(imageLayers[0], { autoAlpha: 1 });
      gsap.set(orangeImage, { autoAlpha: 0 });
      gsap.set(copy, { autoAlpha: 0, y: 14 });

      if (reducedMotion) {
        gsap.set(frame, { height: 29, width: 29 });
        gsap.set(imageLayers, { autoAlpha: 0 });
        gsap.set(orangeImage, { autoAlpha: 1 });
        gsap.set(crosshair.querySelectorAll("i"), { scaleX: 1, scaleY: 1 });
        gsap.set(copy, { autoAlpha: 1, y: 0 });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      imageLayers.slice(1).forEach((image, index) => {
        const nextIndex = index + 1;
        const ratio = sizeRatios[nextIndex] ?? Math.max(0.16, 1 - nextIndex * 0.2);
        const at = nextIndex * imageStep;

        timeline
          .to(frame, {
            duration: 0.22,
            height: frameBounds.height * ratio,
            width: frameBounds.width * ratio,
          }, at)
          .to(imageLayers[nextIndex - 1], {
            autoAlpha: 0,
            duration: 0.1,
          }, at)
          .to(image, {
            autoAlpha: 1,
            duration: 0.12,
          }, at + 0.02);
      });

      const orangeAt = imageLayers.length * imageStep;
      const lastImage = imageLayers.at(-1)!;

      timeline
        .to(frame, {
          duration: 0.24,
          ease: "power3.inOut",
          height: 29,
          top: "50%",
          width: 29,
        }, orangeAt)
        .to(lastImage, { autoAlpha: 0, duration: 0.1 }, orangeAt)
        .to(orangeImage, { autoAlpha: 1, duration: 0.12 }, orangeAt + 0.03);

      const linesAt = orangeAt + 0.3;
      addCrosshair(timeline, crosshair, linesAt);
      timeline.to(copy, {
        autoAlpha: 1,
        duration: 0.28,
        ease: "power3.out",
        stagger: 0.14,
        y: 0,
      }, linesAt + 0.4);
    }, root);

    return () => ctx.revert();
  }, [images]);

  return (
    <div className={styles.sequenceRoot} ref={rootRef}>
      <SectionCrosshair className={styles.heroCrosshair} />
      <HeroShrinkingGallery images={images} />
      <HeroFinalComposition />
    </div>
  );
}
