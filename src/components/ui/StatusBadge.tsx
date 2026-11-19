import { useReducedMotion } from 'framer-motion';

export function StatusBadge({
  label = 'Siap Bekerja · Lulusan 2026',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/90 px-3.5 py-1.5 text-xs font-medium tracking-wide text-ink shadow-xs ${className}`.trim()}
    >
      <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
        {!shouldReduceMotion && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-65" />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
      </span>
      <span>{label}</span>
    </span>
  );
}
