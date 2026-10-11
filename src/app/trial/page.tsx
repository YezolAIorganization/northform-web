import type { Metadata } from "next";
import TrialForm from "./TrialForm";

export const metadata: Metadata = {
  title: "Free Trial | Northform",
  description: "Book your free session. Experience our boutique strength studio.",
};

export default function TrialPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-sm text-accent">&gt; free session</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Book your free session.
        </h1>
        <p className="mt-4 text-muted">
          Tell us a bit about you. We&apos;ll confirm within a day.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <TrialForm />
        </div>
      </section>
    </main>
  );
}