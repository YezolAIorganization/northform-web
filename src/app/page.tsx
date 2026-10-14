import { supabase } from "@/lib/supabase";
import Button from "@/components/Button";
import ClassCard, { type ScheduleClass } from "@/components/ClassCard";
export const dynamic = "force-dynamic";

const classTypes = [
  {
    name: "Strength",
    text: "Barbell and dumbbell training built around progressive overload. The bedrock of structural power.",
    featured: true,
  },
  {
    name: "Conditioning",
    text: "Intervals that build your engine without wrecking your joints.",
    featured: false,
  },
  {
    name: "Mobility",
    text: "Move better, recover faster, and stay in the game.",
    featured: false,
  },
  {
    name: "Foundations",
    text: "New to lifting? Start here. Technique first, confidence second.",
    featured: false,
  },
];

const steps = [
  {
    title: "Book a trial",
    text: "Pick a class that fits your week with zero friction.",
  },
  {
    title: "Meet your coach",
    text: "We'll walk you through movement baselines on arrival.",
  },
  {
    title: "Train and track",
    text: "Progress seamlessly from the web platform or mobile app.",
  },
];

const testimonials = [
  {
    quote: "I stopped guessing in the gym. Every class has a clear architectural purpose.",
    name: "Maya R.",
    role: "Software Engineer",
  },
  {
    quote: "Twelve people max means the coaches actually see your form and correct imbalances.",
    name: "Daniel K.",
    role: "Product Designer",
  },
  {
    quote: "I booked the Foundations class nervous and left wanting more structural depth.",
    name: "Priya S.",
    role: "Systems Architect",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
      {children}
    </div>
  );
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
    <main className="flex-1 overflow-hidden bg-background text-foreground selection:bg-accent/30 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-28 lg:pt-32 lg:pb-36">
        <div className="pointer-events-none absolute -top-48 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-linear-to-tr from-accent/15 via-amber-600/10 to-transparent blur-[140px]" />
        <div className="pointer-events-none absolute top-1/3 -right-32 h-87.5 w-87.5 rounded-full bg-accent/10 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 backdrop-blur-md mb-8">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs text-muted tracking-wide uppercase">
              Strength &amp; conditioning studio &middot; Riverside District
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl leading-[1.08]">
            Train with <span className="bg-linear-to-r from-accent via-orange-400 to-amber-500 bg-clip-text text-transparent">intent.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-muted leading-relaxed font-normal">
            Small classes capped at 12. Expert coaching with rigorous movement baselines. A systematic plan for every session so you always know why you&apos;re lifting.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/trial" className="shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300">
              Book a free trial
            </Button>
            <Button href="/schedule" variant="secondary" className="border-border bg-surface/80 hover:bg-surface text-foreground">
              View live schedule &rarr;
            </Button>
          </div>

          <div className="mt-12 flex items-center gap-6 font-mono text-xs text-muted border-t border-border pt-6">
            <span>&bull; Max 12 per class</span>
            <span>&bull; Certified specialists</span>
            <span>&bull; First session complimentary</span>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <Eyebrow>Discipline Architecture</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Four ways to train.
            </h2>
          </div>
          <p className="text-sm text-muted max-w-sm">
            Engineered progressive overload designed to build lean tissue, protect joints, and maximize functional capacity.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classTypes.map((c, idx) => (
            <div
              key={c.name}
              className={`group relative overflow-hidden rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-accent/60 hover:bg-surface/70 ${
                idx === 0 ? "lg:col-span-2 lg:bg-linear-to-br lg:from-surface/80 lg:to-background" : ""
              }`}
            >
              <div className="absolute top-0 right-0 p-6 font-mono text-xs text-muted group-hover:text-accent transition-colors">
                0{idx + 1}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-3">
                {c.name}
              </h3>
              <p className="text-muted text-sm leading-relaxed max-w-md">
                {c.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface/20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Eyebrow>Workflow</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple from day one.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl border border-border bg-background/60 p-6">
                <span className="font-mono text-sm font-semibold text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next classes */}
      {nextClasses.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <Eyebrow>Live Schedule</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Upcoming sessions.
              </h2>
            </div>
            <Button href="/schedule" variant="ghost" className="px-0 text-accent hover:text-accent-hover">
              Full schedule &rarr;
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {nextClasses.map((item) => (
              <ClassCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Trainers */}
      {trainers.length > 0 && (
        <section className="border-y border-border bg-surface/20">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <Eyebrow>Expert Coaching</Eyebrow>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Coaches who explain the why.
                </h2>
              </div>
              <Button href="/trainers" variant="secondary" className="border-border bg-surface/80">
                Meet the team
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {trainers.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-background/60 p-5 backdrop-blur-sm"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface font-mono text-sm font-bold text-accent">
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs font-mono text-muted mt-0.5">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Plans teaser */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-3xl border border-border bg-linear-to-r from-surface/80 via-surface/40 to-background p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
          <Eyebrow>Membership</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            No joining fee. No lock-in contracts.
          </h2>
          <p className="mt-4 max-w-xl text-muted text-sm sm:text-base leading-relaxed">
            Drop in for a single session or train on a flexible monthly tier. Scale up, pause, or cancel whenever your schedule shifts.
          </p>
          <div className="mt-8">
            <Button href="/plans" variant="secondary" className="border-border bg-surface hover:bg-surface-raised text-foreground">
              Explore plans &amp; pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-surface/20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Eyebrow>Member Feedback</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            What training here feels like.
          </h2>
          <p className="mt-2 text-xs font-mono text-muted">
            Illustrative examples reflecting our core training philosophy.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col justify-between rounded-2xl border border-border bg-background/60 p-6 backdrop-blur-sm"
              >
                <blockquote className="text-foreground/90 text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="font-semibold text-foreground text-xs">{t.name}</span>
                  <span className="font-mono text-[10px] text-muted uppercase tracking-wider">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 text-center">
        <div className="rounded-3xl border border-border bg-surface/40 px-6 py-20 relative overflow-hidden backdrop-blur-md">
          <div className="absolute inset-0 bg-linear-to-t from-accent/5 via-transparent to-transparent pointer-events-none" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
            Your first session is on us.
          </h2>
          <p className="mt-4 text-muted max-w-md mx-auto text-sm">
            Experience a class firsthand. No commitments, just expert coaching and proper programming.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/trial" className="shadow-lg shadow-accent/20">Book a free trial</Button>
          </div>
        </div>
      </section>

    </main>
  );
}