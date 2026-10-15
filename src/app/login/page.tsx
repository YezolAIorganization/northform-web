import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import AuthShell from "@/components/AuthShell";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Log in | Northform" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/schedule");

  return (
    <AuthShell
      eyebrow="Log in"
      title="Welcome back."
      description="Log in to book classes and manage your sessions."
    >
      <AuthForm mode="login" next={next ?? "/schedule"} />
    </AuthShell>
  );
}