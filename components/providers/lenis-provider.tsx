"use client";

import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isSafariBrowser } from "@/utils/is-safari-browser";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
const nativeScrollMediaQuery = "(max-width: 767px), (pointer: coarse)";
const scrollStoragePrefix = "benicio-scroll-position:";

function scrollWindowImmediately(top: number) {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  // The native-scroll fallback has `scroll-behavior: smooth` in CSS for
  // in-page anchors. Temporarily override it so route changes never animate
  // through the outgoing page or reveal an intermediate scroll position.
  root.style.scrollBehavior = "auto";
  window.scrollTo({ left: 0, top, behavior: "auto" });
  root.style.scrollBehavior = previousScrollBehavior;
}

/** The single document-level Lenis instance for public site routes. */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const refreshFrameRef = useRef<number | null>(null);
  const refreshTimerRef = useRef<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const previousPathnameRef = useRef(pathname);

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
        offset: 0,
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

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";

    const isClientNavigation = previousPathnameRef.current !== pathname;
    previousPathnameRef.current = pathname;
    const navigationEntry = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    const isReload = !isClientNavigation && navigationEntry?.type === "reload";
    const scrollStorageKey = `${scrollStoragePrefix}${window.location.pathname}${window.location.search}`;

    const hash = window.location.hash;
    const target = hash
      ? document.getElementById(decodeURIComponent(hash.slice(1)))
      : null;

    // A layout effect runs after the destination DOM is committed but before
    // the browser paints it. Resetting synchronously here avoids a frame at the
    // outgoing page's scroll position.
    if (target) {
      lenisRef.current?.scrollTo(target, { immediate: true, offset: 0 });
      if (!lenisRef.current) {
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        scrollWindowImmediately(targetTop);
      }
    } else if (isClientNavigation) {
      lenisRef.current?.scrollTo(0, { immediate: true });
      scrollWindowImmediately(0);
    } else if (isReload) {
      const storedPosition = Number(
        window.sessionStorage.getItem(scrollStorageKey),
      );

      if (Number.isFinite(storedPosition) && storedPosition > 0) {
        lenisRef.current?.scrollTo(storedPosition, { immediate: true });
        scrollWindowImmediately(storedPosition);
      }
    }

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
    const storeScrollPosition = () => {
      const key = `${scrollStoragePrefix}${window.location.pathname}${window.location.search}`;
      window.sessionStorage.setItem(key, String(window.scrollY));
    };

    const resetBeforeInternalNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      const anchor =
        target instanceof Element
          ? target.closest<HTMLAnchorElement>("a[href]")
          : null;

      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      const isSameDocument =
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search;

      if (destination.origin !== window.location.origin) return;

      if (isSameDocument && destination.hash) {
        let targetId: string;

        try {
          targetId = decodeURIComponent(destination.hash.slice(1));
        } catch {
          targetId = destination.hash.slice(1);
        }

        const hashTarget = document.getElementById(targetId);

        if (!hashTarget) return;

        event.preventDefault();

        if (window.location.hash !== destination.hash) {
          window.history.pushState(null, "", destination.hash);
        }

        requestAnimationFrame(() => {
          lenisRef.current?.scrollTo(hashTarget, {
            duration: 0.8,
            offset: 0,
          });

          if (!lenisRef.current) {
            hashTarget.scrollIntoView({ block: "start", behavior: "smooth" });
          }
        });

        return;
      }

      if (isSameDocument) {
        // Next does not remount when a link points to the route already being
        // viewed, so make repeated nav/footer links act as a reliable "top"
        // action without animating through the whole page.
        event.preventDefault();

        if (window.location.href !== destination.href) {
          window.history.pushState(
            null,
            "",
            `${destination.pathname}${destination.search}${destination.hash}`,
          );
        }

        lenisRef.current?.scrollTo(0, { immediate: true });
        scrollWindowImmediately(0);

        return;
      }

      // Own internal route scrolling instead of allowing Next's native scroll
      // restoration to race this provider on touch devices. `scroll: false`
      // keeps the outgoing page stable; the destination layout effect above
      // then places the new page at its top before paint.
      event.preventDefault();
      router.push(
        `${destination.pathname}${destination.search}${destination.hash}`,
        { scroll: false },
      );
    };

    window.addEventListener("pagehide", storeScrollPosition);
    document.addEventListener("click", resetBeforeInternalNavigation, true);

    return () => {
      window.removeEventListener("pagehide", storeScrollPosition);
      document.removeEventListener("click", resetBeforeInternalNavigation, true);
    };
  }, [router]);

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
