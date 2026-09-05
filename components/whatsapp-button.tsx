"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function colorLuminance(color: string) {
  const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number);

  if (!channels || channels.length !== 3) return null;

  const [red, green, blue] = channels.map((channel) => {
    const value = channel / 255;
    return value <= 0.04045
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function backdropIsDark(button: HTMLAnchorElement) {
  const bounds = button.getBoundingClientRect();
  const x = bounds.left + bounds.width / 2;
  const y = bounds.top + bounds.height / 2;
  const layers = document
    .elementsFromPoint(x, y)
    .filter((element) => element !== button && !button.contains(element));

  for (const layer of layers) {
    let element: Element | null = layer;

    while (element && element !== document.documentElement) {
      const styles = window.getComputedStyle(element);
      const background = styles.backgroundColor;
      const alpha = Number(background.match(/[\d.]+/g)?.[3] ?? 1);
      const luminance = colorLuminance(background);

      if (luminance !== null && alpha >= 0.35) return luminance < 0.4;

      if (
        styles.backgroundImage !== "none" ||
        element instanceof HTMLImageElement ||
        element instanceof HTMLVideoElement
      ) {
        const foregroundLuminance = colorLuminance(styles.color);
        if (foregroundLuminance !== null) return foregroundLuminance > 0.55;
      }

      element = element.parentElement;
    }
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function WhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [darkBackdrop, setDarkBackdrop] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (buttonRef.current) {
          setDarkBackdrop(backdropIsDark(buttonRef.current));
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a
      aria-label="Chat with Benicio Homes on WhatsApp"
      className="whatsapp-button"
      data-backdrop={darkBackdrop ? "dark" : "light"}
      href="https://wa.me/919021829812"
      ref={buttonRef}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image
        alt=""
        height={32}
        src={darkBackdrop ? "/assets/icons/whatsapp-light-32.svg" : "/assets/icons/whatsapp-dark-32.svg"}
        width={32}
      />
    </a>
  );
}
