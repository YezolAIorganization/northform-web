import Image from "next/image";
import Button from "./Button";

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

export default function Hero() {
  return (
    <section className="relative -mt-20 flex min-h-160 items-end overflow-hidden lg:min-h-190 bg-background">
      <Image
        src="/gym-hero.jpg"
        alt="Strength and conditioning training studio"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] opacity-40 scale-105 transition-transform duration-1000 ease-out"
      />

      <div className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/30" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-background via-background/60 to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-36 sm:px-6 sm:pb-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/80">
                Strength &amp; conditioning studio
              </span>
            </div>

            <h1 className="font-heading text-5xl uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
              <span className="block font-light text-foreground/90">Train with</span>
              <span className="block font-extrabold text-accent mt-1">intent.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              Small classes capped at 12. Expert coaching with rigorous movement baselines. A systematic plan for every session so you always know why you&apos;re lifting.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/trial" arrow className="shadow-lg shadow-accent/20">
                Book a free trial
              </Button>
              <Button href="/schedule" variant="secondary" className="border-white/15 bg-white/5 backdrop-blur-sm">
                View schedule
              </Button>
            </div>
          </div>

          <ul className="hidden gap-4 sm:flex lg:max-w-xs lg:flex-col lg:gap-3">
            {facts.map((fact) => (
              <li
                key={fact.text}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/3 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-accent">
                  {fact.icon}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                  {fact.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}