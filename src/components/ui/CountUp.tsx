import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { EASE_EDITORIAL } from '../../lib/motion';

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  className = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(() =>
    shouldReduceMotion ? value : 0,
  );
  const previousValueRef = useRef<number>(shouldReduceMotion ? value : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      previousValueRef.current = value;
      return;
    }

    if (!isInView) return;

    const from = previousValueRef.current;
    const controls = animate(from, value, {
      duration: 0.75,
      ease: EASE_EDITORIAL,
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
      onComplete: () => {
        setDisplayValue(value);
        previousValueRef.current = value;
      },
    });

    return () => {
      controls.stop();
    };
  }, [value, isInView, shouldReduceMotion]);

  const formatted = (shouldReduceMotion ? value : displayValue).toLocaleString('id-ID');

  return (
    <span ref={ref} className={`tabular-nums ${className}`.trim()}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
