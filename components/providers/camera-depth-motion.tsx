"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const CAMERA_MEDIA_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function getPdpGallerySurfaces() {
  return gsap.utils.toArray<HTMLElement>(
    '[data-project-detail-page] [data-project-gallery-editorial-section], [data-project-detail-page] [data-pdp-variant="gallery"]',
  );
}

/** Adds a shallow, cursor-led camera drift to PDP galleries only. */
export function CameraDepthMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add(CAMERA_MEDIA_QUERY, () => {
      const galleries = getPdpGallerySurfaces();

      if (galleries.length === 0) return;

      gsap.set(galleries, {
        force3D: true,
        scale: 1.012,
        transformOrigin: "50% 50%",
        transformPerspective: 1600,
        willChange: "transform",
      });

      const moveGalleriesX = gsap.quickTo(galleries, "x", {
        duration: 0.9,
        ease: "power3.out",
      });
      const turnGalleries = gsap.quickTo(galleries, "rotationY", {
        duration: 1.05,
        ease: "power3.out",
      });

      const moveCamera = (event: PointerEvent) => {
        const horizontalPosition = gsap.utils.clamp(
          -1,
          1,
          (event.clientX / window.innerWidth - 0.5) * 2,
        );

        moveGalleriesX(horizontalPosition * -9);
        turnGalleries(horizontalPosition * -0.65);
      };

      const centerCamera = () => {
        moveGalleriesX(0);
        turnGalleries(0);
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
