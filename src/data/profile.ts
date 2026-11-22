import type {
  Certificate,
  EducationData,
  Metric,
  OrgExperience,
  ProfileData,
  ProofPhoto,
  SkillItem,
  Testimonial,
  WorkExperience,
  WorkPillar,
  WorkSample,
} from '../types/portfolio';

export const PROFILE: ProfileData = {
  name: 'Elva Febriana',
  headline: 'Barista, Koordinator Acara & Lulusan SMAN 3 Probolinggo',
  city: 'Probolinggo, Jawa Timur',
  phone: '+62 831 6917 4103',
  whatsapp: '6283169174103',
  email: 'elvafebriana611@gmail.com',
  avatar: '/elva_avatar.webp',
  cvUrl: '/Elva-Febriana-CV.pdf',
  summaryShort:
    'Lulusan SMAN 3 Kota Probolinggo (2026) jurusan IPAS dengan pengalaman sebagai barista outlet dan koordinator acara OSIS. Cekatan, teliti dalam pencatatan, dan siap berkontribusi di bidang operasional, layanan pelanggan, maupun administrasi.',
  summary:
    'Lulusan SMAN 3 Kota Probolinggo (2026) jurusan IPAS dengan minat pada Matematika, Fisika, Ekonomi, dan Sosiologi. Terbiasa bekerja dalam tim maupun mandiri, cepat beradaptasi, teliti dalam SOP serta rekap harian, dan mampu bekerja di bawah tekanan.',
};

export const EDUCATION: EducationData = {
  school: 'SMAN 3 Probolinggo',
  period: '2023 – 2026 · Lulus',
  major: 'Ilmu Pengetahuan Alam dan Sosial (IPAS)',
  electives: ['Matematika', 'Fisika', 'Ekonomi', 'Sosiologi'],
  description:
    'Menempuh pendidikan menengah atas dengan peminatan IPAS yang memadukan ketelitian analitis dan pemahaman sosial, serta aktif berorganisasi di lingkungan sekolah.',
};

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'teh-kota-mastrip',
    role: 'Barista',
    company: 'Teh Kota Mastrip',
    duration: '4 bulan',
    location: 'Probolinggo',
    responsibilities: [
      'Membuat pesanan minuman sesuai SOP dan standar outlet.',
      'Mencatat dan merekap hasil penjualan harian secara teliti.',
      'Menjaga kebersihan, kerapian area kerja, serta ketersediaan stok barang.',
    ],
  },
];

export const ORG_EXPERIENCES: OrgExperience[] = [
  {
    id: 'osis-sman3',
    role: 'Anggota OSIS',
    organization: 'OSIS SMAN 3 Probolinggo',
    period: '2023/2024',
    highlights: [
      'Mengoordinasikan pelaksanaan acara sekolah dan memastikan seluruh tugas terlaksana tepat waktu.',
      'Mengelola stand bazar, termasuk promosi dan penjualan makanan serta minuman.',
      'Menyusun surat permohonan juri untuk kegiatan lomba.',
      'Terlatih bekerja di bawah tekanan dengan rasa tanggung jawab tinggi.',
    ],
  },
  {
    id: 'teater-sman3',
    role: 'Anggota & Pemain',
    organization: 'Teater SMAN 3 Probolinggo',
    period: '2024/2025',
    highlights: [
      'Berperan aktif sebagai pemain dalam pementasan drama sekolah.',
      'Menghidupkan karakter sesuai naskah dan arahan sutradara untuk mendukung jalan cerita.',
    ],
  },
];

export const SKILLS: SkillItem[] = [
  {
    id: 'teamwork',
    label: 'Kerja Tim maupun Individu',
    category: 'soft',
    context: 'Teruji saat mengoordinasikan kepanitiaan OSIS dan menjaga operasional shift outlet.',
  },
  {
    id: 'adaptability',
    label: 'Cepat Belajar & Beradaptasi',
    category: 'soft',
    context: 'Menguasai alur SOP peracikan minuman serta ritme layanan pelanggan dalam waktu singkat.',
  },
  {
    id: 'time-management',
    label: 'Manajemen Waktu',
    category: 'operational',
    context: 'Menjaga ketepatan waktu eksekusi acara sekolah dan kecepatan penyajian pesanan.',
  },
  {
    id: 'communication',
    label: 'Komunikasi Efektif',
    category: 'soft',
    context: 'Terlatih melalui pelayanan pelanggan langsung, promosi bazar, dan pementasan teater.',
  },
  {
    id: 'event-coordination',
    label: 'Koordinasi Acara',
    category: 'operational',
    context: 'Mengatur alur kegiatan, penyusunan surat juri, dan pengelolaan stand bazar OSIS.',
  },
  {
    id: 'canva',
    label: 'Desain Canva & Administrasi Digital',
    category: 'digital',
    context:
      'Membuat materi visual promosi kegiatan dengan Canva serta menyusun administrasi surat, pencatatan, dan rekap penjualan harian menggunakan laptop.',
  },
];

export const WORK_PILLARS: WorkPillar[] = [
  {
    id: 'sop-precision',
    title: 'Disiplin SOP & Takaran',
    description:
      'Setiap racikan dibuat sesuai standar outlet agar rasa, tampilan, dan kualitas tetap konsisten.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'tidy-recap',
    title: 'Rekap & Stok Teliti',
    description:
      'Terbiasa mencatat transaksi, merekap penjualan, serta memantau ketersediaan bahan baku.',
    iconName: 'Clock',
  },
  {
    id: 'event-coord',
    title: 'Koordinasi & Promosi',
    description:
      'Berpengalaman mengelola stand bazar, promosi langsung, dan alur kerja tim di bawah tekanan.',
    iconName: 'Users',
  },
  {
    id: 'adaptive-ready',
    title: 'Cekatan & Siap Belajar',
    description:
      'Cepat menyesuaikan diri dengan ritme kerja baru dan menjaga kebersihan serta kerapian area.',
    iconName: 'Sparkles',
  },
];

// Konten bukti nyata (hanya diisi jika aset asli dari Elva tersedia)
export const PROOF_PHOTOS: ProofPhoto[] = [];
export const WORK_SAMPLES: WorkSample[] = [];
export const TESTIMONIALS: Testimonial[] = [];
export const METRICS: Metric[] = [];
export const CERTIFICATES: Certificate[] = [];
