"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/schedule", label: "Schedule" },
  { href: "/trainers", label: "Trainers" },
  { href: "/plans", label: "Plans" },
  { href: "/contact", label: "Contact" },
];

type NavbarUser = {
  id: string;
  fullName: string | null;
};

type NavbarClientProps = {
  user: NavbarUser | null;
};

export default function NavbarClient({ user }: NavbarClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const firstName = user?.fullName?.trim().split(/\s+/)[0] || "Account";

  async function handleSignOut() {
    setSigningOut(true);

    const supabase = createClient();
    await supabase.auth.signOut();

    setAccountOpen(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-foreground ${
                pathname === link.href ? "text-accent" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((value) => !value)}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                className="flex h-10 items-center gap-2 rounded-xl border border-border px-3 text-sm text-foreground transition-colors hover:bg-surface"
              >
                <span>{firstName}</span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 5.5L7 9.5L11 5.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {accountOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-12 w-44 rounded-2xl border border-border bg-surface p-2"
                >
                  <Link
                    href="/bookings"
                    onClick={() => setAccountOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-background"
                    role="menuitem"
                  >
                    My bookings
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-muted transition-colors hover:bg-background hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    role="menuitem"
                  >
                    {signingOut ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                Log in
              </Link>

              <Button href="/trial" className="h-10 px-5">
                Free trial
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {open ? (
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 5h12M3 9h12M3 13h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav
            className="mx-auto flex max-w-6xl flex-col px-4 py-4"
            aria-label="Mobile"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3 text-base ${
                  pathname === link.href ? "text-accent" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="mt-2 border-t border-border pt-3">
                  <p className="px-1 pb-2 text-xs font-mono text-muted">
                    SIGNED IN AS
                  </p>
                  <p className="px-1 pb-2 text-base text-foreground">
                    {firstName}
                  </p>
                </div>

                <Link
                  href="/bookings"
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-foreground"
                >
                  My bookings
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="py-3 text-left text-base text-muted disabled:opacity-50"
                >
                  {signingOut ? "Signing out..." : "Sign out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-muted"
                >
                  Log in
                </Link>

                <Button href="/trial" className="mt-3">
                  Free trial
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}