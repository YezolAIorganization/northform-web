export default function Loading() {
  return (
    <main className="flex-1 animate-pulse">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="h-4 w-24 rounded bg-surface" />
        <div className="mt-4 h-10 w-64 rounded bg-surface" />
        <div className="mt-4 h-5 w-96 rounded bg-surface" />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="h-40 rounded-2xl border border-border bg-surface" />
          <div className="h-40 rounded-2xl border border-border bg-surface" />
          <div className="h-40 rounded-2xl border border-border bg-surface" />
          <div className="h-40 rounded-2xl border border-border bg-surface" />
        </div>
      </section>
    </main>
  );
}