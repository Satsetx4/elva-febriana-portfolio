import { Quote } from 'lucide-react';
import type { Testimonial } from '../../types/portfolio';

export function Testimonials({ items }: { items: Testimonial[] }) {
  const approved = items.filter((t) => t.consent === true);
  if (approved.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="border-b border-line pb-4">
        <p className="eyebrow">Referensi</p>
        <h2 className="font-serif text-3xl font-medium text-ink mt-1">
          Kata Rekan &amp; Pembina
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {approved.map((t) => (
          <figure
            key={t.id}
            className="flex flex-col justify-between gap-5 rounded-2xl border border-line bg-surface p-6 sm:p-7"
          >
            <div className="space-y-4">
              <Quote
                className="h-5 w-5 text-gold"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <blockquote className="body-lg text-ink">“{t.quote}”</blockquote>
            </div>

            <figcaption className="border-t border-line pt-4 space-y-0.5">
              <p className="font-sans text-base font-semibold text-ink">
                {t.name}
              </p>
              <p className="meta">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
