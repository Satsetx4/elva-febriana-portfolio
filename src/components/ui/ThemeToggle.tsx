import { Moon, Sun } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { EASE_EDITORIAL } from '../../lib/motion';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { isDark, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const label = isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`.trim()}
    >
      <motion.span
        key={isDark ? 'sun' : 'moon'}
        initial={shouldReduceMotion ? false : { rotate: -30, opacity: 0, scale: 0.85 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.28,
          ease: EASE_EDITORIAL,
        }}
        className="inline-flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Moon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden="true" />
        )}
      </motion.span>
    </button>
  );
}
