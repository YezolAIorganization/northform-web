import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import ClassCard, { type ScheduleClass } from "@/components/ClassCard";

export const dynamic = "force-dynamic";

const classTypes = [
  {
    name: "Strength",
    text: "Barbell and dumbbell training built around progressive overload.",
  },
  {
    name: "Conditioning",
    text: "Intervals that build your engine without wrecking your joints.",
  },
  {
    name: "Mobility",
    text: "Move better, recover faster, and stay in the game.",
  },
  {
    name: "Foundations",
    text: "New to lifting? Start here. Technique first, confidence second.",
  },
];

const steps = [
  {
    title: "Book a trial",
    text: "Pick a class that fits your week.",
  },
  {
    title: "Meet your coach",
    text: "We'll walk you through everything on arrival.",
  },
  {
    title: "Train and track",
    text: "Book future classes from the website or the app.",
  },
];

const testimonials = [
  {
    quote: "I stopped guessing in the gym. Every class has a clear purpose.",
    name: "Maya R.",
  },
  {
    quote: "Twelve people max means the coaches actually see your form.",
    name: "Daniel K.",
  },
  {
    quote: "I booked the Foundations class nervous and left wanting more.",
    name: "Priya S.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-sm text-accent">&gt; {children}</p>;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default async function Home() {
  const [classesRes, trainersRes] = await Promise.all([
    supabase
      .from("class_schedule")
      .select("id, starts_at, duration_min, class_name, trainer_name, spots_left")
      .gte("starts_at", new Date().toISOString())
      .order("starts_at")
      .limit(4),
    supabase.from("trainers").select("id, name, role").order("name"),
  ]);

  const nextClasses = (classesRes.data ?? []) as ScheduleClass[];
  const trainers = trainersRes.data ?? [];

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-112 w-md -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-36">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Strength &amp; conditioning studio
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight sm:text-7xl">
            Train with <span className="text-accent">intent.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Small classes. Expert coaching. A plan for every session, so you
            always know why you&apos;re lifting.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/trial">Book a free trial</Button>
            <Button href="/schedule" variant="secondary">
              View schedule
            </Button>
          </div>
          <p className="mt-8 font-mono text-xs text-muted">
            Max 12 per class &middot; Coached by certified trainers &middot;
            First session free
          </p>
        </div>
      </section>

      {/* Classes */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Eyebrow>classes</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Four ways to train.
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {classTypes.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="text-xl font-semibold">{c.name}</h3>
              <p className="mt-3 text-sm text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Eyebrow>how it works</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple from day one.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title}>
                <p className="font-mono text-sm text-accent">0{i + 1}</p>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Next classes */}
      {nextClasses.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>next up</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Upcoming classes.
              </h2>
            </div>
            <Button href="/schedule" variant="ghost" className="px-0">
              Full schedule &rarr;
            </Button>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {nextClasses.map((item) => (
              <ClassCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Trainers */}
      {trainers.length > 0 && (
        <section className="border-y border-border bg-surface/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <Eyebrow>trainers</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Coaches who explain the why.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {trainers.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border font-heading text-sm font-bold text-accent">
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/trainers" variant="secondary">
                Meet the team
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Plans teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Eyebrow>plans</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          No joining fee. No lock-in.
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Drop in for a single class, or train on a monthly plan. Change or
          cancel whenever you like.
        </p>
        <div className="mt-8">
          <Button href="/plans" variant="secondary">
            See plans
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <Eyebrow>sample testimonials</Eyebrow>
<h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
  What training here feels like.
</h2>
<p className="mt-3 text-sm text-muted">
  Illustrative examples, not actual member reviews.
</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <blockquote className="text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 font-mono text-xs text-muted">
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="rounded-3xl border border-border bg-surface px-6 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Your first session is on us.
          </h2>
          <div className="mt-8">
            <Button href="/trial">Book a free trial</Button>
          </div>
        </div>
      </section>
    </main>
  );
}