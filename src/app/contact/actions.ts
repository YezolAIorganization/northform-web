"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactMessage(formData: FormData) {
  const honeypot = formData.get("website") as string;
  if (honeypot) {
    return { success: true };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const message = (formData.get("message") as string)?.trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill out all fields." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    message,
  });

  if (error) {
    return {
      success: false,
      error: "Unable to send message. Please try again.",
    };
  }

  return { success: true };
}