"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function cancelBooking(bookingId: string) {
  const supabase = await createClient();

  const { error } = await supabase.rpc("cancel_booking", {
    p_booking_id: bookingId,
  });

  if (error) {
    const message = error.message;
    if (message.includes("too_late") || message.includes("class_started")) {
      return {
        success: false,
        error: "Too late to cancel. Classes lock 2 hours before start.",
      };
    }
    if (message.includes("booking_not_found")) {
      return { success: false, error: "Booking not found." };
    }
    return { success: false, error: "Unable to cancel booking. Please try again." };
  }

  revalidatePath("/bookings");
  revalidatePath("/schedule");
  return { success: true };
}