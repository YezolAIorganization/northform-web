import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Northform",
  description:
    "Questions about classes, plans or your first session? Send us a message.",
};

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const info: { label: string; lines: string[]; icon: ReactNode }[] = [
  {
    label: "Studio",
    lines: ["24 Foundry Lane", "Riverside District"],
    icon: (
      <svg {...iconProps}>
        <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Hours",
    lines: ["Mon to Fri: 6:00 to 21:00", "Sat and Sun: 8:00 to 16:00"],
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "Email",
    lines: ["hello@northform.example", "We reply within one working day"],
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1">
      <PageHeader
        eyebrow="Contact"
        title="Let's talk training."
        description="Questions about classes, plans or your first session? Send a message and a coach will get back to you."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="rounded-3xl border border-border bg-surface/60 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-10">
              <h2 className="text-xl font-semibold tracking-tight">
                Send a message
              </h2>
              <p className="mt-1 mb-8 text-sm text-muted">
                Fill in the form and we&apos;ll reply by email.
              </p>
              <ContactForm />
            </div>
          </Reveal>

          <div className="flex flex-col gap-4 lg:col-span-2">
            {info.map((item, i) => (
              <Reveal key={item.label} delay={(i + 1) * 110}>
                <div
                  data-glow
                  className="relative flex items-start gap-4 rounded-2xl border border-border bg-background/60 p-5 backdrop-blur-sm"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent shadow-inner">
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {item.label}
                    </p>
                    {item.lines.map((line, n) => (
                      <p
                        key={line}
                        className={
                          n === 0
                            ? "mt-1 text-sm font-semibold text-foreground"
                            : "mt-0.5 text-sm text-muted"
                        }
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}