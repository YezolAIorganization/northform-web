"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Option = { value: string; label: string };

function FilterSelect({
  label,
  name,
  allLabel,
  options,
}: {
  label: string;
  name: string;
  allLabel: string;
  options: Option[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(name, value);
    else params.delete(name);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </span>
      <select
        value={searchParams.get(name) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-xl border border-border bg-surface px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ScheduleFilters({
  days,
  types,
  trainers,
}: {
  days: Option[];
  types: Option[];
  trainers: Option[];
}) {
  const searchParams = useSearchParams();
  const active =
    searchParams.has("day") ||
    searchParams.has("type") ||
    searchParams.has("trainer");

  return (
    <div className="flex flex-wrap items-end gap-4">
      <FilterSelect label="Day" name="day" allLabel="All days" options={days} />
      <FilterSelect
        label="Class type"
        name="type"
        allLabel="All types"
        options={types}
      />
      <FilterSelect
        label="Trainer"
        name="trainer"
        allLabel="All trainers"
        options={trainers}
      />
      {active && (
        <Link
          href="/schedule"
          className="pb-3 text-sm text-muted transition-colors hover:text-accent"
        >
          Clear filters
        </Link>
      )}
    </div>
  );
}