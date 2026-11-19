import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { curtainVariants, pageContentVariants } from '../../lib/motion';

export function PageCurtain({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  if (shouldReduceMotion) {
    return <div className="min-h-[60vh]">{children}</div>;
  }

  return (
    <div className="relative min-h-[60vh]">
      <motion.div
        aria-hidden="true"
        variants={curtainVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pointer-events-none fixed inset-0 z-50 border-b border-gold/30 bg-gold-soft/90 backdrop-blur-xs"
      />
      <motion.div
        variants={pageContentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </div>
  );
}
