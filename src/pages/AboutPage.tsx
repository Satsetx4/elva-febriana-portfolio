import { motion } from 'framer-motion';
import {
  Clock,
  Laptop,
  MessageSquare,
  Palette,
  Printer,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  CalendarClock,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { EDUCATION, PROFILE, SKILLS, WORK_PILLARS } from '../data/profile';
import { staggerContainer, staggerItem } from '../lib/motion';
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
  laptop: Laptop,
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
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-medium">
            Ringkasan Profil
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight">
            {PROFILE.name} — {PROFILE.headline}
          </h2>
          <p className="text-base text-muted leading-relaxed">
            {PROFILE.summary}
          </p>
          <p className="text-base text-muted leading-relaxed">
            Berdomisili di {PROFILE.city}, saya terbiasa menjaga standar pelayanan yang
            ramah dan rapi, baik saat meracik minuman di balik bar maupun saat
            mengoordinasikan kegiatan bersama tim di sekolah.
          </p>
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-line bg-surface p-6 space-y-5">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
              Minat Akademik ({EDUCATION.major})
            </p>
            <p className="font-serif text-xl text-ink">{EDUCATION.school}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {EDUCATION.electives.map((subject) => (
              <span
                key={subject}
                className="rounded-full border border-line bg-bg px-3 py-1 text-xs font-medium text-ink"
              >
                {subject}
              </span>
            ))}
          </div>
          <div className="pt-4 border-t border-line no-print">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-line bg-bg px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-gold hover:bg-gold-soft/60 active:scale-[0.98]"
            >
              <Printer className="w-4 h-4 text-gold" strokeWidth={1.5} />
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
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-medium">
            Etos &amp; Prinsip
          </p>
          <h2 className="font-serif text-3xl text-ink mt-1">
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
                  <IconComponent className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-ink">{pillar.title}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* All 7 Skills */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-40px' }}
        className="space-y-6"
      >
        <div className="border-b border-line pb-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-medium">
            Kompetensi Utama
          </p>
          <h2 className="font-serif text-3xl text-ink mt-1">
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
                    <IconComponent className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl text-ink">{skill.label}</h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {skill.context}
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-center shrink-0 rounded-full bg-gold-soft px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                  {SKILL_CATEGORY_LABELS[skill.category]}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}
