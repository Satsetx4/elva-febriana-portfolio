import { Coffee, GraduationCap, Home, Mail, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { EASE_EDITORIAL } from '../../lib/motion';
import type { RoutePath } from '../../types/portfolio';

const MOBILE_ITEMS: ReadonlyArray<{
  to: RoutePath;
  label: string;
  Icon: LucideIcon;
}> = [
  { to: '/', label: 'Beranda', Icon: Home },
  { to: '/tentang', label: 'Tentang', Icon: User },
  { to: '/pengalaman', label: 'Kerja', Icon: Coffee },
  { to: '/pendidikan', label: 'Studi', Icon: GraduationCap },
  { to: '/kontak', label: 'Kontak', Icon: Mail },
];

export function MobileBottomNav() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Navigasi seluler"
      className="no-print fixed right-0 bottom-0 left-0 z-40 border-t border-line bg-surface/95 backdrop-blur-lg md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 px-1.5 py-1.5">
        {MOBILE_ITEMS.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `relative flex min-h-[48px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                isActive ? 'text-ink' : 'text-muted hover:text-ink'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="mobileGoldPill"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.3, ease: EASE_EDITORIAL }
                    }
                    className="absolute inset-0.5 -z-10 rounded-xl border border-gold/30 bg-gold-soft/80"
                  />
                )}
                <Icon
                  className={`h-[18px] w-[18px] ${isActive ? 'text-gold' : ''}`}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
