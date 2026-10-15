import type { CSSProperties, ReactNode } from "react";
import FloatingOrbs from "@/components/motion/FloatingOrbs";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
};

const delay = (ms: number) =>
  ({ "--nf-delay": `${ms}ms` }) as CSSProperties;

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative isolate border-b border-border/60">
      <FloatingOrbs />

      <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-24">
        <div
          className="nf-rise inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent"
          style={delay(0)}
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          {eyebrow}
        </div>

        <h1
          className="nf-rise mt-4 text-4xl font-bold tracking-tight sm:text-6xl"
          style={delay(120)}
        >
          {title}
        </h1>

        {description && (
          <p
            className="nf-rise mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            style={delay(260)}
          >
            {description}
          </p>
        )}

        {children && (
          <div className="nf-rise mt-8" style={delay(380)}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}