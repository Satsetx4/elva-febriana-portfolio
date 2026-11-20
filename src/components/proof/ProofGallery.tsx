import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ProofPhoto } from '../../types/portfolio';

export function ProofGallery({
  photos,
  heading,
  eyebrow,
}: {
  photos: ProofPhoto[];
  heading?: string;
  eyebrow?: string;
}) {
  const [activePhoto, setActivePhoto] = useState<ProofPhoto | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activePhoto) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [activePhoto]);

  if (photos.length === 0) return null;

  return (
    <div className="space-y-6">
      {(eyebrow || heading) && (
        <div className="border-b border-line pb-4">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {heading && (
            <h2 className="font-serif text-3xl font-medium text-ink mt-1">
              {heading}
            </h2>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {photos.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActivePhoto(p)}
            className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold cursor-pointer"
          >
            <figure className="flex h-full w-full flex-col">
              <div className="w-full overflow-hidden bg-bg">
                <img
                  loading="lazy"
                  width={p.width}
                  height={p.height}
                  src={p.src}
                  srcSet={
                    p.srcSmall ? `${p.srcSmall} 640w, ${p.src} 1280w` : undefined
                  }
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={p.alt}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <figcaption className="p-4 text-sm text-muted bg-surface border-t border-line flex-1">
                {p.caption}
              </figcaption>
            </figure>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setActivePhoto(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setActivePhoto(null);
          }
        }}
        aria-label={
          activePhoto
            ? `Pratinjau foto: ${activePhoto.alt}`
            : 'Pratinjau dokumentasi foto'
        }
        className="m-auto w-[calc(100%-2rem)] max-w-3xl rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-xs"
      >
        {activePhoto && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
              <p className="meta">Dokumentasi Foto</p>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                aria-label="Tutup pratinjau foto"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-line bg-bg text-ink transition-colors hover:border-gold hover:bg-gold-soft/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-hidden rounded-xl bg-bg">
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                width={activePhoto.width}
                height={activePhoto.height}
                className="max-h-[70vh] w-full h-auto object-contain"
              />
            </div>

            <p className="body">{activePhoto.caption}</p>
          </div>
        )}
      </dialog>
    </div>
  );
}
