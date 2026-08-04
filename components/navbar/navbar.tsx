"use client";

import responsiveStyles from "./navbar.responsive.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projectList } from "@/app/projects/data";
import { FooterLink } from "@/components/footer/footer-link";
import { useLenis } from "@/components/providers/lenis-provider";
import { CTA } from "@/components/ui/cta";

const navigationLinks = [
  { href: "/#about", label: "The Practice" },
  { href: "/#journal", label: "Journal" },
] as const;

type LenisScrollEvent = {
  direction?: number;
  scroll?: number;
};

export function Navbar() {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const projectsItemRef = useRef<HTMLLIElement | null>(null);
  const projectsMenuRef = useRef<HTMLUListElement | null>(null);
  const projectsTriggerRef = useRef<HTMLButtonElement | null>(null);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
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
      data-mobile-projects-open={
        isMobileMenuOpen && isMobileProjectsOpen ? "" : undefined
      }
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
            alt="Benicio"
            width={75}
            height={57}
            priority
            className="h-auto w-[3.75rem]"
          />
        </Link>

        <nav aria-label="Primary navigation" data-navbar-links>
          <ul className="flex items-center gap-[3.5rem] font-display text-[0.875rem] leading-none">
            <li>
              <FooterLink
                className="!text-[#cccccc] hover:!text-[#cccccc]"
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
                className="inline-flex items-center gap-2 text-[#cccccc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cccccc]"
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
                className={`absolute left-1/2 top-[calc(100%+1rem)] w-[13.5rem] -translate-x-1/2 border border-white/15 bg-[#151515]/70 shadow-2xl backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 ${
                  isProjectsOpen
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
                data-navbar-projects-menu
              >
                <ul
                  aria-label="Projects"
                  className="grid"
                  id="navbar-projects-menu"
                  ref={projectsMenuRef}
                >
                  {projectList.map((project) => (
                    <li
                      className={responsiveStyles.desktopProjectItem}
                      key={project.slug}
                    >
                      <FooterLink
                        className="!block !w-full px-4 py-3 !text-white hover:bg-white/10 hover:!text-white"
                        href={`/projects/${project.slug}`}
                        onClick={() => setIsProjectsOpen(false)}
                      >
                        {project.hero.title}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <FooterLink
                className="!text-[#cccccc] hover:!text-[#cccccc]"
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
          href="/#contact"
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
          className="hidden size-11 place-items-center justify-self-end text-[#cccccc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cccccc]"
          data-navbar-mobile-menu
          onClick={() => {
            setIsMobileMenuOpen((isOpen) => !isOpen);
            setIsMobileProjectsOpen(false);
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
              href="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              The Practice
            </FooterLink>
          </li>
          <li
            className={`${responsiveStyles.mobileMenuRow} ${responsiveStyles.mobileProjectsRow}`}
          >
            <button
              aria-controls="navbar-mobile-projects-menu"
              aria-expanded={isMobileProjectsOpen}
              aria-haspopup="true"
              className={`${responsiveStyles.mobileMenuLink} ${responsiveStyles.mobileProjectsTrigger}`}
              onClick={() =>
                setIsMobileProjectsOpen((isOpen) => !isOpen)
              }
              type="button"
            >
              Projects
              <span
                aria-hidden="true"
                className={`${responsiveStyles.mobileProjectsChevron} ${
                  isMobileProjectsOpen
                    ? responsiveStyles.mobileProjectsChevronOpen
                    : ""
                }`}
              >
                &#8964;
              </span>
            </button>

            <div
              aria-hidden={!isMobileProjectsOpen}
              className={`${responsiveStyles.mobileProjectsDropdown} ${
                isMobileProjectsOpen
                  ? responsiveStyles.mobileProjectsDropdownOpen
                  : responsiveStyles.mobileProjectsDropdownClosed
              }`}
            >
              <ul
                aria-label="Projects"
                className={responsiveStyles.mobileProjectsList}
                id="navbar-mobile-projects-menu"
              >
                {projectList.map((project) => (
                  <li
                    className={responsiveStyles.mobileProjectItem}
                    key={project.slug}
                  >
                    <FooterLink
                      className={responsiveStyles.mobileProjectLink}
                      href={`/projects/${project.slug}`}
                      onClick={() => {
                        setIsMobileProjectsOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {project.hero.title}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li className={responsiveStyles.mobileMenuRow}>
            <FooterLink
              className={responsiveStyles.mobileMenuLink}
              href="/#journal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Journal
            </FooterLink>
          </li>
          <li className={responsiveStyles.mobileCtaRow}>
            <CTA
              arrowClassName="translate-y-[0.42rem] text-[1.2rem] leading-none"
              className={responsiveStyles.mobileCta}
              href="/#contact"
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
