"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

function safeNext(next: string) {
  return next.startsWith("/") && !next.startsWith("//") ? next : "/schedule";
}

const inputClass =
  "h-12 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-foreground outline-none backdrop-blur-md transition-all duration-300 placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20";

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
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
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
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
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
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
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
        <div role="alert" className="rounded-2xl border border-danger/30 bg-danger/10 p-3.5 text-xs text-danger font-medium">
          {error}
        </div>
      )}
      {notice && (
        <div role="status" className="rounded-2xl border border-success/30 bg-success/10 p-3.5 text-xs text-success font-medium">
          {notice}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-2xl bg-accent text-sm font-semibold text-background transition-all duration-300 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 disabled:opacity-60"
      >
        {loading ? "Please wait..." : isSignup ? "Create account" : "Log in"}
      </button>

      <p className="text-center text-sm text-muted">
        {isSignup ? "Already a member? " : "New here? "}
        <Link href={otherHref} className="font-semibold text-accent hover:text-accent-hover transition-colors">
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}