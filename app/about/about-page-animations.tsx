"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addCrosshair } from "@/lib/animations/crosshair";
import { addEditorialHeroReveal } from "@/lib/animations/editorial-hero";

gsap.registerPlugin(ScrollTrigger);

const revealFrom = { autoAlpha: 0, y: 18 } as const;

export function AboutPageAnimations() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-about-practice-root]");

    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animatedElements = Array.from(root.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-section-crosshair] i, [data-crosshair-marker], [data-respect-media-band] > *, [data-horizontal-line-pair] i, [data-architectural-stair]",
    ));

    if (reducedMotion) {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        element.dataset.revealInitialized = "";
      });
      gsap.set(animatedElements, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const hero = root.querySelector<HTMLElement>('[data-section="practice-hero"]');
      const respect = root.querySelector<HTMLElement>('[data-design-source="Section -2about.svg"]');
      const manifesto = root.querySelector<HTMLElement>('[data-design-source="Section -3 about.svg"]');
      const services = root.querySelector<HTMLElement>('[data-design-source="Section -4 about.svg"]');
      const vision = root.querySelector<HTMLElement>('[data-design-source="Section -5 about.svg"]');

      if (hero) {
        const timeline = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.12 });
        addEditorialHeroReveal(timeline, hero);
      }

      if (respect) {
        const heading = respect.querySelector<HTMLElement>("[data-reveal]");
        const bandParts = Array.from(respect.querySelectorAll<HTMLElement>("[data-respect-media-band] > *"));
        const copy = respect.querySelectorAll<HTMLElement>("[data-reveal]")[1];
        const bar = copy?.querySelector<HTMLElement>("span");
        const paragraph = copy?.querySelector<HTMLElement>("p");
        gsap.set(heading, revealFrom);
        gsap.set(bandParts, { autoAlpha: 0, scaleX: 0.94 });
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(paragraph, revealFrom);
        gsap.timeline({
          scrollTrigger: { trigger: respect, start: "top 72%", once: true },
          defaults: { ease: "power3.out" },
        })
          .to(heading, { autoAlpha: 1, clearProps: "opacity,visibility,transform", duration: 0.55, y: 0 })
          .to(bandParts, { autoAlpha: 1, duration: 0.72, scaleX: 1, stagger: 0.055 }, 0.12)
          .to(bar, { duration: 0.45, ease: "power2.out", scaleX: 1 }, 0.38)
          .to(paragraph, { autoAlpha: 1, clearProps: "opacity,visibility,transform", duration: 0.55, y: 0 }, 0.48);
      }

      if (manifesto) {
        const crosshair = manifesto.querySelector<HTMLElement>("[data-section-crosshair]");
        const copy = manifesto.querySelector<HTMLElement>("[data-reveal]");
        const portrait = manifesto.querySelectorAll<HTMLElement>("[data-reveal]")[1];
        const copyChildren = copy ? Array.from(copy.children) as HTMLElement[] : [];
        gsap.set(copyChildren, revealFrom);
        gsap.set(portrait, { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" });
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: manifesto, start: "top 70%", once: true },
          defaults: { ease: "power3.out" },
        });
        if (crosshair) addCrosshair(timeline, crosshair);
        timeline
          .to(copyChildren, { autoAlpha: 1, duration: 0.55, stagger: 0.055, y: 0 }, 0.42)
          .to(portrait, { autoAlpha: 1, clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.inOut" }, 0.34);
      }

      if (services) {
        const linePair = Array.from(services.querySelectorAll<HTMLElement>("[data-horizontal-line-pair] i"));
        const reveals = Array.from(services.querySelectorAll<HTMLElement>("[data-reveal]"));
        const stairs = Array.from(services.querySelectorAll<HTMLElement>("[data-architectural-stair]"));
        const kicker = services.querySelector<HTMLElement>("[class*='servicesKicker']");
        gsap.set(linePair, { scaleX: 0, transformOrigin: (index: number) => index === 0 ? "left center" : "right center" });
        gsap.set(reveals, revealFrom);
        gsap.set(stairs, { autoAlpha: 0, y: 18 });
        gsap.set(kicker, revealFrom);
        gsap.timeline({
          scrollTrigger: { trigger: services, start: "top 70%", once: true },
          defaults: { ease: "power3.out" },
        })
          .to(linePair, { duration: 0.65, scaleX: 1, stagger: 0.06 })
          .to(reveals.slice(0, 2), { autoAlpha: 1, clearProps: "opacity,visibility,transform", duration: 0.65, stagger: 0.08, y: 0 }, 0.12)
          .to(stairs, { autoAlpha: 1, duration: 0.62, stagger: 0.08, y: 0 }, 0.32)
          .to(kicker, { autoAlpha: 1, duration: 0.5, y: 0 }, 0.48)
          .to(reveals.slice(2), { autoAlpha: 1, clearProps: "opacity,visibility,transform", duration: 0.5, stagger: 0.07, y: 0 }, 0.54);
      }

      if (vision) {
        const heading = vision.querySelector<HTMLElement>("[data-reveal]");
        const cards = Array.from(vision.querySelectorAll<HTMLElement>("article[data-reveal]"));
        gsap.set(heading, revealFrom);
        gsap.set(cards, { autoAlpha: 0, y: 24 });
        gsap.timeline({
          scrollTrigger: { trigger: vision, start: "top 72%", once: true },
          defaults: { ease: "power3.out" },
        })
          .to(heading, { autoAlpha: 1, clearProps: "opacity,visibility,transform", duration: 0.58, y: 0 })
          .to(cards, { autoAlpha: 1, clearProps: "opacity,visibility,transform", duration: 0.6, stagger: 0.075, y: 0 }, 0.14);
      }
    }, root);

    return () => {
      ctx.revert();
      gsap.set(animatedElements, { clearProps: "all" });
    };
  }, []);

  return null;
}
