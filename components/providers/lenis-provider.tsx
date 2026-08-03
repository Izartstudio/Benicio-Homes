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
const nativeScrollMediaQuery = "(max-width: 767px), (pointer: coarse)";

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

    const isSafari = isSafariBrowser();
    const useNativeScrolling =
      mediaQuery.matches ||
      isSafari ||
      window.matchMedia(nativeScrollMediaQuery).matches;

    if (useNativeScrolling) {
      document.documentElement.dataset.scrollEngine = isSafari
        ? "safari-native"
        : "native";
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
      duration: 1.2,
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
    // Lenis' GSAP integration recommends disabling ticker lag smoothing so a
    // delayed frame cannot make the scroll position and ScrollTrigger's
    // animation frame disagree (most visible as a one-frame jump).
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(update);
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
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    let lastOrientation = window.screen.orientation?.type ?? "";

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = window.screen.orientation?.type ?? "";
      const usesNativeMobileScroll = window
        .matchMedia(nativeScrollMediaQuery)
        .matches;
      const widthChanged = Math.abs(width - lastWidth) > 1;
      const heightChanged = Math.abs(height - lastHeight) > 1;
      const orientationChanged = orientation !== lastOrientation;

      lastWidth = width;
      lastHeight = height;
      lastOrientation = orientation;

      // Mobile browser chrome changes only the viewport height while a touch
      // scroll is active. Refreshing pins for that transient resize rewrites
      // spacer geometry mid-gesture and is the primary source of iOS jumping.
      if (
        widthChanged ||
        orientationChanged ||
        (!usesNativeMobileScroll && heightChanged)
      ) {
        scheduleRefresh();
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [scheduleRefresh]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}
