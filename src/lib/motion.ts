import type { Variants } from 'framer-motion';

export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

export const curtainVariants: Variants = {
  initial: {
    scaleY: 0,
    originY: 1,
  },
  animate: {
    scaleY: 0,
    originY: 0,
    transition: {
      duration: 0.42,
      ease: EASE_EDITORIAL,
    },
  },
  exit: {
    scaleY: 1,
    originY: 1,
    transition: {
      duration: 0.35,
      ease: EASE_EDITORIAL,
    },
  },
};

export const pageContentVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: EASE_EDITORIAL,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.28,
      ease: EASE_EDITORIAL,
    },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 14,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 320,
      damping: 26,
    },
  },
};

export const wordRevealVariants: Variants = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  animate: {
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.52,
      ease: EASE_EDITORIAL,
    },
  },
};
