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
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">
            Small classes. Expert coaching. Train with intent.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Visit
          </p>
          <p className="mt-4 text-sm">24 Alder Street, Riverside District</p>
          <p className="mt-2 text-sm text-muted">
            Mon–Fri 6:00 AM–8:30 PM
            <br />
            Sat–Sun 8:00 AM–1:00 PM
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted sm:px-6">
          &copy; 2026 Northform. A fictional concept project by Shah.
        </p>
      </div>
    </footer>
  );
}