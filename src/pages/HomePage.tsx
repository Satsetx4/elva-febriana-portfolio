import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Coffee,
  MessageCircle,
  Palette,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MetricsStrip } from '../components/proof/MetricsStrip';
import { ProofGalleryTeaser } from '../components/proof/ProofGalleryTeaser';
import { StatusBadge } from '../components/ui/StatusBadge';
import { METRICS, PROFILE, PROOF_PHOTOS } from '../data/profile';
import {
  EASE_EDITORIAL,
  staggerContainer,
  staggerItem,
  wordRevealVariants,
} from '../lib/motion';
import { trackEvent } from '../lib/storage';

const HERO_WORDS = ['Elva', 'Febriana'];

export function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const waHref = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(
    'Halo Elva, saya melihat portofolio digital Anda dan ingin berdiskusi lebih lanjut.',
  )}`;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20 space-y-20 sm:space-y-28">
      {/* Minimalist Editorial Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-7">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="eyebrow">Probolinggo · Portofolio Digital</span>
            <StatusBadge />
          </motion.div>

          <div className="space-y-3">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-ink leading-[0.98]">
              <span className="inline-flex flex-wrap gap-x-4 overflow-hidden">
                {HERO_WORDS.map((word, index) => (
                  <motion.span
                    key={word}
                    variants={wordRevealVariants}
                    initial={shouldReduceMotion ? false : 'initial'}
                    animate="animate"
                    transition={{ delay: index * 0.08 }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.span
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: EASE_EDITORIAL }}
                className="block mt-2 font-serif italic font-medium text-3xl sm:text-4xl lg:text-[2.65rem] text-gold-ink leading-snug"
              >
                Teliti, cekatan &amp; bertanggung jawab
              </motion.span>
            </h1>
          </div>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: EASE_EDITORIAL }}
            className="body-lg max-w-xl"
          >
            {PROFILE.summaryShort}
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_EDITORIAL }}
            className="flex flex-wrap items-center gap-3.5 pt-1"
          >
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('wa_click', 'hero_wa')}
              className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-ink text-bg px-6 py-3.5 text-[15px] font-medium transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              <span>Hubungi via WhatsApp</span>
            </a>

            <Link
              to="/pengalaman"
              onClick={() => trackEvent('cta_click', 'hero_explore')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-[15px] font-medium text-ink transition-colors duration-200 hover:border-gold hover:bg-gold-soft/60 active:scale-[0.98]"
            >
              <span>Lihat Pengalaman</span>
              <ArrowUpRight className="w-4 h-4 text-gold" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        {/* Editorial Portrait Frame */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE_EDITORIAL }}
          className="order-first lg:order-none lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="flex flex-col items-center max-w-xs text-center">
            <div className="inline-flex rounded-full p-2.5 border border-gold/60 bg-surface">
              <div className="inline-flex rounded-full p-2 border border-gold/60">
                <img
                  src={PROFILE.avatar}
                  alt={PROFILE.name}
                  width={320}
                  height={320}
                  className="w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full object-cover object-center shrink-0 block"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-sans text-base font-medium text-ink text-balance">
                {PROFILE.headline}
              </p>
              <p className="meta mt-1">{PROFILE.city}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Asymmetric 12-Column Editorial Magazine Showcase */}
      <motion.section
        variants={staggerContainer}
        initial={shouldReduceMotion ? false : 'initial'}
        whileInView="animate"
        viewport={{ once: true, margin: '-60px' }}
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="eyebrow">Sorotan Rekam Jejak</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ink mt-1">
              Operasional Outlet, Organisasi &amp; Kreativitas
            </h2>
          </div>
          <Link
            to="/tentang"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink transition-colors"
          >
            <span>Selengkapnya tentang profil</span>
            <ArrowUpRight className="w-4 h-4 text-gold" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Wide Featured Barista Block (7 cols) */}
          <motion.div variants={staggerItem} className="lg:col-span-7">
            <Link
              to="/pengalaman"
              className="group flex flex-col justify-between h-full rounded-2xl border border-line bg-surface p-7 sm:p-9 transition-colors duration-200 hover:border-gold"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="pill bg-gold-soft text-gold-ink">
                    <Coffee className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
                    <span>Pengalaman Kerja · 4 Bulan</span>
                  </span>
                  <ArrowUpRight
                    className="w-5 h-5 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-ink">
                    Barista di Teh Kota Mastrip
                  </h3>
                  <p className="body">
                    Menjaga konsistensi racikan minuman sesuai SOP outlet, mencatat serta
                    merekap hasil penjualan harian dengan teliti, dan memastikan kebersihan
                    area kerja serta ketersediaan stok bahan tetap terjaga.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-line">
                {METRICS.length > 0 ? (
                  <MetricsStrip metrics={METRICS} compact />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                    <div>
                      <p className="meta">Standar</p>
                      <p className="font-sans text-base font-semibold text-ink mt-0.5">
                        SOP &amp; Takaran
                      </p>
                    </div>
                    <div>
                      <p className="meta">Administrasi</p>
                      <p className="font-sans text-base font-semibold text-ink mt-0.5">
                        Rekap Harian
                      </p>
                    </div>
                    <div>
                      <p className="meta">Outlet</p>
                      <p className="font-sans text-base font-semibold text-ink mt-0.5">
                        Stok &amp; Kebersihan
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>

          {/* Split Right Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div variants={staggerItem} className="flex-1">
              <Link
                to="/pendidikan"
                className="group flex flex-col justify-between h-full rounded-2xl border border-line bg-surface p-6 sm:p-7 transition-colors duration-200 hover:border-gold"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-gold-ink">
                      <Users className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} />
                      <span>OSIS SMAN 3 Probolinggo · 2023/2024</span>
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-muted shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-ink">
                    Koordinasi Acara &amp; Stand Bazar
                  </h3>
                  <p className="body">
                    Mengoordinasikan pelaksanaan acara sekolah tepat waktu, mengelola promosi
                    dan penjualan bazar, hingga menyusun surat permohonan juri.
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={staggerItem} className="flex-1">
              <Link
                to="/tentang"
                className="group flex flex-col justify-between h-full rounded-2xl border border-line bg-surface p-6 sm:p-7 transition-colors duration-200 hover:border-gold"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-gold-ink">
                      <Palette className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} />
                      <span>Kreativitas &amp; Ekspresi · 2024/2025</span>
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-muted shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-ink">
                    Teater Sekolah &amp; Desain Canva
                  </h3>
                  <p className="body">
                    Aktif sebagai pemain pementasan drama Teater SMAN 3 serta terampil
                    membuat materi visual promosi menggunakan Canva dan perangkat laptop.
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-sm text-muted">
          <span>Ingin melihat pemahaman alur kerja outlet?</span>
          <Link
            to="/pengalaman#simulasi"
            onClick={() => trackEvent('cta_click', 'home_simulator_link')}
            className="inline-flex items-center gap-1.5 font-medium text-ink hover:text-gold-ink transition-colors"
          >
            <span>Buka simulasi bonus di halaman Pengalaman</span>
            <ArrowUpRight className="w-4 h-4 text-gold" strokeWidth={1.5} />
          </Link>
        </div>
      </motion.section>

      <ProofGalleryTeaser photos={PROOF_PHOTOS.slice(0, 3)} viewAllTo="/pengalaman" />
      {PROOF_PHOTOS.length === 0 && METRICS.length > 0 ? (
        <MetricsStrip metrics={METRICS} />
      ) : null}
    </div>
  );
}
