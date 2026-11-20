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
      className="no-print fixed hidden md:inline-flex md:bottom-6 md:right-6 z-40 min-h-[44px] items-center justify-center gap-2 rounded-full border border-gold/40 bg-surface/95 px-4 py-2.5 text-sm font-medium text-ink shadow-md backdrop-blur-md transition-colors hover:border-gold hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <MessageCircle className="h-4 w-4 text-gold" strokeWidth={1.5} aria-hidden="true" />
      <span>Chat WhatsApp</span>
    </motion.a>
  );
}
