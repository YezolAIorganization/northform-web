import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-background shadow-[0_8px_30px_-10px_rgba(255,91,46,0.7)] hover:bg-accent-hover hover:shadow-[0_12px_35px_-8px_rgba(255,91,46,0.8)] active:translate-y-0.5",
  secondary:
    "border border-white/20 bg-white/5 text-foreground backdrop-blur-md hover:border-white/35 hover:bg-white/10 active:translate-y-0.5",
  ghost: "text-muted hover:text-foreground hover:bg-white/5",
};

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function Button({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex h-12 items-center justify-center gap-3 rounded-full text-sm font-semibold transition-all duration-300 ${
        arrow ? "pl-6 pr-2" : "px-6"
      } ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 ${
            variant === "primary" ? "bg-background/20" : "bg-white/15"
          }`}
        >
          <ArrowIcon />
        </span>
      )}
    </Link>
  );
}