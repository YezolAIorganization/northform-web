import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-accent text-background hover:bg-accent-hover",
  secondary:
    "border border-border text-foreground hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-foreground",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-xl px-6 text-sm font-semibold transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}