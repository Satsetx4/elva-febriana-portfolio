import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { WorkSample } from '../../types/portfolio';

export function WorkSamples({ samples }: { samples: WorkSample[] }) {
  const [activeSample, setActiveSample] = useState<WorkSample | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeSample) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [activeSample]);

  if (samples.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="border-b border-line pb-4">
        <p className="eyebrow">Karya Visual</p>
        <h2 className="font-serif text-3xl font-medium text-ink mt-1">
          Contoh Desain Canva
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {samples.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => setActiveSample(sample)}
            className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold cursor-pointer"
          >
            <div className="w-full overflow-hidden border-b border-line bg-bg">
              <img
                loading="lazy"
                src={sample.image}
                alt={sample.alt}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between gap-3 p-5">
              <div className="space-y-1.5">
                <h3 className="font-sans text-lg font-semibold text-ink">
                  {sample.title}
                </h3>
                <p className="body">{sample.purpose}</p>
              </div>
              <p className="meta">
                {sample.tool} · {sample.year}
              </p>
            </div>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setActiveSample(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setActiveSample(null);
          }
        }}
        aria-label={
          activeSample
            ? `Pratinjau desain: ${activeSample.title}`
            : 'Pratinjau karya visual'
        }
        className="m-auto w-[calc(100%-2rem)] max-w-3xl rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-xs"
      >
        {activeSample && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
              <p className="meta">
                {activeSample.tool} · {activeSample.year}
              </p>
              <button
                type="button"
                onClick={() => setActiveSample(null)}
                aria-label="Tutup pratinjau desain"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-line bg-bg text-ink transition-colors hover:border-gold hover:bg-gold-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-hidden rounded-xl bg-bg">
              <img
                src={activeSample.image}
                alt={activeSample.alt}
                className="max-h-[68vh] w-full h-auto object-contain"
              />
            </div>

            <div className="space-y-1">
              <h3 className="font-sans text-lg font-semibold text-ink">
                {activeSample.title}
              </h3>
              <p className="body">{activeSample.purpose}</p>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
