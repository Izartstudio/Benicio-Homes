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
  const lenisRef = useRef<Lenis | null>(null);
  const refreshFrameRef = useRef<number | null>(null);
  const refreshTimerRef = useRef<number | null>(null);
  const pathname = usePathname();

  const scheduleRefresh = useCallback(() => {
    if (refreshTimerRef.current !== null) {
      window.clearTimeout(refreshTimerRef.current);
    }
    if (refreshFrameRef.current !== null) {
      cancelAnimationFrame(refreshFrameRef.current);
    }

    refreshTimerRef.current = window.setTimeout(() => {
      refreshTimerRef.current = null;
      refreshFrameRef.current = requestAnimationFrame(() => {
        refreshFrameRef.current = requestAnimationFrame(() => {
          refreshFrameRef.current = null;
          lenisRef.current?.resize();
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
          ScrollTrigger.update();
          lenisRef.current?.resize();
        });
      });
    }, 180);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Resize is owned by the settled handler below. Letting ScrollTrigger also
    // refresh on every raw DevTools/zoom resize event can measure downstream
    // pins while an upstream responsive pin is still being rebuilt.
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange",
      ignoreMobileResize: true,
    });

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

    lenisRef.current = instance;
    const update = (time: number) => {
      instance.raf(time * 1000);
    };

    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
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
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const refreshWhenReady = () => {
      void document.fonts.ready.then(() => {
        if (active) {
          scheduleRefresh();
        }
      });
    };

    if (document.readyState === "complete") {
      refreshWhenReady();
    } else {
      window.addEventListener("load", refreshWhenReady, { once: true });
    }

    return () => {
      active = false;
      window.removeEventListener("load", refreshWhenReady);

      if (refreshTimerRef.current !== null) {
        window.clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      if (refreshFrameRef.current !== null) {
        cancelAnimationFrame(refreshFrameRef.current);
        refreshFrameRef.current = null;
      }
    };
  }, [pathname, scheduleRefresh]);

  useEffect(() => {
    const handleResize = () => scheduleRefresh();
    const visualViewport = window.visualViewport;

    window.addEventListener("resize", handleResize);
    visualViewport?.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      visualViewport?.removeEventListener("resize", handleResize);
    };
  }, [scheduleRefresh]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}
