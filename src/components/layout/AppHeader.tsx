import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function AppHeader({
  title,
  breadcrumbLabel,
  backTo = '/',
}: {
  title: string;
  breadcrumbLabel: string;
  backTo?: string;
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(backTo);
    }
  };

  return (
    <div className="border-b border-line bg-surface/55">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="no-print inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium tracking-wide text-ink transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            <span>Kembali</span>
          </button>

          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
            <Link
              to="/"
              className="inline-flex min-h-[36px] items-center transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Beranda
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} aria-hidden="true" />
            <span className="font-medium text-ink" aria-current="page">
              {breadcrumbLabel}
            </span>
          </nav>
        </div>

        <h1 className="mt-4 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
      </div>
    </div>
  );
}
