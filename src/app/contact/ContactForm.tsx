"use client";

import { useState } from "react";
import { submitContactMessage } from "./actions";

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
      <div className="rounded-xl border border-success/40 bg-success/10 p-6 text-center">
        <p className="font-semibold text-success">Message sent. We&apos;ll reply soon.</p>
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
        <div className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
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
          placeholder="Jordan Lee"
          className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-accent focus:outline-none"
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
          placeholder="jordan@example.com"
          className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="How can we help?"
          className="mt-2 w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground focus:border-accent focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-accent font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

