import { MessageCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { PROFILE } from '../../data/profile';
import { trackEvent } from '../../lib/storage';

export function FloatingWhatsApp() {
  const shouldReduceMotion = useReducedMotion();

  const message = encodeURIComponent(
    `Halo ${PROFILE.name}, saya melihat portofolio Anda dan tertarik untuk berdiskusi mengenai peluang kerja.`,
  );
  const href = `https://wa.me/${PROFILE.whatsapp}?text=${message}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('wa_click', 'floating_wa')}
      aria-label="Hubungi Elva Febriana melalui WhatsApp"
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      className="no-print fixed bottom-20 right-3 z-40 inline-flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gold/40 bg-surface/95 p-0 text-xs font-medium tracking-wide text-ink shadow-md backdrop-blur-md transition-colors hover:border-gold hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:bottom-6 sm:right-6 sm:h-auto sm:min-h-[44px] sm:w-auto sm:px-4 sm:py-2.5"
    >
      <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </motion.a>
  );
}
