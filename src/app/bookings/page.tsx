import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import BookingsClient from "./BookingsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "My Bookings | Northform",
  description: "Manage your upcoming and past training sessions.",
};

export type BookingRow = {
  booking_id: string;
  status: "booked" | "cancelled";
  booked_at: string;
  cancelled_at: string | null;
  class_id: string;
  starts_at: string;
  duration_min: number;
  class_name: string;
  trainer_name: string;
};

export default async function BookingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/bookings");
  }

  const { data, error } = await supabase
    .from("my_bookings")
    .select(
      "booking_id, status, booked_at, cancelled_at, class_id, starts_at, duration_min, class_name, trainer_name",
    )
    .order("starts_at", { ascending: true });

  const bookings = (data ?? []) as BookingRow[];

  return (
    <main className="flex-1">
      <PageHeader
        eyebrow="Dashboard"
        title="My bookings"
        description="Manage your upcoming training sessions or review past history."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {error ? (
          <p className="text-danger">
            Something went wrong loading your bookings. Please try again.
          </p>
        ) : (
          <div className="max-w-4xl">
            <BookingsClient initialBookings={bookings} />
          </div>
        )}
      </section>
    </main>
  );
}