import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { formatDay, formatTime } from "@/lib/format";
import Button from "@/components/Button";
import Hero from "@/components/Hero";
import ClassCard, { type ScheduleClass } from "@/components/ClassCard";
import Reveal from "@/components/motion/Reveal";
import FloatingOrbs from "@/components/motion/FloatingOrbs";
import CountUp from "@/components/motion/CountUp";
import Marquee from "@/components/motion/Marquee";
export const dynamic = "force-dynamic";

const classTypes = [
  {
    name: "Strength",
    text: "Barbell and dumbbell training built around progressive overload. The bedrock of structural power.",
    image: "/strength.jpg",
    position: "object-[center_30%]",
    span: "lg:col-span-2",
  },
  {
    name: "Conditioning",
    text: "Intervals that build your engine without wrecking your joints.",
    image: null,
    position: "",
    span: "",
  },
  {
    name: "Mobility",
    text: "Move better, recover faster, and stay in the game.",
    image: null,
    position: "",
    span: "",
  },
  {
    name: "Foundations",
    text: "New to lifting? Start here. Technique first, confidence second.",
    image: "/foundations.jpg",
    position: "object-[center_45%]",
    span: "lg:col-span-2",
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
  const upcoming = nextClasses[0];

  const coachStat =
    trainers.length > 0
      ? {
          value: trainers.length,
          suffix: "",
          label: trainers.length === 1 ? "Expert coach" : "Expert coaches",
        }
      : { value: classTypes.length, suffix: "", label: "Class formats" };

  const stats = [
    coachStat,
    { value: 12, suffix: "", label: "Max per class" },
    { value: 14, suffix: " days", label: "Booking window" },
    { value: 2, suffix: "h", label: "Free cancellation" },
  ];

  return (
    <main className="flex-1 overflow-hidden bg-background text-foreground selection:bg-accent/30 selection:text-white">
      {/* Hero Section */}
      <Hero
        nextClass={
          upcoming
            ? {
                title: upcoming.class_name,
                time: `${formatDay(upcoming.starts_at)} · ${formatTime(upcoming.starts_at)}`,
                spotsLeft: upcoming.spots_left,
              }
            : null
        }
      />

      {/* Floating stats bar */}
      <section className="relative z-20 -mt-14 px-4 sm:px-6">
        <Reveal className="mx-auto grid max-w-6xl grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              data-glow
              className="relative rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur-xl sm:p-6"
            >
              <p className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Marquee */}
      <section aria-label="Training disciplines" className="pb-4 pt-16">
        <Marquee
          items={[
            "Strength",
            "Conditioning",
            "Mobility",
            "Foundations",
            "Progressive overload",
            "Small classes",
          ]}
        />
      </section>

      {/* Classes Section */}
      <section className="relative isolate">
        <FloatingOrbs />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Eyebrow>Discipline Architecture</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Four ways to train.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted">
              Engineered progressive overload designed to build lean tissue, protect joints, and maximize functional capacity.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classTypes.map((c, idx) => (
              <Reveal key={c.name} delay={idx * 90} className={`h-full ${c.span}`}>
                <div
                  data-glow
                  className="group relative flex h-full min-h-64 flex-col justify-end overflow-hidden rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-sm"
                >
                  {c.image && (
                    <>
                      <Image
                        src={c.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className={`-z-20 object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-85 ${c.position}`}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/60 to-background/10"
                      />
                    </>
                  )}

                  <div className="absolute right-0 top-0 p-6 font-mono text-xs text-muted transition-colors group-hover:text-accent">
                    0{idx + 1}
                  </div>
                  <h3 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
                    {c.name}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted">
                    {c.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-surface/20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <Eyebrow>Workflow</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple from day one.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 110} className="h-full">
                <div
                  data-glow
                  className="relative h-full rounded-2xl border border-border bg-background/60 p-6"
                >
                  <span className="font-mono text-sm font-semibold text-accent">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Next classes */}
      {nextClasses.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Live Schedule</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Upcoming sessions.
              </h2>
            </div>
            <Button href="/schedule" variant="ghost" className="px-0 text-accent hover:text-accent-hover">
              Full schedule &rarr;
            </Button>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {nextClasses.map((item, i) => (
              <Reveal key={item.id} delay={i * 90} className="h-full">
                <ClassCard item={item} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Trainers */}
      {trainers.length > 0 && (
        <section className="border-y border-border bg-surface/20">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <Reveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <Eyebrow>Expert Coaching</Eyebrow>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Coaches who explain the why.
                </h2>
              </div>
              <Button href="/trainers" variant="secondary" className="border-border bg-surface/80">
                Meet the team
              </Button>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-3">
              {trainers.map((t, i) => (
                <Reveal key={t.id} delay={i * 90} className="h-full">
                  <div
                    data-glow
                    className="relative flex h-full items-center gap-4 rounded-2xl border border-border bg-background/60 p-5 backdrop-blur-sm"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface font-mono text-sm font-bold text-accent">
                      {initials(t.name)}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted">{t.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Plans teaser */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-linear-to-r from-surface/80 via-surface/40 to-background p-8 sm:p-12">
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <Eyebrow>Membership</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              No joining fee. No lock-in contracts.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Drop in for a single session or train on a flexible monthly tier. Scale up, pause, or cancel whenever your schedule shifts.
            </p>
            <div className="mt-8">
              <Button href="/plans" variant="secondary" className="border-border bg-surface text-foreground hover:bg-surface-raised">
                Explore plans &amp; pricing
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="relative isolate border-y border-border bg-surface/20">
        <FloatingOrbs />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <Eyebrow>Member Feedback</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              What training here feels like.
            </h2>
            <p className="mt-2 font-mono text-xs text-muted">
              Illustrative examples reflecting our core training philosophy.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 110} className="h-full">
                <figure
                  data-glow
                  className="relative flex h-full flex-col justify-between rounded-2xl border border-border bg-background/60 p-6 backdrop-blur-sm"
                >
                  <blockquote className="text-sm leading-relaxed text-foreground/90">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-xs font-semibold text-foreground">{t.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="relative isolate flex min-h-104 items-center overflow-hidden rounded-3xl border border-border bg-surface/40 px-6 py-16 sm:px-12">
            <div className="absolute inset-y-0 right-0 -z-20 w-full lg:w-3/5">
              <Image
                src="/cta.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover object-[center_32%] opacity-40 lg:opacity-85"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/85 to-background/30 lg:via-background/70 lg:to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-linear-to-t from-accent/10 via-transparent to-transparent"
            />

            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                Your first session is on us.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-muted lg:mx-0">
                Experience a class firsthand. No commitments, just expert coaching and proper programming.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start">
                <Button href="/trial" className="shadow-lg shadow-accent/20">
                  Book a free trial
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}