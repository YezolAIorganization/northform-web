type MarqueeProps = {
  items: string[];
  className?: string;
};

export default function Marquee({ items, className = "" }: MarqueeProps) {
  const group = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-10 font-heading text-3xl font-semibold uppercase tracking-tight text-foreground/25 sm:text-5xl"
        >
          {item}
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`nf-marquee ${className}`}>
      <div className="nf-marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}