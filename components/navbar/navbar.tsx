"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FooterLink } from "@/components/footer/footer-link";
import { projects } from "@/lib/projects";

const navigationLinks = [
  { href: "/#about", label: "The Practice" },
  { href: "/#journal", label: "Journal" },
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
  const projectsItemRef = useRef<HTMLLIElement | null>(null);
  const projectsMenuRef = useRef<HTMLUListElement | null>(null);
  const projectsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

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

  useEffect(() => {
    if (!isProjectsOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !projectsItemRef.current?.contains(event.target)
      ) {
        setIsProjectsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isProjectsOpen]);

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
            <li>
              <FooterLink
                className="text-bone hover:text-laterite"
                data-navbar-link
                href={navigationLinks[0].href}
              >
                {navigationLinks[0].label}
              </FooterLink>
            </li>

            <li
              className="relative"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsProjectsOpen(false);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setIsProjectsOpen(false);
                  projectsTriggerRef.current?.focus();
                }

                if (
                  event.key === "ArrowDown" &&
                  event.target === projectsTriggerRef.current
                ) {
                  event.preventDefault();
                  setIsProjectsOpen(true);
                  requestAnimationFrame(() => {
                    projectsMenuRef.current
                      ?.querySelector<HTMLAnchorElement>("a")
                      ?.focus();
                  });
                }
              }}
              onMouseEnter={() => setIsProjectsOpen(true)}
              onMouseLeave={() => setIsProjectsOpen(false)}
              ref={projectsItemRef}
            >
              <button
                aria-controls="navbar-projects-menu"
                aria-expanded={isProjectsOpen}
                aria-haspopup="true"
                className="inline-flex items-center gap-2 text-bone transition-colors duration-300 ease-out hover:text-laterite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
                data-navbar-link
                data-navbar-projects-trigger
                onClick={() => setIsProjectsOpen((isOpen) => !isOpen)}
                ref={projectsTriggerRef}
                type="button"
              >
                Projects
                <span
                  aria-hidden="true"
                  className={`text-[0.8rem] transition-transform duration-200 ${
                    isProjectsOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  &#8964;
                </span>
              </button>

              <div
                className={`absolute left-1/2 top-[calc(100%+1rem)] w-[13.5rem] -translate-x-1/2 border border-bone/15 bg-[#2d2d2d]/95 p-2 shadow-2xl backdrop-blur-md transition-[opacity,transform,visibility] duration-200 ${
                  isProjectsOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
                data-navbar-projects-menu
              >
                <ul
                  aria-label="Projects"
                  className="grid gap-1"
                  id="navbar-projects-menu"
                  ref={projectsMenuRef}
                >
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <FooterLink
                        className="block px-4 py-3 text-bone hover:bg-bone/10 hover:text-laterite"
                        href={`/projects/${project.slug}`}
                        onClick={() => setIsProjectsOpen(false)}
                      >
                        {project.title}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <FooterLink
                className="text-bone hover:text-laterite"
                data-navbar-link
                href={navigationLinks[1].href}
              >
                {navigationLinks[1].label}
              </FooterLink>
            </li>
          </ul>
        </nav>

        <FooterLink
          className="inline-flex h-[3.125rem] w-[11rem] items-center justify-between justify-self-end bg-[#CCCCCC] px-[0.8125rem] font-display text-[0.9375rem] leading-none text-[#1A1A1A] hover:text-laterite"
          data-navbar-cta
          href="/#contact"
        >
          Get in Touch
          <span
            aria-hidden="true"
            className="translate-y-[0.42rem] text-[1.2rem] leading-none"
          >
            &rsaquo;
          </span>
        </FooterLink>

        <span
          aria-hidden="true"
          className="hidden justify-self-end text-bone"
          data-navbar-mobile-menu
        >
          <span className="block h-px w-5 bg-current" />
          <span className="mt-[0.35rem] block h-px w-5 bg-current" />
          <span className="mt-[0.35rem] block h-px w-5 bg-current" />
        </span>
      </div>
    </header>
  );
}
