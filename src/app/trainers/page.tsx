import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trainers | Northform",
  description: "Coaches who explain the why. Expert strength and conditioning guidance.",
};

type Trainer = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url?: string;
};

// Default fallback athletic portraits if database image_url is null
const defaultPhotos: Record<string, string> = {
  "Elena Vasquez": "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=800",
  "Marcus Bell": "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800",
  "Aiko Tanaka": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
};

export default async function TrainersPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("trainers")
    .select("id, name, role, bio")
    .order("name");

  const trainers = (data ?? []) as Trainer[];

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-sm text-accent">&gt; coaches</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Coaches who explain the why.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Our coaches bring decades of combined experience in powerlifting, athletic conditioning, and movement mechanics.
        </p>

        {error ? (
          <p className="mt-10 text-danger">
            Something went wrong loading trainers. Please try again.
          </p>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {trainers.map((trainer) => {
              const photoUrl = trainer.image_url || defaultPhotos[trainer.name];

              return (
                <article
                  key={trainer.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/60"
                >
                  <div className="relative h-72 w-full overflow-hidden bg-background">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={trainer.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-heading text-4xl font-bold text-accent">
                        {trainer.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent" />
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold">{trainer.name}</h2>
                    <p className="mt-1 font-mono text-xs text-accent">{trainer.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {trainer.bio}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}