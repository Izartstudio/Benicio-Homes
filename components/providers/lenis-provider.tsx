"use client";

import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isSafariBrowser } from "@/utils/is-safari-browser";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

/** The single document-level Lenis instance for public site routes. */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const refreshFrameRef = useRef<number | null>(null);
  const viewportWidthRef = useRef<number | null>(null);
  const pathname = usePathname();

  const scheduleRefresh = useCallback(() => {
    if (refreshFrameRef.current !== null) {
      cancelAnimationFrame(refreshFrameRef.current);
    }

    refreshFrameRef.current = requestAnimationFrame(() => {
      refreshFrameRef.current = null;
      ScrollTrigger.refresh();
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return;
    }

    if (isSafariBrowser()) {
      document.documentElement.dataset.scrollEngine = "safari-native";

      return () => {
        delete document.documentElement.dataset.scrollEngine;
      };
    }

    const instance = new Lenis({
      anchors: {
        duration: 0.8,
        offset: -112,
      },
      autoRaf: false,
      duration: 1.05,
      easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      gestureOrientation: "vertical",
      infinite: false,
      orientation: "vertical",
      overscroll: true,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      syncTouch: false,
      touchMultiplier: 1,
      virtualScroll: ({ deltaX, deltaY, event }) => {
        if (event.ctrlKey || Math.abs(deltaX) > Math.abs(deltaY)) {
          return false;
        }

        return true;
      },
      wheelMultiplier: 0.95,
    });

    const update = (time: number) => {
      instance.raf(time * 1000);
    };

    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const publishFrame = requestAnimationFrame(() => {
      document.documentElement.dataset.scrollEngine = "lenis";
      setLenis(instance);
    });

    return () => {
      cancelAnimationFrame(publishFrame);
      delete document.documentElement.dataset.scrollEngine;
      gsap.ticker.remove(update);
      instance.off("scroll", ScrollTrigger.update);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    scheduleRefresh();

    return () => {
      if (refreshFrameRef.current !== null) {
        cancelAnimationFrame(refreshFrameRef.current);
        refreshFrameRef.current = null;
      }
    };
  }, [pathname, scheduleRefresh]);

  useEffect(() => {
    let active = true;
    const handleLoad = () => scheduleRefresh();

    window.addEventListener("load", handleLoad, { once: true });
    void document.fonts.ready.then(() => {
      if (active) {
        scheduleRefresh();
      }
    });

    return () => {
      active = false;
      window.removeEventListener("load", handleLoad);
    };
  }, [scheduleRefresh]);

  useEffect(() => {
    viewportWidthRef.current = window.innerWidth;

    const handleResize = () => {
      if (viewportWidthRef.current === window.innerWidth) {
        return;
      }

      viewportWidthRef.current = window.innerWidth;
      scheduleRefresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [scheduleRefresh]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}
