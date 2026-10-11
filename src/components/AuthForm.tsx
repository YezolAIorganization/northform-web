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
  "h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent";

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
    <form onSubmit={onSubmit} className="space-y-5">
      {isSignup && (
        <label className="block">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            Name
          </span>
          <input
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${inputClass} mt-2`}
          />
        </label>
      )}

      <label className="block">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Email
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${inputClass} mt-2`}
        />
      </label>

      <label className="block">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Password
        </span>
        <input
          type="password"
          required
          minLength={isSignup ? 8 : undefined}
          autoComplete={isSignup ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${inputClass} mt-2`}
        />
        {isSignup && (
          <span className="mt-2 block text-xs text-muted">
            Minimum 8 characters.
          </span>
        )}
      </label>

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="text-sm text-success">
          {notice}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-accent text-sm font-semibold text-background transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {loading ? "Please wait..." : isSignup ? "Create account" : "Log in"}
      </button>

      <p className="text-center text-sm text-muted">
        {isSignup ? "Already a member? " : "New here? "}
        <Link href={otherHref} className="text-accent hover:text-accent-hover">
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}