import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionRevealOptions = {
  duration?: number;
  groupTrigger?: HTMLElement;
  selector?: string;
  start?: string;
  stagger?: number;
  y?: number;
};

export function setupSectionReveals(
  section: HTMLElement,
  {
    duration = 0.8,
    groupTrigger,
    selector = "[data-reveal-child]",
    start = "top 84%",
    stagger = 0,
    y = 22,
  }: SectionRevealOptions = {},
) {
  const revealChildren = gsap.utils.toArray<HTMLElement>(selector, section);

  if (revealChildren.length === 0) {
    return () => {};
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealChildren.forEach((child) => {
      child.dataset.revealInitialized = "";
    });
    gsap.set(revealChildren, {
      clearProps: "opacity,visibility,transform",
    });
    return () => {};
  }

  gsap.set(revealChildren, { autoAlpha: 0, y });
  revealChildren.forEach((child) => {
    child.dataset.revealInitialized = "";
  });

  if (groupTrigger) {
    let tween: gsap.core.Tween | null = null;
    const trigger = ScrollTrigger.create({
      trigger: groupTrigger,
      start,
      once: true,
      onEnter: () => {
        tween = gsap.to(
          revealChildren,
          {
            autoAlpha: 1,
            clearProps: "opacity,visibility,transform",
            duration,
            ease: "power3.out",
            stagger,
            y: 0,
          },
        );
      },
    });

    return () => {
      trigger.kill();
      tween?.kill();
      gsap.set(revealChildren, {
        clearProps: "opacity,visibility,transform",
      });
    };
  }

  const tweens: gsap.core.Tween[] = [];
  const triggers = revealChildren.map((child) =>
    ScrollTrigger.create({
      trigger: child,
      start,
      once: true,
      onEnter: () => {
        tweens.push(
          gsap.to(child, {
            autoAlpha: 1,
            clearProps: "opacity,visibility,transform",
            duration,
            ease: "power3.out",
            y: 0,
          }),
        );
      },
    }),
  );

  return () => {
    triggers.forEach((trigger) => trigger.kill());
    tweens.forEach((tween) => tween.kill());
    gsap.set(revealChildren, { clearProps: "opacity,visibility,transform" });
  };
}
