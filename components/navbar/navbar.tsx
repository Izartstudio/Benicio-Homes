"use client";

import responsiveStyles from "./navbar.responsive.module.css";
import { OptimizedImage as Image } from "@/components/ui/optimized-image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FooterLink } from "@/components/footer/footer-link";
import { useLenis } from "@/components/providers/lenis-provider";
import { CTA } from "@/components/ui/cta";

const navigationLinks = [
  { href: "/the-practice", label: "The Practice" },
  { href: "/journal", label: "Journal" },
] as const;

type LenisScrollEvent = {
  direction?: number;
  scroll?: number;
};

export function Navbar() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();

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

    if (lenis) {
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
  }, [lenis]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-overlay pointer-events-none text-[#cccccc] ${responsiveStyles.responsiveRoot}`}
      data-mobile-open={isMobileMenuOpen ? "" : undefined}
      data-navbar
      data-navbar-wrapper
      ref={wrapperRef}
    >
      <div
        className={`pointer-events-auto h-[6.25rem] w-full ${responsiveStyles.navbarSurface}`}
        data-navbar-container
      >
        <div
          className={responsiveStyles.navbarEffectFrame}
          data-navbar-effect-frame
        >
          <div
            aria-hidden="true"
            className={`${responsiveStyles.navbarBackdrop} backdrop-blur-[24px]`}
          />

          <div
            aria-hidden="true"
            className={responsiveStyles.navbarGradient}
          />

          <div
            className={`grid h-full w-full grid-cols-[minmax(10rem,1fr)_auto_minmax(10rem,1fr)] items-center px-[3.125rem] py-[1.5625rem] ${responsiveStyles.navbarContent}`}
            data-navbar-content
          >
        <Link
          aria-label="Benicio home"
          className="inline-flex w-fit items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-laterite"
          data-navbar-logo
          href="/"
        >
          <Image
            src="/assets/NavBar/Logo-NavBar-colored.svg"
            alt="Benicio Homes"
            width={75}
            height={57}
            className="h-auto w-[3.75rem]"
          />
        </Link>

        <nav aria-label="Primary navigation" data-navbar-links>
          <ul className="flex items-center gap-[3.5rem] font-display text-[0.875rem] leading-none">
            <li>
              <FooterLink
                className="!text-[#cccccc] hover:!text-[#D45231]"
                data-navbar-link
                href={navigationLinks[0].href}
              >
                {navigationLinks[0].label}
              </FooterLink>
            </li>

            <li>
              <FooterLink
                className="!text-[#cccccc] hover:!text-[#D45231]"
                data-navbar-link
                href="/projects"
              >
                Projects
              </FooterLink>
            </li>

            <li>
              <FooterLink
                className="!text-[#cccccc] hover:!text-[#D45231]"
                data-navbar-link
                href={navigationLinks[1].href}
              >
                {navigationLinks[1].label}
              </FooterLink>
            </li>
          </ul>
        </nav>

        <CTA
          arrowClassName="translate-y-[0.42rem] text-[1.2rem] leading-none"
          className="inline-flex h-[3.125rem] w-[11rem] items-center justify-between justify-self-end px-[0.8125rem] font-display text-[1rem] leading-none"
          data-navbar-cta
          href="#contact"
          lightBackground="#cccccc"
          variant="light"
        >
          Get in Touch
        </CTA>

        <button
          aria-controls="navbar-mobile-menu"
          aria-expanded={isMobileMenuOpen}
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="hidden size-11 cursor-pointer place-items-center justify-self-end text-[#cccccc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cccccc]"
          data-navbar-mobile-menu
          onClick={() => {
            setIsMobileMenuOpen((isOpen) => !isOpen);
          }}
          type="button"
        >
          <span
            aria-hidden="true"
            className={responsiveStyles.mobileMenuIcon}
          >
            <span />
            <span />
            <span />
          </span>
        </button>
          </div>
        </div>
      </div>

      <nav
        aria-hidden={!isMobileMenuOpen}
        aria-label="Mobile navigation"
        className={`pointer-events-auto mx-auto max-w-[86rem] text-white transition-[opacity,transform,visibility] duration-200 md:hidden ${responsiveStyles.mobilePanel} ${
          isMobileMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
        data-navbar-mobile-panel
        id="navbar-mobile-menu"
      >
        <ul className={responsiveStyles.mobileMenuList}>
          <li className={responsiveStyles.mobileMenuRow}>
            <FooterLink
              className={responsiveStyles.mobileMenuLink}
              href="/the-practice"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              The Practice
            </FooterLink>
          </li>
          <li className={responsiveStyles.mobileMenuRow}>
            <FooterLink
              className={responsiveStyles.mobileMenuLink}
              href="/projects"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </FooterLink>
          </li>
          <li className={responsiveStyles.mobileMenuRow}>
            <FooterLink
              className={responsiveStyles.mobileMenuLink}
              href="/journal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Journal
            </FooterLink>
          </li>
          <li className={responsiveStyles.mobileCtaRow}>
            <CTA
              arrowClassName="translate-y-[0.42rem] text-[1.2rem] leading-none"
              className={responsiveStyles.mobileCta}
              href="#contact"
              lightBackground="#cccccc"
              onClick={() => setIsMobileMenuOpen(false)}
              variant="light"
            >
              Get in Touch
            </CTA>
          </li>
        </ul>
      </nav>
    </header>
  );
}
