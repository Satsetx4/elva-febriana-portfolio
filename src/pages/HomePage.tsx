import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Coffee,
  ClipboardCheck,
  MessageCircle,
  Palette,
  Sparkles,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/ui/StatusBadge';
import { PROFILE } from '../data/profile';
import {
  EASE_EDITORIAL,
  staggerContainer,
  staggerItem,
  wordRevealVariants,
} from '../lib/motion';
import { trackEvent } from '../lib/storage';

const HERO_WORDS = ['Elva', 'Febriana'];

export function HomePage() {
  const waHref = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(
    'Halo Elva, saya melihat portofolio digital Anda dan ingin berdiskusi lebih lanjut.',
  )}`;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20 space-y-20 sm:space-y-28">
      {/* Minimalist Editorial Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_EDITORIAL }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted font-medium">
              Probolinggo · Portofolio Digital
            </span>
            <StatusBadge />
          </motion.div>

          <div className="space-y-3">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-ink leading-[0.98]">
              <span className="inline-flex flex-wrap gap-x-4 overflow-hidden">
                {HERO_WORDS.map((word, index) => (
                  <motion.span
                    key={word}
                    variants={wordRevealVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.08 }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: EASE_EDITORIAL }}
                className="block mt-2 font-serif italic font-normal text-3xl sm:text-4xl lg:text-[2.65rem] text-gold leading-snug"
              >
                Teliti, cekatan &amp; bertanggung jawab
              </motion.span>
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: EASE_EDITORIAL }}
            className="text-base sm:text-lg text-muted leading-relaxed max-w-xl"
          >
            {PROFILE.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_EDITORIAL }}
            className="flex flex-wrap items-center gap-3.5 pt-1"
          >
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('wa_click', 'hero_wa')}
              className="inline-flex items-center gap-2.5 rounded-full bg-ink text-bg px-6 py-3.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              <span>Hubungi via WhatsApp</span>
            </a>

            <Link
              to="/pengalaman"
              onClick={() => trackEvent('cta_click', 'hero_explore')}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-gold hover:bg-gold-soft/60 active:scale-[0.98]"
            >
              <span>Lihat Pengalaman</span>
              <ArrowUpRight className="w-4 h-4 text-gold" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        {/* Editorial Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE_EDITORIAL }}
          className="lg:col-span-5 flex justify-center lg:justify-end"
        >
          <div className="flex flex-col items-center max-w-xs text-center">
            <div className="inline-flex rounded-full p-2.5 border border-gold/60 bg-surface">
              <div className="inline-flex rounded-full p-2 border border-gold/60">
                <img
                  src={PROFILE.avatar}
                  alt={PROFILE.name}
                  width={320}
                  height={320}
                  className="w-56 h-56 sm:w-64 sm:h-64 rounded-full object-cover object-center shrink-0 block"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-serif text-lg text-ink">{PROFILE.headline}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-muted mt-0.5">
                {PROFILE.city}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Asymmetric 12-Column Editorial Magazine Showcase */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-60px' }}
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-medium">
              Sorotan Rekam Jejak
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink mt-1">
              Operasional Outlet, Organisasi &amp; Kreativitas
            </h2>
          </div>
          <Link
            to="/tentang"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
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
                  <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3.5 py-1 text-xs font-medium text-gold">
                    <Coffee className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Pengalaman Kerja · 4 Bulan</span>
                  </span>
                  <ArrowUpRight
                    className="w-5 h-5 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-serif text-3xl sm:text-4xl text-ink">
                    Barista di Teh Kota Mastrip
                  </h3>
                  <p className="text-sm sm:text-base text-muted leading-relaxed">
                    Menjaga konsistensi racikan minuman sesuai SOP outlet, mencatat serta
                    merekap hasil penjualan harian dengan teliti, dan memastikan kebersihan
                    area kerja serta ketersediaan stok bahan tetap terjaga.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-line grid grid-cols-3 gap-4 text-left">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                    Standar
                  </p>
                  <p className="font-serif text-lg text-ink mt-0.5">SOP &amp; Takaran</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                    Administrasi
                  </p>
                  <p className="font-serif text-lg text-ink mt-0.5">Rekap Harian</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
                    Outlet
                  </p>
                  <p className="font-serif text-lg text-ink mt-0.5">Stok &amp; Kebersihan</p>
                </div>
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
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-gold">
                      <Users className="w-4 h-4" strokeWidth={1.5} />
                      <span>OSIS SMAN 3 Probolinggo · 2023/2024</span>
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-ink">
                    Koordinasi Acara &amp; Stand Bazar
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
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
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-gold">
                      <Palette className="w-4 h-4" strokeWidth={1.5} />
                      <span>Kreativitas &amp; Ekspresi · 2024/2025</span>
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-serif text-2xl text-ink">
                    Teater Sekolah &amp; Desain Canva
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Aktif sebagai pemain pementasan drama Teater SMAN 3 serta terampil
                    membuat materi visual promosi menggunakan Canva dan perangkat laptop.
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Clean Invitation Strip: POS & Outlet Checklist Simulator */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
        className="rounded-2xl border border-line bg-gold-soft/50 p-7 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold font-medium">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Simulasi Interaktif Outlet</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-ink">
            Coba Simulasi Kasir POS &amp; Ceklis Stok Outlet
          </h2>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Lihat bagaimana alur kerja harian barista dijalankan—mulai dari pencatatan
            pesanan minuman, pemotongan stok otomatis, hingga ceklis kebersihan shift buka
            dan tutup.
          </p>
        </div>

        <Link
          to="/pengalaman"
          onClick={() => trackEvent('cta_click', 'home_simulator_strip')}
          className="inline-flex items-center justify-center gap-2.5 shrink-0 rounded-full bg-ink text-bg px-6 py-3.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <ClipboardCheck className="w-4 h-4" strokeWidth={1.5} />
          <span>Buka Simulasi Kerja</span>
        </Link>
      </motion.section>
    </div>
  );
}
