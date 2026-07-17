"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FooterLink } from "@/components/footer/footer-link";

const navigationLinks = [
  { href: "#about", label: "The Practice" },
  { href: "#featured-projects", label: "Projects" },
  { href: "#restoration-showcase", label: "Journal" },
] as const;

type LenisScrollEvent = {
  direction?: number;
  scroll?: number;
};

type LenisLike = {
  on?: (event: "scroll", callback: (event: LenisScrollEvent) => void) => void;
  off?: (event: "scroll", callback: (event: LenisScrollEvent) => void) => void;
};

declare global {
  interface Window {
    lenis?: LenisLike;
  }
}

export function Navbar() {
  const wrapperRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) {
      return;
    }

    let isVisible = true;
    let lastDirection: "down" | "up" | null = null;
    let lastScrollY = window.scrollY;

    gsap.set(wrapper, { yPercent: 0 });

    const showNavbar = () => {
      if (isVisible) {
        return;
      }

      isVisible = true;
      gsap.to(wrapper, {
        yPercent: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const hideNavbar = () => {
      if (!isVisible) {
        return;
      }

      isVisible = false;
      gsap.to(wrapper, {
        yPercent: -110,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const updateNavbar = (scrollY: number, direction: "down" | "up") => {
      if (scrollY <= 4) {
        lastDirection = "up";
        showNavbar();
        return;
      }

      if (direction === lastDirection) {
        return;
      }

      lastDirection = direction;

      if (direction === "down") {
        hideNavbar();
        return;
      }

      showNavbar();
    };

    const handleLenisScroll = (event: LenisScrollEvent) => {
      const scrollY = event.scroll ?? window.scrollY;
      const direction =
        typeof event.direction === "number"
          ? event.direction > 0
            ? "down"
            : "up"
          : scrollY > lastScrollY
            ? "down"
            : "up";

      lastScrollY = scrollY;
      updateNavbar(scrollY, direction);
    };

    const handleNativeScroll = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";

      lastScrollY = scrollY;
      updateNavbar(scrollY, direction);
    };

    const lenis = window.lenis;

    if (lenis?.on && lenis?.off) {
      lenis.on("scroll", handleLenisScroll);

      return () => {
        lenis.off?.("scroll", handleLenisScroll);
        gsap.killTweensOf(wrapper);
      };
    }

    window.addEventListener("scroll", handleNativeScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleNativeScroll);
      gsap.killTweensOf(wrapper);
    };
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-overlay pointer-events-none text-bone mix-blend-difference"
      data-navbar
      data-navbar-wrapper
      ref={wrapperRef}
    >
      <div
        className="pointer-events-auto mx-auto grid h-[5.5rem] w-full max-w-[1440px] grid-cols-[minmax(10rem,1fr)_auto_minmax(10rem,1fr)] items-center px-[5.28%]"
        data-navbar-container
      >
        <Link
          aria-label="Benicio home"
          className="inline-flex w-fit items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
          data-navbar-logo
          href="/"
        >
          <Image
            src="/assets/NavBar/Logo-NavBar.svg"
            alt="Benicio"
            width={75}
            height={57}
            priority
            className="h-auto w-[clamp(2.85rem,4.2vw,4.6875rem)] "
          />
        </Link>

        <nav aria-label="Primary navigation" data-navbar-links>
          <ul className="flex items-center gap-[clamp(1.5rem,2.8vw,2.5rem)] font-display text-[0.9375rem] leading-none">
            {navigationLinks.map((item) => (
              <li key={item.href}>
                <FooterLink
                  className="text-bone hover:text-laterite"
                  data-navbar-link
                  href={item.href}
                >
                  {item.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        <FooterLink
          className="inline-flex h-[3.125rem] w-[11rem] items-center justify-between justify-self-end bg-[#CCCCCC] px-[0.8125rem] font-display text-[0.9375rem] leading-none text-[#1A1A1A] hover:text-laterite"
          data-navbar-cta
          href="#contact"
        >
          Get in Touch
          <span
            aria-hidden="true"
            className="translate-y-[0.42rem] text-[1.2rem] leading-none"
          >
            &rsaquo;
          </span>
        </FooterLink>
      </div>
    </header>
  );
}
