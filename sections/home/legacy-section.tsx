"use client";

import responsiveStyles from "./legacy-section.responsive.module.css";
import { ArchitecturalStairs } from "@/components/ArchitecturalStairs";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CTA } from "@/components/ui/cta";
import { setupSectionReveals } from "@/utils/setup-section-reveals";
import { OrangeBlock } from "@/components/ui/orange-block";

gsap.registerPlugin(ScrollTrigger);


export function LegacySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let cleanupReveals = () => {};
    let stairs: HTMLElement[] = [];
    const ctx = gsap.context(() => {
      cleanupReveals = setupSectionReveals(section);
      stairs = gsap.utils.toArray<HTMLElement>(
        "[data-architectural-stair]",
        section,
      );

      if (stairs.length === 0) {
        return;
      }

      gsap.set(stairs, { autoAlpha: 0, y: 20 });
      stairs.forEach((stair) => {
        stair.dataset.revealInitialized = "";
      });

      const stairTimeline = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.78,
          ease: "power3.out",
        },
      });

      stairTimeline.to(
        stairs,
        {
          autoAlpha: 1,
          clearProps: "opacity,visibility,transform",
          stagger: 0.08,
          y: 0,
        },
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top 68%",
        once: true,
        onEnter: () => {
          stairTimeline.play(0);
        },
      });
    }, section);

    return () => {
      cleanupReveals();
      ctx.revert();
      gsap.set(stairs, { clearProps: "opacity,visibility,transform" });
    };
  }, []);

  return (
    <section
      aria-labelledby="legacy-section-title"
      className={`relative isolate overflow-hidden bg-[#2d2d2d] text-[#1A1A1A] ${responsiveStyles.responsiveRoot}`}
      data-section="legacy"
      ref={sectionRef}
    >
      <div
        className="relative min-h-[clamp(40rem,53.333vw,48rem)]"
        data-legacy-canvas
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          data-legacy-background-layer
        >
          <div className="absolute inset-0 bg-[#2d2d2d]" data-legacy-background-fill />
          <Image
            src="/assets/textures/cta-section-texture.webp"
            alt=""
            aria-hidden="true"
            width={1440}
            height={411}
            draggable={false}
            unoptimized
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover opacity-100 [-webkit-user-drag:none]"
            data-legacy-background-texture
          />
        </div>

        <div
          className="relative z-30 grid grid-cols-[1fr_28.4%] px-[5.28%] pt-[clamp(3rem,5vw,4.5rem)]"
          data-reveal-child
          data-legacy-reveal="1"
          data-legacy-intro
        >
          <h2
            id="legacy-section-title"
            className="max-w-[34rem] whitespace-pre-line font-display text-[clamp(1.7rem,2.45vw,2.25rem)] font-normal leading-[1.38] tracking-[0.015em]"
            data-legacy-heading
          >
            {"Built For The Place.\nDesigned For Life."}
          </h2>

          <div className="relative pl-[1.15%]" data-legacy-copy-group>
            <div
              aria-hidden="true"
              className="absolute bottom-[-3.5rem] left-0 top-[-4.5rem] w-px bg-[linear-gradient(90deg,#b9b9b9_0%,rgba(83,83,83,0)_100%)]"
              data-legacy-vertical-divider
            />
            <p
              className="max-w-[22rem] font-display text-[clamp(0.9rem,1.1vw,1rem)] leading-[1.42]"
              data-legacy-copy
            >
              Great homes are measured by how they are lived in, not simply how
              they are seen. We create developments where architecture,
              landscape, and everyday living come together to leave a lasting
              legacy.
            </p>
            <CTA
              arrowClassName="translate-y-[0.1rem] text-lg"
              className="mt-[clamp(1.75rem,2.7vw,2.5rem)] inline-flex h-[3.125rem] w-[11rem] items-center justify-between px-3 font-display text-[0.95rem]"
              darkBackground="#464646"
              data-legacy-cta
              href="/#featured-projects-title"
              variant="dark"
            >
              View All Projects
            </CTA>
          </div>
        </div>

        <div
          className={responsiveStyles.legacyStage}
          data-legacy-stage
        >
          <div
            className="absolute inset-0 z-10"
            data-legacy-reveal="2"
            data-legacy-staircase
          >
            <ArchitecturalStairs
              variant="descending"
              stairClassName="bg-[#2D2D2D]"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 top-[76%] z-30 text-center"
            data-reveal-child
            data-legacy-reveal="3"
          >
            <p
            className="font-display text-[clamp(2rem,3.5vw,48px)] font-normal uppercase leading-normal tracking-[0.04em] text-[#eee] lg:text-[48px]"
              data-legacy-title
            >
              PRESERVING GOA&apos;S LEGACY
            </p>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-40"
            data-reveal-child
            data-legacy-reveal="4"
            data-legacy-marker-layer
          >
            <OrangeBlock
              className="absolute left-[5.28%] top-[77.5%]"
              data-legacy-orange-square="left"
            />
            <OrangeBlock
              className="absolute right-[5.28%] top-[77.5%]"
              data-legacy-orange-square="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
