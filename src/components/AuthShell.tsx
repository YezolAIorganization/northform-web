import type { CSSProperties, ReactNode } from "react";
import FloatingOrbs from "@/components/motion/FloatingOrbs";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  size?: "default" | "wide";
  children: ReactNode;
};

const delay = (ms: number) =>
  ({ "--nf-delay": `${ms}ms` }) as CSSProperties;

export default function AuthShell({
  eyebrow,
  title,
  description,
  size = "default",
  children,
}: AuthShellProps) {
  return (
    <main className="relative isolate flex flex-1 items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <FloatingOrbs />

      <div className={`w-full ${size === "wide" ? "max-w-2xl" : "max-w-md"}`}>
        <div className="mb-8 text-center">
          <div
            className="nf-rise inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent"
            style={delay(0)}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {eyebrow}
          </div>

          <h1
            className="nf-rise mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
            style={delay(120)}
          >
            {title}
          </h1>

          {description && (
            <p
              className="nf-rise mt-3 text-sm leading-relaxed text-muted sm:text-base"
              style={delay(240)}
            >
              {description}
            </p>
          )}
        </div>

        <div className="nf-rise" style={delay(360)}>
          <div className="relative rounded-3xl border border-border bg-surface/60 p-6 shadow-[0_0_80px_-30px_rgba(255,91,46,0.45),0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}