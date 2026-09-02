import gsap from "gsap";
import { addCrosshair } from "@/lib/animations/crosshair";

const revealSelector = "[data-editorial-hero-reveal]";

export function addEditorialHeroReveal(
  timeline: gsap.core.Timeline,
  root: HTMLElement,
  at = 0,
) {
  const crosshair = root.querySelector<HTMLElement>("[data-section-crosshair]");
  const copy = Array.from(
    root.querySelectorAll<HTMLElement>(revealSelector),
  );

  gsap.set(copy, { autoAlpha: 0, y: 18 });

  if (crosshair) {
    addCrosshair(timeline, crosshair, at);
  }

  timeline.to(copy, {
    autoAlpha: 1,
    clearProps: "opacity,visibility,transform",
    duration: 0.58,
    ease: "power3.out",
    stagger: 0.07,
    y: 0,
  }, at + 0.42);
}

export function showEditorialHeroFinalState(root: HTMLElement) {
  const crosshair = root.querySelector<HTMLElement>("[data-section-crosshair]");
  const marker = crosshair?.querySelector<HTMLElement>(
    "[data-crosshair-marker]",
  );

  gsap.set(crosshair?.querySelectorAll("i") ?? [], {
    autoAlpha: 1,
    scaleX: 1,
    scaleY: 1,
  });
  if (marker) {
    gsap.set(marker, { autoAlpha: 1, scale: 1 });
  }
  gsap.set(root.querySelectorAll(revealSelector), { autoAlpha: 1, y: 0 });
}
