"use client";

import { useEffect, useRef, type ReactNode } from "react";

type NavShellProps = {
  children: ReactNode;
  className?: string;
};

export default function NavShell({ children, className = "" }: NavShellProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;

      el.dataset.scrolled = y > 24 ? "true" : "false";
      el.style.setProperty(
        "--nf-progress",
        max > 0 ? String(Math.min(y / max, 1)) : "0"
      );
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} data-scrolled="false" className={className}>
      {children}
    </div>
  );
}