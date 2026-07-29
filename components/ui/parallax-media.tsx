"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils/cn";
import { isSafariBrowser } from "@/utils/is-safari-browser";

gsap.registerPlugin(ScrollTrigger);

type ParallaxMediaProps = {
  amount?: number;
  children: ReactNode;
  className?: string;
  trigger?: string;
};

/** A clipped media layer with deliberately small, desktop-only scroll parallax. */
export function ParallaxMedia({
  amount = 4,
  children,
  className,
  trigger,
}: ParallaxMediaProps) {
  const mediaRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const media = mediaRef.current;

    if (!media) {
      return;
    }

    if (isSafariBrowser()) {
      return;
    }

    const scope = media.parentElement;
    const matchMedia = gsap.matchMedia();

    matchMedia.add(
      {
        desktop:
          "(min-width: 768px) and (hover: hover) and (pointer: fine)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { desktop, reduce } = context.conditions as {
          desktop: boolean;
          reduce: boolean;
        };

        if (!desktop || reduce) {
          return;
        }

        const scrollTrigger = trigger
          ? scope?.closest<HTMLElement>(trigger) ?? scope
          : scope;

        if (!scrollTrigger) {
          return;
        }

        const tween = gsap.fromTo(
          media,
          { yPercent: -amount },
          {
            ease: "none",
            scrollTrigger: {
              end: "bottom top",
              invalidateOnRefresh: true,
              onEnter: () => {
                media.style.willChange = "transform";
              },
              onEnterBack: () => {
                media.style.willChange = "transform";
              },
              onLeave: () => {
                media.style.willChange = "";
              },
              onLeaveBack: () => {
                media.style.willChange = "";
              },
              scrub: 0.2,
              start: "top bottom",
              trigger: scrollTrigger,
            },
            yPercent: amount,
          },
        );

        return () => {
          tween.kill();
          media.style.willChange = "";
        };
      },
    );

    return () => {
      matchMedia.revert();
    };
  }, [amount, trigger]);

  return (
    <div className={cn("absolute inset-x-0 -bottom-[6%] -top-[6%]", className)} ref={mediaRef}>
      {children}
    </div>
  );
}
