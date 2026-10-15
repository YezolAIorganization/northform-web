"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { submitTrialRequest } from "./actions";

const classOptions = [
  "Strength",
  "Conditioning",
  "Mobility",
  "Foundations",
  "Not sure",
];

const field =
  "mt-2 w-full rounded-xl border border-border bg-background/70 px-4 text-sm text-foreground placeholder:text-muted-dark transition-[border-color,box-shadow] duration-300 focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,91,46,0.18),0_0_30px_-8px_rgba(255,91,46,0.45)]";

export default function TrialForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitTrialRequest(formData);

    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "Submission failed");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="nf-rise py-6 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-success/40 bg-success/15 text-success shadow-[0_0_40px_-8px_rgba(34,197,94,0.6)]">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2 className="mt-5 text-2xl font-bold">You&apos;re on the list.</h2>
        <p className="mx-auto mt-3 max-w-sm text-muted">
          We&apos;ll email you to confirm your session. In the meantime, browse
          the schedule.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/schedule">Browse schedule</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="nf-rise rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
        >
          {errorMsg}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            autoComplete="name"
            placeholder="Alex Rivera"
            className={`${field} h-12`}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            placeholder="alex@example.com"
            className={`${field} h-12`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="preferredClass" className="block text-sm font-medium text-foreground">
          Preferred class
        </label>
        <div className="relative">
          <select
            id="preferredClass"
            name="preferredClass"
            required
            defaultValue="Strength"
            className={`${field} h-12 appearance-none pr-11`}
          >
            {classOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-surface text-foreground">
                {opt}
              </option>
            ))}
          </select>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-muted"
          >
            <path
              d="M3 5.5L7 9.5L11 5.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-foreground">
          Anything we should know? <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Past injuries, fitness goals, or specific questions..."
          className={`${field} resize-y py-3`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent font-semibold text-white shadow-[0_10px_30px_-10px_rgba(255,91,46,0.6)] transition-[background-color,box-shadow] duration-300 hover:bg-accent-hover hover:shadow-[0_14px_40px_-8px_rgba(255,91,46,0.7)] disabled:opacity-60"
      >
        {loading && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
          />
        )}
        {loading ? "Submitting..." : "Request my free session"}
      </button>
    </form>
  );
}