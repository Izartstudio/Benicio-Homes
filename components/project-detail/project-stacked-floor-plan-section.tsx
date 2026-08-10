"use client";

import type { ProjectFloorPlanData } from "@/app/projects/data";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArchitecturalStairs } from "@/components/ArchitecturalStairs";
import { CdnImage } from "@/components/ui/cdn-image";
import { Reveal } from "@/components/ui/reveal";
import { PDP_MEDIA_URLS, PDP_TEXTURE_URL } from "./pdp-texture";
import styles from "./project-stacked-floor-plan-section.module.css";

gsap.registerPlugin(ScrollTrigger);

type ProjectStackedFloorPlanSectionProps = {
  plans: readonly ProjectFloorPlanData[];
  variant: "stacked-two" | "stacked-three";
};

function StackedSpecifications({
  plan,
  planIndex,
}: {
  plan: ProjectFloorPlanData;
  planIndex: number;
}) {
  return (
    <Reveal
      className={styles.specifications}
      delay={0.2}
      fade={false}
      revealId={`stacked-floor-plan-specifications-${planIndex}`}
      start="top 80%"
      triggerClosest="[data-stacked-floor-plan-item]"
      y={16}
    >
      <dl>
        {plan.specifications.map((specification, specificationIndex) => (
          <div className={styles.specificationRow} key={specification.label}>
            <dt>{specification.label}</dt>
            <dd>{specification.value}</dd>
            {specificationIndex < plan.specifications.length - 1 ? (
              <span aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

function StackedCopy({
  plan,
  planIndex,
}: {
  plan: ProjectFloorPlanData;
  planIndex: number;
}) {
  return (
    <Reveal
      className={styles.copy}
      delay={0.12}
      fade={false}
      revealId={`stacked-floor-plan-copy-${planIndex}`}
      start="top 80%"
      triggerClosest="[data-stacked-floor-plan-item]"
      y={16}
    >
      <p>{plan.description}</p>
    </Reveal>
  );
}

export function ProjectStackedFloorPlanSection({
  plans,
  variant,
}: ProjectStackedFloorPlanSectionProps) {
  const pathname = usePathname();
  const expectedCount = variant === "stacked-three" ? 3 : 2;
  const visiblePlans = plans.slice(0, expectedCount);
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const lines = gsap.utils.toArray<HTMLElement>(
      "[data-stacked-floor-plan-marker-line]",
      section,
    );
    const stairs = section.querySelector<HTMLElement>(
      "[data-stacked-floor-plan-stairs]",
    );
    const drawings = gsap.utils.toArray<HTMLElement>(
      "[data-stacked-floor-plan-drawing]",
      section,
    );

    if (lines.length === 0) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(lines, { scaleY: 1 });
      if (stairs) gsap.set(stairs, { autoAlpha: 1, y: 0 });
      gsap.set(drawings, { clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const context = gsap.context(() => {
      if (stairs) gsap.set(stairs, { autoAlpha: 0, y: 20 });

      if (stairs) {
        gsap.to(stairs, {
          autoAlpha: 1,
          duration: 0.78,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
          y: 0,
        });
      }

      lines.forEach((line) => {
        const item = line.closest<HTMLElement>(
          "[data-stacked-floor-plan-item]",
        );

        if (!item) {
          return;
        }

        gsap.set(line, {
          scaleY: 0,
          transformOrigin: "top center",
        });

        const drawing = item.querySelector<HTMLElement>(
          "[data-stacked-floor-plan-drawing]",
        );

        if (drawing) {
          gsap.set(drawing, { clipPath: "inset(100% 0% 0% 0%)" });
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            once: true,
          },
        });

        timeline.to(line, {
          duration: 1.65,
          ease: "power2.inOut",
          scaleY: 1,
        });

        if (drawing) {
          timeline.to(
            drawing,
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.95,
              ease: "power2.inOut",
            },
            0.72,
          );
        }
      });
    }, section);

    return () => {
      context.revert();
    };
  }, [pathname]);

  return (
    <section
      aria-label="Project floor plans"
      className={styles.section}
      data-floor-plan-layout={variant}
      data-project-stacked-floor-plan-section
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className={styles.texture}
        data-project-stacked-floor-plan-background-texture
        style={{ backgroundImage: `url('${PDP_TEXTURE_URL}')` }}
      />

      <div
        aria-hidden="true"
        className={styles.stairs}
        data-stacked-floor-plan-stairs
        style={
          {
            "--stacked-floor-plan-concrete": `url('${PDP_MEDIA_URLS.concreteTexture}')`,
          } as CSSProperties
        }
      >
        <ArchitecturalStairs
          className="[&>[data-stair-index='1']]:left-0 [&>[data-stair-index='1']]:top-0 [&>[data-stair-index='1']]:h-full [&>[data-stair-index='1']]:w-[1.3889%] [&>[data-stair-index='2']]:left-0 [&>[data-stair-index='2']]:top-0 [&>[data-stair-index='2']]:h-[39.726%] [&>[data-stair-index='2']]:w-[20.3472%] [&>[data-stair-index='3']]:left-0 [&>[data-stair-index='3']]:top-0 [&>[data-stair-index='3']]:h-[24.3836%] [&>[data-stair-index='3']]:w-[65.8333%] [&>[data-stair-index='4']]:left-0 [&>[data-stair-index='4']]:top-0 [&>[data-stair-index='4']]:h-[15.3425%] [&>[data-stair-index='4']]:w-[72.2917%]"
          stairClassName="bg-transparent"
          variant="ascending"
        />
      </div>

      <div className={styles.items}>
        {visiblePlans.map((plan, planIndex) => {
          const reverseSides = planIndex > 0;

          return (
            <article
              aria-labelledby={`stacked-floor-plan-title-${planIndex}`}
              className={styles.item}
              data-content-order={reverseSides ? "reverse" : "default"}
              data-stacked-floor-plan-item
              key={`${plan.villaLabel}-${planIndex}`}
            >
              <div className={styles.leftContent}>
                {reverseSides ? (
                  <StackedSpecifications plan={plan} planIndex={planIndex} />
                ) : (
                  <StackedCopy plan={plan} planIndex={planIndex} />
                )}
              </div>

              <div className={styles.planStage}>
                <div aria-hidden="true" className={styles.marker}>
                  <span
                    className={styles.markerLine}
                    data-stacked-floor-plan-marker-line
                  />
                  <span className={styles.markerSquare} />
                </div>

                <div className={styles.planTitle}>
                  <Reveal
                    delay={0.18}
                    fade={false}
                    revealId={`stacked-floor-plan-title-${planIndex}`}
                    start="top 80%"
                    triggerClosest="[data-stacked-floor-plan-item]"
                    y={10}
                  >
                    <h3 id={`stacked-floor-plan-title-${planIndex}`}>
                      {plan.villaLabel}
                    </h3>
                  </Reveal>
                </div>

                <Reveal
                  className={styles.drawing}
                  data-stacked-floor-plan-drawing
                  fade={false}
                  revealId={`stacked-floor-plan-drawing-${planIndex}`}
                  revealMode="manual"
                  y={0}
                >
                  <CdnImage
                    alt={plan.leftDrawing.alt}
                    className="object-contain mix-blend-multiply"
                    fill
                    sizes="(min-width: 1024px) 720px, 92vw"
                    src={plan.leftDrawing.src}
                  />
                </Reveal>

                <div className={styles.footerMarker}>
                  <span>{plan.footerLabel}</span>
                  <i aria-hidden="true" />
                </div>
              </div>

              <div className={styles.rightContent}>
                {reverseSides ? (
                  <StackedCopy plan={plan} planIndex={planIndex} />
                ) : (
                  <StackedSpecifications plan={plan} planIndex={planIndex} />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
