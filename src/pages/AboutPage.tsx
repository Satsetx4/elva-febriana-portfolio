import { motion } from 'framer-motion';
import {
  CalendarClock,
  Clock,
  Download,
  MessageSquare,
  Palette,
  Printer,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { Testimonials } from '../components/proof/Testimonials';
import { WorkSamples } from '../components/proof/WorkSamples';
import {
  EDUCATION,
  PROFILE,
  SKILLS,
  TESTIMONIALS,
  WORK_PILLARS,
  WORK_SAMPLES,
} from '../data/profile';
import { staggerContainer, staggerItem } from '../lib/motion';
import { trackEvent } from '../lib/storage';
import type { SkillItem, WorkPillar } from '../types/portfolio';

const PILLAR_ICONS: Record<WorkPillar['iconName'], LucideIcon> = {
  Clock,
  ShieldCheck,
  Users,
  Sparkles,
};

const SKILL_ICONS: Record<string, LucideIcon> = {
  teamwork: Users,
  adaptability: Zap,
  'time-management': CalendarClock,
  communication: MessageSquare,
  'event-coordination': Sparkles,
  canva: Palette,
};

const SKILL_CATEGORY_LABELS: Record<SkillItem['category'], string> = {
  soft: 'Karakter & Komunikasi',
  operational: 'Operasional',
  digital: 'Digital & Administrasi',
};

export function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-16">
      <AppHeader
        title="Profil & Karakter Kerja"
        breadcrumbLabel="Tentang"
        backTo="/"
      />

      {/* Print / PDF Bar & Narrative Bio */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-5">
          <p className="eyebrow">Ringkasan Profil</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-ink leading-tight">
            {PROFILE.name} — {PROFILE.headline}
          </h2>
          <p className="body-lg">{PROFILE.summary}</p>
          <p className="body-lg">
            Berdomisili di {PROFILE.city}, saya terbiasa menjaga standar
            pelayanan yang ramah dan rapi, baik saat meracik minuman di balik
            bar maupun saat mengoordinasikan kegiatan bersama tim di sekolah.
          </p>
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-line bg-surface p-6 space-y-5">
          <div className="space-y-1">
            <p className="meta">Minat Akademik ({EDUCATION.major})</p>
            <p className="font-serif text-2xl font-semibold text-ink">
              {EDUCATION.school}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {EDUCATION.electives.map((subject) => (
              <span
                key={subject}
                className="rounded-full border border-line bg-bg px-3 py-1 text-[13px] font-medium text-ink"
              >
                {subject}
              </span>
            ))}
          </div>
          <div className="pt-4 border-t border-line no-print space-y-2.5">
            {PROFILE.cvUrl && (
              <a
                href={PROFILE.cvUrl}
                download
                onClick={() => trackEvent('cta_click', 'download_cv')}
                className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-ink text-bg px-4 py-2.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <Download className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
                <span>Unduh CV (PDF)</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-line bg-bg px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-gold hover:bg-gold-soft/60 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Printer
                className="w-4 h-4 text-gold"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4 Work Pillars */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-40px' }}
        className="space-y-6"
      >
        <div className="border-b border-line pb-4">
          <p className="eyebrow">Etos &amp; Prinsip</p>
          <h2 className="font-serif text-3xl font-medium text-ink mt-1">
            Empat Pilar Karakter Kerja
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {WORK_PILLARS.map((pillar) => {
            const IconComponent = PILLAR_ICONS[pillar.iconName];
            return (
              <motion.div
                key={pillar.id}
                variants={staggerItem}
                className="rounded-2xl border border-line bg-surface p-6 space-y-3"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft text-gold">
                  <IconComponent
                    className="w-5 h-5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-serif text-2xl font-medium text-ink">
                  {pillar.title}
                </h3>
                <p className="body">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* All Skills */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-40px' }}
        className="space-y-6"
      >
        <div className="border-b border-line pb-4">
          <p className="eyebrow">Kompetensi Utama</p>
          <h2 className="font-serif text-3xl font-medium text-ink mt-1">
            Keahlian &amp; Keterampilan ({SKILLS.length})
          </h2>
        </div>

        <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
          {SKILLS.map((skill) => {
            const IconComponent = SKILL_ICONS[skill.id] ?? Sparkles;
            return (
              <motion.div
                key={skill.id}
                variants={staggerItem}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-gold">
                    <IconComponent
                      className="w-4 h-4"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans text-lg font-semibold text-ink">
                      {skill.label}
                    </h3>
                    <p className="body">{skill.context}</p>
                  </div>
                </div>
                <span className="self-start sm:self-center shrink-0 pill bg-gold-soft text-gold-ink">
                  {SKILL_CATEGORY_LABELS[skill.category]}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <WorkSamples samples={WORK_SAMPLES} />
      <Testimonials items={TESTIMONIALS} />
    </div>
  );
}
