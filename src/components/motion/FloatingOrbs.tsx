type FloatingOrbsProps = {
  className?: string;
};

export default function FloatingOrbs({ className = "" }: FloatingOrbsProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div className="nf-orb nf-orb-a" />
      <div className="nf-orb nf-orb-b" />
      <div className="nf-orb nf-orb-c" />
    </div>
  );
}