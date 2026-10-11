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
      <span className="rounded-full border border-success/40 bg-success/10 px-3 py-1 font-mono text-xs text-success">
        Booked
      </span>
    );
  }
  if (spots === 0) {
    return (
      <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
        Full
      </span>
    );
  }
  if (spots <= 3) {
    return (
      <span className="rounded-full border border-accent px-3 py-1 font-mono text-xs text-accent">
        {spots} left
      </span>
    );
  }
  return (
    <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
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
    <article className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-muted">
            {formatDay(item.starts_at)} &middot; {formatTime(item.starts_at)}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{item.class_name}</h3>
          <p className="mt-1 text-sm text-muted">
            {item.trainer_name} &middot; {item.duration_min} min
          </p>
        </div>
        <SpotsPill spots={item.spots_left} booked={isBooked} />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        {errorMsg ? (
          <p className="text-xs text-danger">{errorMsg}</p>
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
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book"}
          </button>
        )}
      </div>
    </article>
  );
}