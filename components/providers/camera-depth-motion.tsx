"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const CAMERA_MEDIA_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function getCameraSurfaces() {
  const main = document.querySelector("main");

  if (!main) return [];

  return Array.from(main.children).filter((element): element is HTMLElement => {
    if (!(element instanceof HTMLElement)) return false;

    const tagName = element.tagName.toLowerCase();
    const position = window.getComputedStyle(element).position;
    const needsViewportCoordinates =
      tagName === "footer" || element.classList.contains("journal-listing-section");

    return (
      !["link", "script", "style"].includes(tagName) &&
      position !== "fixed" &&
      !needsViewportCoordinates
    );
  });
}

/** Adds a shallow, cursor-led camera drift without changing document layout. */
export function CameraDepthMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add(CAMERA_MEDIA_QUERY, () => {
      const surfaces = getCameraSurfaces();
      const navbar = document.querySelector<HTMLElement>("[data-navbar-wrapper]");

      if (surfaces.length === 0) return;

      gsap.set(surfaces, {
        force3D: true,
        scale: 1.012,
        transformOrigin: "50% 50%",
        transformPerspective: 1600,
        willChange: "transform",
      });

      const moveSurfacesX = gsap.quickTo(surfaces, "x", {
        duration: 0.9,
        ease: "power3.out",
      });
      const turnSurfaces = gsap.quickTo(surfaces, "rotationY", {
        duration: 1.05,
        ease: "power3.out",
      });
      const moveNavbarX = navbar
        ? gsap.quickTo(navbar, "x", {
            duration: 1.15,
            ease: "power3.out",
          })
        : null;

      const moveCamera = (event: PointerEvent) => {
        const horizontalPosition = gsap.utils.clamp(
          -1,
          1,
          (event.clientX / window.innerWidth - 0.5) * 2,
        );

        moveSurfacesX(horizontalPosition * -9);
        turnSurfaces(horizontalPosition * -0.65);
        moveNavbarX?.(horizontalPosition * -3.5);
      };

      const centerCamera = () => {
        moveSurfacesX(0);
        turnSurfaces(0);
        moveNavbarX?.(0);
      };

      window.addEventListener("pointermove", moveCamera, { passive: true });
      document.documentElement.addEventListener("pointerleave", centerCamera);
      window.addEventListener("blur", centerCamera);

      return () => {
        window.removeEventListener("pointermove", moveCamera);
        document.documentElement.removeEventListener("pointerleave", centerCamera);
        window.removeEventListener("blur", centerCamera);
      };
    });

    return () => media.revert();
  }, [pathname]);

  return null;
}
