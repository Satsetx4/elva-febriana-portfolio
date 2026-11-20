# Portofolio Digital — Elva Febriana

Website portofolio resmi **Elva Febriana** (Barista, Koordinator Acara & Lulusan SMAN 3 Probolinggo 2026). Dirancang dengan antarmuka mobile-first yang ringan, aksesibel, dan menampilkan informasi riil tanpa data tiruan maupun metrik fiktif.

- **Alamat Live:** [https://elva-febriana-portfolio.vercel.app](https://elva-febriana-portfolio.vercel.app)
- **Halaman Utama:** Beranda (`/`), Tentang (`/tentang`), Pengalaman (`/pengalaman`), Pendidikan (`/pendidikan`), dan Kontak (`/kontak`).

---

## Teknologi yang Digunakan

- **Framework & Bahasa:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animasi & Ikon:** Framer Motion (`framer-motion`) & Lucide React (`lucide-react`)
- **Routing & Analitik:** React Router 7 (`react-router-dom`) & Vercel Analytics (`@vercel/analytics`)

---

## Pengembangan Lokal (Windows PowerShell)

Gunakan `npm.cmd` saat menjalankan skrip dari Windows PowerShell agar kompatibel dengan execution policy:

```powershell
# 1. Instalasi dependensi sesuai lockfile
npm.cmd ci

# 2. Jalankan server pengembangan lokal
npm.cmd run dev

# 3. Pemeriksaan linter (oxlint)
npm.cmd run lint

# 4. Pemeriksaan rasio kontras warna (WCAG)
npm.cmd run check:contrast

# 5. Pemeriksaan tipe TypeScript dan build produksi
npm.cmd run build
```

---

## Panduan Menambahkan Bukti Kerja Asli

Seluruh bagian bukti kerja pada portofolio ini bersifat **opsional berbasis data riil**. Setiap bagian bukti akan **otomatis muncul ketika datanya terisi** di `src/data/profile.ts`, dan **tetap tersembunyi selama array-nya kosong** sehingga tidak ada ruang kosong atau data palsu di tampilan publik.

### 1. Siapkan Aset di Folder Publik
- Letakkan aset mentah terlebih dahulu di folder lokal `content-intake/` (folder ini di-ignore Git dan tidak ikut ter-deploy — lihat panduan di `content-intake/README.md`).
- Setelah diproses, simpan gambar dokumentasi berformat **WebP** ke folder `public/proof/` (misal: `public/proof/barista-shift.webp`).
- Untuk foto profil baru, ganti `public/elva_avatar.webp` dan `public/elva_avatar.png`.
- Untuk berkas CV, simpan PDF ke `public/Elva-Febriana-CV.pdf`.

### 2. Daftarkan Data di `src/data/profile.ts`
Buka `src/data/profile.ts` dan isi ekspor data sesuai tipe pada `src/types/portfolio.ts`:

- `PROFILE.cvUrl` — Path menuju file CV PDF (contoh: `'/Elva-Febriana-CV.pdf'`) untuk memunculkan tombol unduh CV.
- `PROOF_PHOTOS` — Daftar foto kegiatan asli (`outlet`, `osis`, `teater`, atau `lainnya`) beserta `caption`, `alt`, serta dimensi `width` dan `height`.
- `WORK_SAMPLES` — Daftar contoh desain Canva atau materi promosi asli beserta `title`, `purpose`, `image`, `alt`, `tool`, dan `year`.
- `TESTIMONIALS` — Kutipan testimoni asli dengan nama, jabatan/peran pemberi testimoni, serta `consent: true` sebagai bukti izin tertulis.
- `METRICS` — Angka capaian terukur yang benar-benar terverifikasi beserta `source` keterangannya.
- `CERTIFICATES` — Daftar sertifikat atau piagam asli beserta penerbit, tahun, dan tautan file di `public/proof/` bila ada.
