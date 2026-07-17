"use client";

import { ArchitecturalStairs } from "@/components/ArchitecturalStairs";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setupSectionReveals } from "@/utils/setup-section-reveals";

gsap.registerPlugin(ScrollTrigger);

const texturePath = "/assets/textures/concrete-background-textures-09-1.svg";
const orangeBlockPath = "/assets/blocks/orange-block.svg";

export function LegacySection() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('[data-section="legacy"]');

    if (!section) {
      return;
    }

    const cleanupReveals = setupSectionReveals(section);
    const stairs = gsap.utils.toArray<HTMLElement>(
      "[data-architectural-stair]",
      section,
    );

    if (stairs.length === 0) {
      return cleanupReveals;
    }

    gsap.set(stairs, { autoAlpha: 0, y: 20 });

    const stairTimeline = gsap.timeline({
      paused: true,
      defaults: {
        duration: 0.78,
        ease: "power3.out",
      },
    });

    stairTimeline.to(stairs, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.08,
    });

    const stairTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 68%",
      once: true,
      onEnter: () => {
        stairTimeline.play(0);
      },
    });

    ScrollTrigger.refresh();

    return () => {
      cleanupReveals();
      stairTrigger.kill();
      stairTimeline.kill();
      gsap.set(stairs, { clearProps: "opacity,visibility,transform" });
    };
  }, []);

  return (
    <section
      aria-labelledby="legacy-section-title"
      className="relative isolate overflow-hidden bg-[#b9b9b9] text-[#232323]"
      data-section="legacy"
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
          <div className="absolute inset-0 bg-[#b9b9b9]" data-legacy-background-fill />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-multiply"
            data-legacy-background-texture
            style={{ backgroundImage: `url("${texturePath}")` }}
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
            <a
              href="#projects"
              className="mt-[clamp(1.75rem,2.7vw,2.5rem)] inline-flex h-[3.125rem] w-[11rem] items-center justify-between bg-[#464646] px-3 font-display text-[0.95rem] text-bone"
              data-legacy-cta
            >
              View All Projects
              <span aria-hidden="true" className="translate-y-[0.1rem] text-lg">
                &rsaquo;
              </span>
            </a>
          </div>
        </div>

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
            className="font-display text-[clamp(2rem,3.5vw,3rem)] font-normal uppercase leading-none tracking-[0.04em] text-bone"
            data-legacy-title
          >
            PRESERVING GOA&apos;S LEGACY
          </p>
        </div>

        <div
          className="absolute inset-0 z-40"
          data-reveal-child
          data-legacy-reveal="4"
          data-legacy-marker-layer
        >
          <div
            aria-hidden="true"
            className="absolute left-[5.28%] top-[77.5%] size-[clamp(18px,2vw,28px)] bg-cover bg-center"
            data-legacy-orange-square="left"
            style={{ backgroundImage: `url("${orangeBlockPath}")` }}
          />
          <div
            aria-hidden="true"
            className="absolute right-[5.28%] top-[77.5%] size-[clamp(18px,2vw,28px)] bg-cover bg-center"
            data-legacy-orange-square="right"
            style={{ backgroundImage: `url("${orangeBlockPath}")` }}
          />
        </div>
      </div>
    </section>
  );
}
