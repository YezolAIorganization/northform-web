import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/schedule", label: "Schedule" },
  { href: "/trainers", label: "Trainers" },
  { href: "/plans", label: "Plans" },
  { href: "/trial", label: "Free trial" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background text-foreground backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-3">
        <div className="flex flex-col items-start gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted leading-relaxed">
            Small classes. Expert coaching. Train with intent.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-foreground transition-colors hover:text-accent hover:translate-x-1 inline-block duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            Visit
          </p>
          <p className="mt-4 text-sm font-medium text-foreground">24 Alder Street, Riverside District</p>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            Mon–Fri 6:00 AM–8:30 PM
            <br />
            Sat–Sun 8:00 AM–1:00 PM
          </p>
        </div>
      </div>

      <div className="border-t border-border bg-surface/40">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6 text-xs text-muted sm:px-6">
          <p>&copy; 2026 Northform. A fictional concept project by Shah.</p>
          <p className="font-mono text-[11px] text-muted">
            Designed &amp; engineered with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}