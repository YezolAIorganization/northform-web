import Image from "next/image";
import type { CSSProperties } from "react";
import Button from "./Button";
import HeroMotion from "./motion/HeroMotion";

function UsersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" />
      <circle cx="10" cy="8" r="3.5" />
      <path d="M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.65a3.5 3.5 0 0 1 0 6.7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const facts = [
  { icon: <UsersIcon />, text: "Max 12 per class" },
  { icon: <ClockIcon />, text: "Free cancellation until 2 hours before" },
];

type NextClass = {
  title: string;
  time: string;
  spotsLeft?: number;
};

type HeroProps = {
  nextClass?: NextClass | null;
};

const depth = (value: number) =>
  ({ "--nf-depth": String(value) }) as CSSProperties;

const delay = (ms: number) =>
  ({ "--nf-delay": `${ms}ms` }) as CSSProperties;

export default function Hero({ nextClass = null }: HeroProps) {
  return (
    <HeroMotion className="relative -mt-20 flex min-h-160 items-end overflow-hidden lg:min-h-190 bg-background">
      {/* Background photo: parallax + slow zoom */}
      <div className="nf-hero-photo absolute inset-0" aria-hidden="true">
        <Image
          src="/gym-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
                    className="nf-hero-zoom object-cover object-[60%_32%] opacity-60"
        />
      </div>

      {/* Ambient glows at different depths */}
      <div
        className="nf-depth pointer-events-none absolute inset-0"
        style={depth(40)}
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 h-137.5 w-212.5 -translate-x-1/2 rounded-full bg-linear-to-tr from-accent/20 via-orange-600/10 to-transparent blur-[140px] animate-pulse-glow" />
      </div>
      <div
        className="nf-depth pointer-events-none absolute inset-0"
        style={depth(-60)}
        aria-hidden="true"
      >
        <div className="absolute top-1/2 -right-20 h-96 w-96 rounded-full bg-accent/15 blur-[120px] animate-float-delayed" />
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/30" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-background via-background/60 to-transparent" />

      <div className="nf-hero-content relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-36 sm:px-6 sm:pb-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="nf-rise mb-6" style={delay(0)}>
              <div className="animate-float inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-xl backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/80">
                  Strength &amp; conditioning studio
                </span>
              </div>
            </div>

            <h1 className="font-heading text-5xl uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
              <span
                className="nf-rise block font-light text-foreground/90"
                style={delay(120)}
              >
                Train with
              </span>
              <span
                className="nf-rise mt-1 block font-extrabold text-accent drop-shadow-[0_10px_30px_rgba(255,91,46,0.3)]"
                style={delay(260)}
              >
                intent.
              </span>
            </h1>

            <p
              className="nf-rise mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
              style={delay(420)}
            >
              Small classes capped at 12. Expert coaching with rigorous movement
              baselines. A systematic plan for every session so you always know
              why you&apos;re lifting.
            </p>

            <div
              className="nf-rise mt-10 flex flex-wrap items-center gap-4"
              style={delay(560)}
            >
              <Button
                href="/trial"
                arrow
                className="shadow-2xl shadow-accent/30 hover:scale-105 transition-transform"
              >
                Book a free trial
              </Button>
              <Button
                href="/schedule"
                variant="secondary"
                className="border-white/15 bg-white/5 backdrop-blur-md"
              >
                View schedule
              </Button>
            </div>
          </div>

          <ul className="hidden gap-4 sm:flex lg:max-w-xs lg:flex-col lg:gap-3">
            {facts.map((fact, idx) => (
              <li
                key={fact.text}
                className="nf-depth"
                style={depth(idx === 0 ? 26 : 44)}
              >
                <div className="nf-rise" style={delay(720 + idx * 140)}>
                  <div
                    className={`floating-card flex items-center gap-4 rounded-2xl p-4.5 cursor-pointer ${
                      idx === 0 ? "animate-float" : "animate-float-delayed"
                    }`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-accent shadow-inner">
                      {fact.icon}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                      {fact.text}
                    </span>
                  </div>
                </div>
              </li>
            ))}

            {nextClass && (
              <li className="nf-depth" style={depth(60)}>
                <div className="nf-rise" style={delay(1000)}>
                  <div className="floating-card animate-float flex items-center gap-4 rounded-2xl p-4.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                      <span className="nf-pulse" />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                        Next class
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                        {nextClass.title}
                      </span>
                      <span className="text-xs text-muted">
                        {nextClass.time}
                        {typeof nextClass.spotsLeft === "number"
                          ? ` · ${nextClass.spotsLeft} spots left`
                          : ""}
                      </span>
                    </span>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="nf-scroll-cue pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <span className="nf-scroll-cue-line" />
      </div>
    </HeroMotion>
  );
}