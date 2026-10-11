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
      <div className="text-center py-6">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 border border-success/40 text-success font-bold text-lg">
          &check;
        </div>
        <h2 className="mt-4 text-2xl font-bold">You&apos;re on the list.</h2>
        <p className="mt-3 text-muted">
          We&apos;ll email you to confirm your session. In the meantime, browse the schedule.
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
        <div className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
          {errorMsg}
        </div>
      )}

      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-foreground">
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          placeholder="Alex Rivera"
          className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-accent focus:outline-none"
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
          placeholder="alex@example.com"
          className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="preferredClass" className="block text-sm font-medium text-foreground">
          Preferred class
        </label>
        <select
          id="preferredClass"
          name="preferredClass"
          required
          defaultValue="Strength"
          className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:border-accent focus:outline-none"
        >
          {classOptions.map((opt) => (
            <option key={opt} value={opt} className="bg-surface text-foreground">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-foreground">
          Anything we should know? <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Past injuries, fitness goals, or specific questions..."
          className="mt-2 w-full rounded-xl border border-border bg-background p-4 text-sm text-foreground focus:border-accent focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-accent font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Request my free session"}
      </button>
    </form>
  );
}