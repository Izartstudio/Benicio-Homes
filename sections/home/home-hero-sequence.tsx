"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  addEditorialHeroReveal,
  showEditorialHeroFinalState,
} from "@/lib/animations/editorial-hero";
import { HeroFinalComposition } from "./hero-final-composition";
import {
  HeroShrinkingGallery,
  type HeroImage,
} from "./hero-shrinking-gallery";
import styles from "./textured-hero-section.responsive.module.css";

type HomeHeroSequenceProps = {
  images: readonly HeroImage[];
};

const imageStep = 0.09;
const finalImageRatio = 0.23;

function getImageSizeRatio(index: number, imageCount: number) {
  if (imageCount <= 1) {
    return 1;
  }

  const progress = index / (imageCount - 1);
  return 1 - (1 - finalImageRatio) * progress;
}

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
    const finalComposition = root.querySelector<HTMLElement>(
      "[data-editorial-hero]",
    );

    if (!frame || !imageLayers.length || !orangeImage || !finalComposition) {
      return;
    }

    const frameBounds = frame.getBoundingClientRect();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.set(imageLayers, { autoAlpha: 0 });
      gsap.set(imageLayers[0], { autoAlpha: 1 });
      gsap.set(orangeImage, { autoAlpha: 0 });

      if (reducedMotion) {
        gsap.set(frame, { height: 29, width: 29 });
        gsap.set(imageLayers, { autoAlpha: 0 });
        gsap.set(orangeImage, { autoAlpha: 1 });
        showEditorialHeroFinalState(finalComposition);
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      imageLayers.slice(1).forEach((image, index) => {
        const nextIndex = index + 1;
        const ratio = getImageSizeRatio(nextIndex, imageLayers.length);
        const at = nextIndex * imageStep;

        timeline
          .to(frame, {
            duration: imageStep,
            ease: "none",
            height: frameBounds.height * ratio,
            width: frameBounds.width * ratio,
          }, at)
          .to(imageLayers[nextIndex - 1], {
            autoAlpha: 0,
            duration: imageStep,
            ease: "none",
          }, at)
          .to(image, {
            autoAlpha: 1,
            duration: imageStep,
            ease: "none",
          }, at);
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
      addEditorialHeroReveal(timeline, finalComposition, linesAt);
    }, root);

    return () => ctx.revert();
  }, [images]);

  return (
    <div className={styles.sequenceRoot} ref={rootRef}>
      <HeroFinalComposition />
      <HeroShrinkingGallery images={images} />
    </div>
  );
}
