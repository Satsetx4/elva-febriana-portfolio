import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProofPhoto } from '../../types/portfolio';
import { ProofGallery } from './ProofGallery';

export function ProofGalleryTeaser({
  photos,
  viewAllTo = '/pengalaman',
}: {
  photos: ProofPhoto[];
  viewAllTo?: string;
}) {
  if (photos.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <p className="eyebrow">Dokumentasi</p>
          <h2 className="font-serif text-3xl font-medium text-ink mt-1">
            Bukti Kerja
          </h2>
        </div>

        <Link
          to={viewAllTo}
          className="inline-flex min-h-[44px] items-center gap-1.5 self-start sm:self-auto text-sm font-medium text-ink transition-colors hover:text-gold-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <span>Lihat semua bukti</span>
          <ArrowUpRight
            className="h-4 w-4 text-gold"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </Link>
      </div>

      <ProofGallery photos={photos} />
    </section>
  );
}
