"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-driven effects from E4: section tint cross-fade (html[data-section]), hue drift (--scroll),
 * section reveal, and the scroll-progress fallback for browsers without scroll-driven animations.
 * Re-runs per pathname so a client-side navigation to "/" picks up the new sections.
 */
export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const cleanups: Array<() => void> = [];
    const hasIO = "IntersectionObserver" in window;

    /* ---------- section tint cross-fade (spec §5a) ----------
       threshold .45 of the section; tall sections (taller than ~2 viewports) can never reach
       ratio .45, so a section also qualifies when it covers >= 45% of the viewport. */
    const tinted = document.querySelectorAll<HTMLElement>("section[data-tint]");
    if (!tinted.length) root.setAttribute("data-section", "hero");
    if (hasIO && tinted.length) {
      const tintIO = new IntersectionObserver(
        (es) => {
          let best: IntersectionObserverEntry | null = null;
          const vh = Math.max(1, window.innerHeight);
          es.forEach((e) => {
            if (!e.isIntersecting) return;
            const cover = e.intersectionRect.height / vh;
            if (e.intersectionRatio >= 0.45 || cover >= 0.45) {
              if (!best || e.time >= best.time) best = e;
            }
          });
          if (best) root.setAttribute("data-section", (best as IntersectionObserverEntry).target.getAttribute("data-tint") ?? "hero");
        },
        { threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] },
      );
      tinted.forEach((s) => tintIO.observe(s));
      cleanups.push(() => tintIO.disconnect());
    }

    /* ---------- continuous hue drift: --scroll 0..1 (spec §5b) ---------- */
    const rmq = matchMedia("(prefers-reduced-motion: reduce)");
    let sTick = false;
    const drawScroll = () => {
      sTick = false;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty("--scroll", Math.min(1, Math.max(0, window.scrollY / max)).toFixed(4));
    };
    const reqScroll = () => {
      if (rmq.matches) {
        root.style.setProperty("--scroll", "0");
        return;
      }
      if (!sTick) {
        sTick = true;
        requestAnimationFrame(drawScroll);
      }
    };
    window.addEventListener("scroll", reqScroll, { passive: true });
    window.addEventListener("resize", reqScroll, { passive: true });
    window.addEventListener("load", reqScroll);
    rmq.addEventListener?.("change", reqScroll);
    reqScroll();
    cleanups.push(() => {
      window.removeEventListener("scroll", reqScroll);
      window.removeEventListener("resize", reqScroll);
      window.removeEventListener("load", reqScroll);
      rmq.removeEventListener?.("change", reqScroll);
    });

    /* ---------- reveal ---------- */
    const els = document.querySelectorAll(".reveal");
    if (hasIO) {
      const io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      els.forEach((e) => io.observe(e));
      cleanups.push(() => io.disconnect());
    } else els.forEach((e) => e.classList.add("visible"));

    /* ---------- scroll progress (JS fallback when scroll-driven animations are unsupported) ---------- */
    if (!(window.CSS && CSS.supports && CSS.supports("animation-timeline", "scroll()"))) {
      const pBar = document.getElementById("progressBar");
      let ticking = false;
      let maxScroll = 1;
      const measure = () => {
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      };
      const draw = () => {
        ticking = false;
        pBar?.style.setProperty("--p", Math.min(1, Math.max(0, window.scrollY / maxScroll)).toFixed(4));
      };
      const req = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(draw);
        }
      };
      const onResize = () => {
        measure();
        req();
      };
      window.addEventListener("scroll", req, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      window.addEventListener("load", onResize);
      measure();
      draw();
      cleanups.push(() => {
        window.removeEventListener("scroll", req);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", onResize);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
