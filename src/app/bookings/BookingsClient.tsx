"use client";

import { useState, type CSSProperties } from "react";
import { formatDay, formatTime } from "@/lib/format";
import { cancelBooking } from "./actions";
import type { BookingRow } from "./page";
import Button from "@/components/Button";

const delay = (ms: number) =>
  ({ "--nf-delay": `${ms}ms` }) as CSSProperties;

const tabClass = (active: boolean) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
    active
      ? "bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(255,91,46,0.35)]"
      : "text-muted hover:text-foreground"
  }`;

export default function BookingsClient({
  initialBookings,
}: {
  initialBookings: BookingRow[];
}) {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const now = new Date();

  const activeBookings = initialBookings.filter(
    (b) => b.status === "booked" && new Date(b.starts_at) >= now,
  );

  const pastBookings = initialBookings.filter(
    (b) => b.status === "cancelled" || new Date(b.starts_at) < now,
  );

  const displayed = tab === "upcoming" ? activeBookings : pastBookings;

  async function handleCancel(bookingId: string) {
    setCancellingId(bookingId);
    setErrorMsg(null);

    const res = await cancelBooking(bookingId);
    setCancellingId(null);
    setConfirmId(null);

    if (!res.success) {
      setErrorMsg(res.error || "Failed to cancel booking.");
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Booking history"
        className="inline-flex gap-1 rounded-full border border-border bg-surface/60 p-1 backdrop-blur-xl"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "upcoming"}
          onClick={() => setTab("upcoming")}
          className={tabClass(tab === "upcoming")}
        >
          Upcoming ({activeBookings.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "past"}
          onClick={() => setTab("past")}
          className={tabClass(tab === "past")}
        >
          Past &amp; History ({pastBookings.length})
        </button>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="nf-rise mt-6 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
        >
          {errorMsg}
        </div>
      )}

      <div key={tab} className="mt-8 space-y-4">
        {displayed.length === 0 ? (
          <div
            data-glow
            className="nf-rise relative rounded-2xl border border-dashed border-border p-12 text-center"
          >
            <p className="font-semibold">
              {tab === "upcoming"
                ? "Nothing booked yet. Your next session is one tap away."
                : "No past bookings found."}
            </p>
            {tab === "upcoming" && (
              <div className="mt-6">
                <Button href="/schedule">Browse schedule</Button>
              </div>
            )}
          </div>
        ) : (
          displayed.map((item, i) => {
            const isUpcoming = tab === "upcoming" && item.status === "booked";
            const isCancelling = cancellingId === item.booking_id;
            const isConfirming = confirmId === item.booking_id;

            return (
              <article
                key={item.booking_id}
                data-glow
                style={delay(Math.min(i, 6) * 70)}
                className="nf-rise relative flex flex-col justify-between gap-4 rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-sm sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    {isUpcoming && <span className="nf-pulse" aria-hidden="true" />}
                    <p className="font-mono text-xs text-muted">
                      {formatDay(item.starts_at)} &middot; {formatTime(item.starts_at)}
                    </p>
                    {item.status === "cancelled" && (
                      <span className="rounded-full border border-danger/40 bg-danger/10 px-2 py-0.5 font-mono text-[10px] text-danger">
                        Cancelled
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold">{item.class_name}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {item.trainer_name} &middot; {item.duration_min} min
                  </p>
                </div>

                {isUpcoming && (
                  <div className="flex items-center gap-3">
                    {isConfirming ? (
                      <div className="nf-rise flex flex-col gap-2 rounded-xl border border-border bg-background p-3 sm:flex-row sm:items-center">
                        <p className="text-xs text-muted">Cancel this class?</p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setConfirmId(null)}
                            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface"
                          >
                            Keep booking
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCancel(item.booking_id)}
                            disabled={isCancelling}
                            className="rounded-lg bg-danger px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
                          >
                            {isCancelling ? "Cancelling..." : "Cancel class"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmId(item.booking_id)}
                        className="text-xs font-semibold text-muted transition-colors hover:text-danger"
                      >
                        Cancel booking
                      </button>
                    )}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}