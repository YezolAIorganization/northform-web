"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const firstName = user?.fullName?.trim().split(/\s+/)[0] || "Account";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="glass nf-nav-pill mx-auto flex max-w-6xl items-center justify-between rounded-full py-2 pl-5 pr-2 shadow-2xl backdrop-blur-xl">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "text-foreground bg-white/10 shadow-inner"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setAccountOpen((value) => !value)}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-1.5 pr-3.5 text-sm text-foreground transition-all duration-300 hover:bg-white/10"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-background shadow-md">
                  {firstName.charAt(0).toUpperCase()}
                </span>
                <span className="font-medium">{firstName}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${accountOpen ? "rotate-180" : ""}`}
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
                  className="nf-menu-in absolute right-0 top-14 w-52 rounded-2xl border border-white/10 bg-surface p-2 shadow-2xl backdrop-blur-2xl"
                >
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="text-[10px] font-mono text-muted uppercase tracking-wider">Signed in as</p>
                    <p className="text-xs font-semibold text-foreground truncate">{user.fullName || firstName}</p>
                  </div>
                  <Link
                    href="/bookings"
                    onClick={() => setAccountOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-white/5"
                    role="menuitem"
                  >
                    My bookings
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signingOut}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-danger transition-colors hover:bg-danger/10 disabled:cursor-not-allowed disabled:opacity-50"
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
                className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground hover:bg-white/5"
              >
                Log in
              </Link>

              <Button href="/trial" arrow className="h-10 text-sm shadow-lg shadow-accent/20">
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:bg-white/10 md:hidden"
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

        <span className="nf-nav-progress" aria-hidden="true" />
      </div>

      {open && (
        <div className="glass nf-menu-in absolute left-4 right-4 top-full mt-3 rounded-3xl p-4 md:hidden shadow-2xl backdrop-blur-2xl">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-white/10 text-foreground"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-1">
                <div className="px-4 py-1">
                  <p className="font-mono text-[10px] text-muted uppercase tracking-wider">
                    SIGNED IN AS
                  </p>
                  <p className="text-sm font-semibold text-foreground">{firstName}</p>
                </div>

                <Link
                  href="/bookings"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base text-foreground hover:bg-white/5"
                >
                  My bookings
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="rounded-2xl px-4 py-3 text-left text-base text-danger hover:bg-danger/10 disabled:opacity-50"
                >
                  {signingOut ? "Signing out..." : "Sign out"}
                </button>
              </div>
            ) : (
              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base text-muted hover:bg-white/5 text-center"
                >
                  Log in
                </Link>
                <Button href="/trial" arrow className="w-full justify-center shadow-lg shadow-accent/20">
                  Free trial
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}