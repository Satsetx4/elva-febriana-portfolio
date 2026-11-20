import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Drama,
  GraduationCap,
  Users,
} from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { CertificateList } from '../components/proof/CertificateList';
import { ProofGallery } from '../components/proof/ProofGallery';
import {
  CERTIFICATES,
  EDUCATION,
  ORG_EXPERIENCES,
  PROOF_PHOTOS,
} from '../data/profile';
import { staggerContainer, staggerItem } from '../lib/motion';

export function EducationPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-12">
      <AppHeader
        title="Pendidikan & Organisasi"
        breadcrumbLabel="Pendidikan"
        backTo="/"
      />

      <motion.section
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative pl-6 sm:pl-9 border-l border-line space-y-10"
      >
        {/* Pendidikan Formal: SMAN 3 Probolinggo */}
        <motion.article variants={staggerItem} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[33px] sm:-left-[45px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-gold bg-bg"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>

          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 eyebrow">
                <GraduationCap
                  className="w-4 h-4 text-gold"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>Pendidikan Menengah Atas</span>
              </span>
              <span className="self-start sm:self-auto pill bg-gold-soft text-gold-ink">
                {EDUCATION.period}
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="font-serif text-3xl font-medium text-ink">
                {EDUCATION.school}
              </h2>
              <p className="text-sm font-medium text-ink">{EDUCATION.major}</p>
            </div>

            <p className="body">{EDUCATION.description}</p>

            <div className="pt-2 space-y-2">
              <p className="meta">Minat Mata Pelajaran</p>
              <div className="flex flex-wrap gap-2">
                {EDUCATION.electives.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-full border border-line bg-bg px-3.5 py-1 text-[13px] font-medium text-ink"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Pengalaman Organisasi: OSIS & Teater */}
        {ORG_EXPERIENCES.map((org) => {
          const isOsis = org.id.includes('osis');
          const IconComponent = isOsis ? Users : Drama;
          const orgPhotos = PROOF_PHOTOS.filter(
            (p) => p.context === (isOsis ? 'osis' : 'teater'),
          );

          return (
            <motion.article
              key={org.id}
              variants={staggerItem}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[33px] sm:-left-[45px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-gold bg-bg"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>

              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 eyebrow">
                    <IconComponent
                      className="w-4 h-4 text-gold"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span>{org.role}</span>
                  </span>
                  <span className="self-start sm:self-auto pill border border-line bg-bg text-ink">
                    {org.period}
                  </span>
                </div>

                <h2 className="font-serif text-3xl font-medium text-ink">
                  {org.organization}
                </h2>

                <ul className="space-y-3 pt-1">
                  {org.highlights.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 body">
                      <CheckCircle2
                        className="w-4 h-4 text-gold shrink-0 mt-1"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {orgPhotos.length > 0 ? (
                  <div className="pt-2">
                    <ProofGallery photos={orgPhotos} />
                  </div>
                ) : null}
              </div>
            </motion.article>
          );
        })}
      </motion.section>

      <CertificateList certificates={CERTIFICATES} />
    </div>
  );
}
