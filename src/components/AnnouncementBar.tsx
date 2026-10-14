import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="relative z-40 border-b border-border bg-surface/90 text-foreground backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 py-2.5 text-xs font-medium sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          <p className="text-center sm:hidden text-muted">
            Max 12 per class &middot; First session free
          </p>
          <p className="hidden sm:block text-muted">
            Max 12 per class &middot; Book up to 14 days ahead &middot; First session complimentary
          </p>
        </div>

        <Link
          href="/trial"
          className="hidden items-center gap-1 font-semibold text-accent transition-colors hover:text-accent-hover sm:inline-flex"
        >
          <span>Book a free trial</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </aside>
  );
}