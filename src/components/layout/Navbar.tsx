import { MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { PROFILE } from '../../data/profile';
import { EASE_EDITORIAL } from '../../lib/motion';
import { trackEvent } from '../../lib/storage';
import type { RoutePath } from '../../types/portfolio';
import { ThemeToggle } from '../ui/ThemeToggle';

const NAV_ITEMS: ReadonlyArray<{ to: RoutePath; label: string }> = [
  { to: '/', label: 'Beranda' },
  { to: '/tentang', label: 'Tentang' },
  { to: '/pengalaman', label: 'Pengalaman' },
  { to: '/pendidikan', label: 'Pendidikan' },
  { to: '/kontak', label: 'Kontak' },
];

export function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const waHref = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(
    `Halo ${PROFILE.name}, saya ingin terhubung melalui WhatsApp.`,
  )}`;

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group inline-flex min-h-[44px] items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/45 bg-gold-soft/70 font-sans text-sm font-bold text-ink transition-colors group-hover:border-gold">
            EF
          </span>
          <span className="font-serif text-[22px] font-semibold tracking-tight text-ink">
            {PROFILE.name}
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative inline-flex min-h-[44px] items-center px-3.5 py-2 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navGoldLine"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.32, ease: EASE_EDITORIAL }
                      }
                      className="absolute right-3.5 bottom-1.5 left-3.5 h-[1.5px] rounded-full bg-gold"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('wa_click', 'navbar_wa')}
            aria-label="Hubungi via WhatsApp"
            title="Chat WhatsApp"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <MessageCircle className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
