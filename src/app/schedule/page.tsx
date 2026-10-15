import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Button from "@/components/Button";
import ClassCard, { type ScheduleClass } from "@/components/ClassCard";
import ScheduleFilters from "@/components/ScheduleFilters";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { dayKey, formatDay, formatDayLong } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Schedule | Northform",
  description:
    "Book up to 14 days ahead. Cancel free until 2 hours before class.",
};

type Row = ScheduleClass & { class_type_id: string; trainer_id: string };

const delay = (ms: number) =>
  ({ "--nf-delay": `${ms}ms` }) as CSSProperties;

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ day?: string; type?: string; trainer?: string }>;
}) {
  const { day, type, trainer } = await searchParams;
  const supabase = await createClient();

  const [classesRes, typesRes, trainersRes] = await Promise.all([
    supabase
      .from("class_schedule")
      .select(
        "id, starts_at, duration_min, class_name, class_type_id, trainer_name, trainer_id, spots_left, booked_by_me",
      )
      .gte("starts_at", new Date().toISOString())
      .order("starts_at")
      .limit(200),
    supabase.from("class_types").select("id, name").order("name"),
    supabase.from("trainers").select("id, name").order("name"),
  ]);

  const all = (classesRes.data ?? []) as Row[];

  const days = Array.from(
    new Map(all.map((c) => [dayKey(c.starts_at), c.starts_at])).entries(),
  ).map(([key, iso]) => ({ value: key, label: formatDay(iso) }));

  const filtered = all.filter(
    (c) =>
      (!day || dayKey(c.starts_at) === day) &&
      (!type || c.class_type_id === type) &&
      (!trainer || c.trainer_id === trainer),
  );

  const groups = new Map<string, Row[]>();
  for (const c of filtered) {
    const key = dayKey(c.starts_at);
    groups.set(key, [...(groups.get(key) ?? []), c]);
  }

  return (
    <main className="flex-1">
      <PageHeader
        eyebrow="Schedule"
        title="Class schedule"
        description="Book up to 14 days ahead. Cancel free until 2 hours before class."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="nf-rise" style={delay(420)}>
          <ScheduleFilters
            days={days}
            types={(typesRes.data ?? []).map((t) => ({
              value: t.id,
              label: t.name,
            }))}
            trainers={(trainersRes.data ?? []).map((t) => ({
              value: t.id,
              label: t.name,
            }))}
          />
        </div>

        {classesRes.error && (
          <p className="mt-10 text-danger">
            Something went wrong. Please try again.
          </p>
        )}

        {!classesRes.error && filtered.length === 0 && (
          <Reveal>
            <div
              data-glow
              className="relative mt-12 rounded-2xl border border-dashed border-border p-10 text-center"
            >
              <p className="font-semibold">No classes match your filters.</p>
              <div className="mt-6">
                <Button href="/schedule" variant="secondary">
                  Clear filters
                </Button>
              </div>
            </div>
          </Reveal>
        )}

        <div className="mt-12 space-y-14">
          {Array.from(groups.entries()).map(([key, items]) => (
            <div key={key}>
              <Reveal>
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold">
                    {formatDayLong(items[0].starts_at)}
                  </h2>
                  <span className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
                  <span className="font-mono text-xs text-muted">
                    {items.length} {items.length === 1 ? "class" : "classes"}
                  </span>
                </div>
              </Reveal>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {items.map((item, i) => (
                  <Reveal key={item.id} delay={(i % 2) * 90} className="h-full">
                    <ClassCard item={item} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}