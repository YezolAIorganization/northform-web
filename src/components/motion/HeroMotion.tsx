"use client";

import { useEffect, useRef, type ReactNode } from "react";

type HeroMotionProps = {
  children: ReactNode;
  className?: string;
};

export default function HeroMotion({
  children,
  className = "",
}: HeroMotionProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    let running = false;
    let scrollQueued = false;

    // ---- Scroll progress (0 at top, 1 when hero has scrolled away) ----
    const updateScroll = () => {
      const height = el.offsetHeight || 1;
      const progress = Math.min(Math.max(window.scrollY / height, 0), 1);
      el.style.setProperty("--nf-scroll", progress.toFixed(4));
      scrollQueued = false;
    };

    const onScroll = () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(updateScroll);
    };

    // ---- Smoothed pointer position (-1 to 1) ----
    const loop = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;

      el.style.setProperty("--nf-px", currentX.toFixed(4));
      el.style.setProperty("--nf-py", currentY.toFixed(4));

      const settled =
        Math.abs(targetX - currentX) < 0.001 &&
        Math.abs(targetY - currentY) < 0.001;

      if (settled) {
        running = false;
      } else {
        frame = requestAnimationFrame(loop);
      }
    };

    const kick = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      kick();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      kick();
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    if (canHover) {
      el.addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}