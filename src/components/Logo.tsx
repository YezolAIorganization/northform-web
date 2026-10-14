import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 transition-opacity duration-300 hover:opacity-90"
      aria-label="Northform home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-background shadow-md shadow-accent/20 transition-transform duration-300 group-hover:scale-105">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        >
          <path
            d="M8 13V3M3.5 7.5L8 3l4.5 4.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-heading text-sm font-bold tracking-[0.3em] text-foreground">
        NORTHFORM
      </span>
    </Link>
  );
}