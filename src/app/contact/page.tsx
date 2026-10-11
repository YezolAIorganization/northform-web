import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Northform",
  description: "Find us in the Riverside District or drop us a message.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-sm text-accent">&gt; get in touch</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Find us.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Stop by for a workout or drop us a note below.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Studio Info */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Studio Location</h2>
              <p className="mt-3 text-muted leading-relaxed">
                24 Alder Street
                <br />
                Riverside District
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold">Hours</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted">Monday &ndash; Friday</dt>
                  <dd className="font-mono text-foreground">6:00 AM &ndash; 8:30 PM</dd>
                </div>
                <div className="flex justify-between pt-1">
                  <dt className="text-muted">Saturday &ndash; Sunday</dt>
                  <dd className="font-mono text-foreground">8:00 AM &ndash; 1:00 PM</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-6">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}