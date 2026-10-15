"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

function safeNext(next: string) {
  return next.startsWith("/") && !next.startsWith("//") ? next : "/schedule";
}

/* Glassmorphic input field styling with glowing Ember accent focus ring */
const inputClass =
  "h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-foreground outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-muted/60 hover:border-white/20 focus:border-accent focus:bg-white/10 focus:ring-4 focus:ring-accent/15";

export default function AuthForm({
  mode,
  next,
}: {
  mode: Mode;
  next: string;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignup = mode === "signup";
  const target = safeNext(next);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (isSignup && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    if (isSignup) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name.trim() } },
      });

      if (
        signUpError?.message.toLowerCase().includes("already") ||
        data.user?.identities?.length === 0
      ) {
        setError("That email is already registered. Try logging in.");
        setLoading(false);
        return;
      }
      if (signUpError) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      if (!data.session) {
        setNotice("Check your email to confirm your account, then log in.");
        setLoading(false);
        return;
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        const msg = signInError.message.toLowerCase();
        if (msg.includes("not confirmed")) {
          setError("Please confirm your email first, then log in.");
        } else if (msg.includes("invalid")) {
          setError("Incorrect email or password.");
        } else {
          setError("Something went wrong. Please try again.");
        }
        setLoading(false);
        return;
      }
    }

    router.push(target);
    router.refresh();
  }

  const otherHref = `${isSignup ? "/login" : "/signup"}?next=${encodeURIComponent(target)}`;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {isSignup && (
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-medium">
            Full Name
          </span>
          <input
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Mercer"
            className={`${inputClass} mt-2`}
          />
        </label>
      )}

      <label className="block">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-medium">
          Email Address
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="alex@example.com"
          className={`${inputClass} mt-2`}
        />
      </label>

      <label className="block">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-medium">
          Password
        </span>
        <input
          type="password"
          required
          minLength={isSignup ? 8 : undefined}
          autoComplete={isSignup ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={`${inputClass} mt-2`}
        />
        {isSignup && (
          <span className="mt-2 block font-mono text-[11px] text-muted">
            Minimum 8 characters.
          </span>
        )}
      </label>

      {error && (
        <div
          role="alert"
          className="glass-card border-danger/40 bg-danger/10 p-4 text-xs text-danger font-medium rounded-2xl"
        >
          {error}
        </div>
      )}
      {notice && (
        <div
          role="status"
          className="glass-card border-success/40 bg-success/10 p-4 text-xs text-success font-medium rounded-2xl"
        >
          {notice}
        </div>
      )}

      {/* Button integrated with global tactile press mechanics */}
      <button
        type="submit"
        disabled={loading}
        className="btn-tactile h-12 w-full rounded-2xl bg-accent text-sm font-semibold text-background shadow-[0_12px_35px_-10px_rgba(255,91,46,0.6)] hover:bg-accent-hover hover:shadow-[0_18px_45px_-10px_rgba(255,91,46,0.8)] disabled:opacity-50 disabled:pointer-events-none"
      >
        {loading ? "Please wait..." : isSignup ? "Create account" : "Log in"}
      </button>

      <p className="text-center text-sm text-muted">
        {isSignup ? "Already a member? " : "New here? "}
        <Link
          href={otherHref}
          className="font-semibold text-accent hover:text-accent-hover transition-colors"
        >
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}