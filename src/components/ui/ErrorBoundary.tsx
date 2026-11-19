import { Component } from 'react';
import type { ReactNode } from 'react';
import { RotateCcw } from 'lucide-react';

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state: { hasError: boolean } = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-bg px-6 py-16 text-ink">
          <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-8 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Terjadi Kendala
            </p>
            <h1 className="mt-3 font-serif text-3xl font-medium text-ink">
              Halaman Perlu Dimuat Ulang
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Maaf, tampilan mengalami gangguan sementara. Silakan muat ulang halaman untuk melanjutkan.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold/50 bg-gold-soft px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:border-gold hover:bg-gold hover:text-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              <span>Muat Ulang Halaman</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
