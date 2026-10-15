import type { Metadata } from "next";
import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Plans | Northform",
  description: "Pick how you train. Flexible drop-ins, core memberships, and unlimited access.",
};

const plans = [
  {
    name: "Drop-in",
    price: "$22",
    period: "per class",
    description: "Ideal for visiting athletes or flexible schedules with zero commitment.",
    features: [
      "Access to any single class",
      "Book up to 14 days ahead",
      "Free cancellation up to 2 hours prior",
    ],
    cta: "Browse schedule",
    href: "/schedule",
    popular: false,
  },
  {
    name: "Core",
    price: "$89",
    period: "per month",
    description: "Our signature tier for steady, consistent strength and conditioning progress.",
    features: [
      "8 classes per month",
      "Any class type (Strength, Conditioning, Mobility)",
      "Book up to 14 days ahead",
      "Cancel anytime",
    ],
    cta: "Start free trial",
    href: "/trial",
    popular: true,
  },
  {
    name: "Unlimited",
    price: "$139",
    period: "per month",
    description: "For dedicated lifters looking to maximize frequency and recovery.",
    features: [
      "Train as often as you like",
      "Priority booking window",
      "Free monthly mobility workshop",
      "Cancel anytime",
    ],
    cta: "Start free trial",
    href: "/trial",
    popular: false,
  },
];

const faqs = [
  {
    q: "Do I need experience?",
    a: "No. Foundations is built specifically for beginners, and all classes scale to your current capability.",
  },
  {
    q: "What should I bring?",
    a: "A water bottle and a towel. We provide all professional equipment, chalk, and mats.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Yes, cancellation is completely free up to 2 hours before the session starts.",
  },
  {
    q: "What if a class is full?",
    a: "Pick another time slot. Spots open up frequently as other members adjust their schedules.",
  },
];

export default function PlansPage() {
  return (
    <main className="flex-1">
      <PageHeader
        eyebrow="Membership"
        title="Pick how you train."
        description="Transparent options with no hidden fees or long-term contracts."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 pt-3 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 110} className="h-full">
              <div
                data-glow
                className={`relative flex h-full flex-col justify-between rounded-2xl border bg-surface p-8 ${
                  plan.popular
                    ? "border-accent shadow-[0_0_60px_-20px_rgba(255,91,46,0.5)]"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 right-6 rounded-full bg-accent px-3 py-0.5 font-mono text-xs text-white">
                    Most popular
                  </span>
                )}

                <div>
                  <h2 className="text-xl font-semibold">{plan.name}</h2>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted">/ {plan.period}</span>
                  </div>
                  <p className="mt-4 text-sm text-muted">{plan.description}</p>

                  <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm text-muted">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="text-accent">&check;</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Button
                    href={plan.href}
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full justify-center"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-xs text-muted">
          Plans shown for demonstration. Payments are not enabled.
        </p>

        {/* FAQ Section */}
        <div className="mt-24">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={(i % 2) * 90} className="h-full">
                <div
                  data-glow
                  className="relative h-full rounded-2xl border border-border bg-surface p-6"
                >
                  <h3 className="text-lg font-semibold">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}