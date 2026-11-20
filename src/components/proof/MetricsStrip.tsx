import type { Metric } from '../../types/portfolio';

export function MetricsStrip({
  metrics,
  compact = false,
}: {
  metrics: Metric[];
  compact?: boolean;
}) {
  if (metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="rounded-2xl border border-line bg-surface p-5 space-y-1"
        >
          <p className="font-serif text-2xl sm:text-3xl font-semibold text-ink">
            {metric.value}
          </p>
          <p className="text-sm font-medium text-ink">{metric.label}</p>
          {!compact && <p className="meta pt-0.5">{metric.source}</p>}
        </div>
      ))}
    </div>
  );
}
