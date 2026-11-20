import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 sm:py-32 text-center space-y-6">
      <p className="eyebrow">
        Halaman Tidak Ditemukan
      </p>
      <h1 className="font-serif text-7xl sm:text-8xl font-semibold text-ink tracking-tight">
        404
      </h1>
      <p className="body max-w-md mx-auto">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan. Silakan
        kembali ke beranda untuk melihat portofolio Elva Febriana.
      </p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink text-bg px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>
    </div>
  );
}
