"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function bookClass(classId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "not_authenticated" };
  }

  const { error } = await supabase.rpc("book_class", { p_class_id: classId });

  if (error) {
    const message = error.message;
    if (message.includes("already_booked")) {
      return { success: false, error: "You are already booked for this class." };
    }
    if (message.includes("class_full")) {
      return { success: false, error: "This class is currently full." };
    }
    if (message.includes("class_started") || message.includes("too_late")) {
      return { success: false, error: "This class has already started or is locked." };
    }
    if (message.includes("too_far_ahead")) {
      return { success: false, error: "Bookings are only open up to 14 days ahead." };
    }
    return { success: false, error: "Unable to book class. Please try again." };
  }

  revalidatePath("/schedule");
  return { success: true };
}