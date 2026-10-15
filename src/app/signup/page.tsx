import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import AuthShell from "@/components/AuthShell";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Sign up | Northform" };

export default async function SignupPage({
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
      eyebrow="Sign up"
      title="Create your account."
      description="Join Northform to book classes and track your sessions."
    >
      <AuthForm mode="signup" next={next ?? "/schedule"} />
    </AuthShell>
  );
}