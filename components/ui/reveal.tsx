"use client";

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { isSafariBrowser } from "@/utils/is-safari-browser";

gsap.registerPlugin(ScrollTrigger);

type RevealElement = keyof JSX.IntrinsicElements;

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealElement;
  children?: ReactNode;
  delay?: number;
  duration?: number;
  fade?: boolean;
  onRevealComplete?: () => void;
  revealMode?: "manual" | "mount" | "scroll";
  revealId?: string;
  start?: string;
  triggerClosest?: string;
  triggerSelector?: string;
  y?: number;
};

export function Reveal({
  as: Component = "div",
  children,
  className,
  delay = 0,
  duration = 0.78,
  fade = true,
  onRevealComplete,
  revealMode = "scroll",
  revealId,
  start = "top 84%",
  style,
  triggerClosest,
  triggerSelector,
  y = 22,
  ...props
}: RevealProps) {
  const pathname = usePathname();
  const elementRef = useRef<HTMLElement | null>(null);
  const setElementRef = (node: HTMLElement | null) => {
    elementRef.current = node;
  };

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (revealMode === "manual") {
      element.dataset.revealInitialized = "";

      return () => {
        gsap.set(element, {
          clearProps: "opacity,visibility,transform",
        });
      };
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.dataset.revealInitialized = "";
      gsap.set(element, {
        clearProps: "opacity,visibility,transform",
      });
      onRevealComplete?.();
      return;
    }

    let tween: gsap.core.Tween | null = null;
    const useLightweightMotion =
      isSafariBrowser() ||
      window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const effectiveDelay = useLightweightMotion ? Math.min(delay, 0.12) : delay;
    const effectiveDuration = useLightweightMotion
      ? Math.min(duration, 0.5)
      : duration;
    const effectiveY = useLightweightMotion
      ? Math.sign(y) * Math.min(Math.abs(y), 14)
      : y;
    const effectiveStart = useLightweightMotion
      ? start.replace(/^top\s+(\d+)%$/, (_, percentage: string) =>
          `top ${Math.max(Number(percentage), 90)}%`,
        )
      : start;

    gsap.set(element, fade ? { autoAlpha: 0, y: effectiveY } : { y: effectiveY });
    element.dataset.revealInitialized = "";

    const ctx = gsap.context(() => {
      const reveal = () => {
        tween = gsap.to(
          element,
          {
            ...(fade ? { autoAlpha: 1 } : {}),
            y: 0,
            delay: effectiveDelay,
            duration: effectiveDuration,
            ease: "power3.out",
            clearProps: fade
              ? "opacity,visibility,transform"
              : "transform",
            onComplete: onRevealComplete,
          },
        );
      };

      if (revealMode === "mount") {
        reveal();
        return;
      }

      const trigger = triggerSelector
        ? document.querySelector<HTMLElement>(triggerSelector) ?? element
        : triggerClosest
          ? element.closest<HTMLElement>(triggerClosest) ?? element
          : element;

      ScrollTrigger.create({
        trigger,
        start: effectiveStart,
        once: true,
        onEnter: reveal,
      });
    }, element);

    return () => {
      tween?.kill();
      ctx.revert();
      gsap.set(element, {
        clearProps: "opacity,visibility,transform",
      });
    };
  }, [
    delay,
    duration,
    fade,
    onRevealComplete,
    revealMode,
    start,
    triggerClosest,
    triggerSelector,
    y,
    pathname,
  ]);

  const revealProps = {
    className,
    "data-reveal": true,
    "data-reveal-fade": fade ? "true" : undefined,
    "data-reveal-id": revealId,
    style: {
      "--reveal-y": `${y}px`,
      ...style,
    } as CSSProperties,
    ...props,
  };

  if (Component === "figure") {
    return (
      <figure ref={setElementRef} {...revealProps}>
        {children}
      </figure>
    );
  }

  return (
    <div ref={setElementRef} {...revealProps}>
      {children}
    </div>
  );
}
