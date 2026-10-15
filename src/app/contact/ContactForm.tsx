"use client";

import { useState } from "react";
import { submitContactMessage } from "./actions";

const field =
  "mt-2 w-full rounded-xl border border-border bg-background/70 px-4 text-sm text-foreground placeholder:text-muted-dark transition-[border-color,box-shadow] duration-300 focus:border-accent focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,91,46,0.18),0_0_30px_-8px_rgba(255,91,46,0.45)]";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitContactMessage(formData);

    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "Submission failed");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="nf-rise flex flex-col items-center rounded-2xl border border-success/40 bg-success/10 p-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-success/40 bg-success/15 text-success shadow-[0_0_40px_-8px_rgba(34,197,94,0.6)]">
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
        <p className="mt-5 text-lg font-semibold text-success">
          Message sent. We&apos;ll reply soon.
        </p>
        <p className="mt-1 text-sm text-muted">
          Thanks for reaching out to Northform.
        </p>
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

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Jordan Lee"
          className={`${field} h-12`}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          placeholder="jordan@example.com"
          className={`${field} h-12`}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="How can we help?"
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
        {loading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}