import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
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
    <main className="flex-1">
      <section className="mx-auto max-w-md px-4 py-20 sm:px-6">
        <p className="font-mono text-sm text-accent">&gt; log in</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome back.
        </h1>
        <div className="mt-10">
          <AuthForm mode="login" next={next ?? "/schedule"} />
        </div>
      </section>
    </main>
  );
}