"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitTrialRequest(formData: FormData) {
  const honeypot = formData.get("website") as string;
  // Bot check: if the hidden honeypot field is filled, pretend it succeeded
  if (honeypot) {
    return { success: true };
  }

  const fullName = (formData.get("fullName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const preferredClass = formData.get("preferredClass") as string;
  const notes = (formData.get("notes") as string)?.trim() || null;

  if (!fullName || !email || !preferredClass) {
    return { success: false, error: "Please fill out all required fields." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("trial_requests").insert({
    full_name: fullName,
    email: email,
    preferred_class: preferredClass,
    notes: notes,
  });

  if (error) {
    return {
      success: false,
      error: "Unable to submit your request. Please try again.",
    };
  }

  return { success: true };
}