"use client";

import {
  useLayoutEffect,
  useRef,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealElement = keyof JSX.IntrinsicElements;

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: RevealElement;
  children?: ReactNode;
  delay?: number;
  duration?: number;
  revealId?: string;
  y?: number;
};

export function Reveal({
  as: Component = "div",
  children,
  className,
  delay = 0,
  duration = 0.78,
  revealId,
  y = 22,
  ...props
}: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const setElementRef = (node: HTMLElement | null) => {
    elementRef.current = node;
  };

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(element, { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(element, { autoAlpha: 0, y });

      gsap.to(element, {
        autoAlpha: 1,
        y: 0,
        delay,
        duration,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: element,
          start: "top 84%",
          once: true,
        },
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [delay, duration, y]);

  const revealProps = {
    className,
    "data-reveal": true,
    "data-reveal-id": revealId,
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
