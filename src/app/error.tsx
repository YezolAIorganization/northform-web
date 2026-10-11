"use client";

import Button from "@/components/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="font-mono text-sm text-danger">&gt; system error</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Something went wrong</h1>
        <p className="mt-4 text-muted">
          An unexpected error occurred while loading this page.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="h-12 rounded-xl bg-accent px-6 font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Try again
          </button>
          <Button href="/" variant="secondary">
            Go home
          </Button>
        </div>
      </div>
    </main>
  );
}