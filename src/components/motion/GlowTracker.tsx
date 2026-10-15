"use client";

import { useEffect } from "react";

/**
 * React stamps a "__reactFiber$..." key on every DOM node it has hydrated.
 * Writing styles before that happens causes a hydration mismatch, so we wait.
 */
const isHydrated = (el: HTMLElement) =>
  Object.keys(el).some((key) => key.startsWith("__reactFiber$"));

/**
 * Tracks the pointer over any element marked with data-glow and exposes
 * its position as --mx / --my so CSS can paint a soft light under the cursor.
 */
export default function GlowTracker() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-glow]"
      );
      if (!target || !isHydrated(target)) return;

      const { clientX, clientY } = event;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${clientX - rect.left}px`);
        target.style.setProperty("--my", `${clientY - rect.top}px`);
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}