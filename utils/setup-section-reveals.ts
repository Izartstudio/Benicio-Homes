import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionRevealOptions = {
  duration?: number;
  selector?: string;
  start?: string;
  y?: number;
};

export function setupSectionReveals(
  section: HTMLElement,
  {
    duration = 0.8,
    selector = "[data-reveal-child]",
    start = "top 84%",
    y = 22,
  }: SectionRevealOptions = {},
) {
  const revealChildren = gsap.utils.toArray<HTMLElement>(selector, section);

  if (revealChildren.length === 0) {
    return () => {};
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(revealChildren, { autoAlpha: 1, y: 0 });
    return () => {};
  }

  gsap.set(revealChildren, { autoAlpha: 0, y });

  const triggers = revealChildren.map((child) =>
    ScrollTrigger.create({
      trigger: child,
      start,
      once: true,
      onEnter: () => {
        gsap.to(child, {
          autoAlpha: 1,
          clearProps: "transform",
          duration,
          ease: "power3.out",
          y: 0,
        });
      },
    }),
  );

  ScrollTrigger.refresh();

  return () => {
    triggers.forEach((trigger) => trigger.kill());
    gsap.set(revealChildren, { clearProps: "opacity,visibility,transform" });
  };
}
