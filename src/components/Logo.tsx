import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Northform home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 13V3M3.5 7.5L8 3l4.5 4.5"
            stroke="#0e0e10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-heading text-sm font-bold tracking-[0.25em]">
        NORTHFORM
      </span>
    </Link>
  );
}