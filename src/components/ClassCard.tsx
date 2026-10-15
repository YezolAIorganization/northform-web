"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDay, formatTime } from "@/lib/format";
import { bookClass } from "@/app/schedule/actions";

export type ScheduleClass = {
  id: string;
  starts_at: string;
  duration_min: number;
  class_name: string;
  trainer_name: string;
  spots_left: number;
  booked_by_me: boolean;
};

function SpotsPill({ spots, booked }: { spots: number; booked: boolean }) {
  if (booked) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-3 py-1 font-mono text-xs text-success">
        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
        Booked
      </span>
    );
  }
  if (spots === 0) {
    return (
      <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
        Full
      </span>
    );
  }
  if (spots <= 3) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        {spots} left
      </span>
    );
  }
  return (
    <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
      {spots} spots left
    </span>
  );
}

export default function ClassCard({ item }: { item: ScheduleClass }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<boolean>(false);

  const startsAtDate = new Date(item.starts_at);
  const now = new Date();
  const diffHours = (startsAtDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const isClosed = diffHours < 2;

  async function handleBook() {
    setLoading(true);
    setErrorMsg(null);

    const res = await bookClass(item.id);
    setLoading(false);

    if (!res.success) {
      if (res.error === "not_authenticated") {
        router.push(`/login?next=/schedule`);
        return;
      }
      setErrorMsg(res.error || "Failed to book");
      return;
    }

    setSuccessMsg(true);
  }

  const isBooked = item.booked_by_me || successMsg;

  return (
      <article
      data-glow
      className="glass-card group relative flex h-full flex-col justify-between rounded-3xl p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-accent font-medium">
            {formatDay(item.starts_at)} &middot; {formatTime(item.starts_at)}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-foreground tracking-tight group-hover:text-white transition-colors">
            {item.class_name}
          </h3>
          <p className="mt-1.5 text-sm text-muted">
            {item.trainer_name} &middot; <span className="font-mono text-xs">{item.duration_min} min</span>
          </p>
        </div>
        <SpotsPill spots={item.spots_left} booked={isBooked} />
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
        {errorMsg ? (
          <p className="text-xs text-danger font-medium">{errorMsg}</p>
        ) : isBooked ? (
          <p className="text-xs text-success font-medium">Class booked. See you there.</p>
        ) : isClosed ? (
          <p className="text-xs text-muted">Booking closed</p>
        ) : item.spots_left === 0 ? (
          <p className="text-xs text-muted">Class full</p>
        ) : (
          <p className="text-xs text-muted">Free cancellation up to 2h before</p>
        )}

        {!isBooked && !isClosed && item.spots_left > 0 && (
          <button
            type="button"
            onClick={handleBook}
            disabled={loading}
            className="rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-background transition-all duration-200 hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25 disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book session"}
          </button>
        )}
      </div>
    </article>
  );
}