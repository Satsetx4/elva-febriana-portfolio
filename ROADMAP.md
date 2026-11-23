# Roadmap Portofolio Elva Febriana

Website portofolio resmi **Elva Febriana** (`https://elvafebriana.my.id`) beserta CV PDF terintegrasi QR Code. Progres disusun per fase agar mudah dipantau melalui `github-roadmap-monitor`.

## Fase 1 — Fondasi Portofolio & Fitur Interaktif
- [x] Bangun web app multi-halaman (Beranda, Tentang, Pengalaman, Pendidikan, Kontak, 404) dengan React 19, TypeScript, Vite 8, dan Tailwind CSS v4
- [x] Isi data profil riil Elva Febriana (Barista Teh Kota Mastrip, OSIS SMAN 3 Probolinggo, Teater, lulusan IPAS 2026) tanpa data dummy
- [x] Bangun Simulasi Interaktif Outlet (Kasir POS & Ceklis Stok Shift) pada panel bonus collapsible di halaman Pengalaman
- [x] Terapkan sistem tema Light & Dark Mode anti-FOUC dengan persistensi `localStorage` aman (`try/catch`) dan opsi reset data mandiri

## Fase 2 — SEO, Kontras & Domain Produksi
- [x] Lengkapi `sitemap.xml`, `robots.txt`, canonical URL, Open Graph, Twitter Card, Schema JSON-LD `Person`, dan favicon asli
- [x] Verifikasi seluruh rasio kontras warna WCAG pada tema terang maupun gelap (`npm run check:contrast`)
- [x] Hubungkan situs ke domain produksi `https://elvafebriana.my.id` dan aktifkan `@vercel/analytics`

## Fase 3 — CV PDF Ber-QR Code & Tema Gelap Default
- [x] Generate QR Code `https://elvafebriana.my.id` dan tanam ke CV PDF 1 halaman A4 (`public/Elva-Febriana-CV.pdf`) melalui `scripts/generate-cv.py`
- [x] Aktifkan `PROFILE.cvUrl` dan arahkan tombol **Unduh CV** serta **Buka / Cetak CV** di halaman Tentang & Kontak ke `Elva-Febriana-CV.pdf`
- [x] Setel **Tema Gelap (Dark Mode)** sebagai tampilan default awal situs

## Fase 4 — Pengisian Bukti Kerja Asli & Indexing GSC
- [ ] Kumpulkan dan publikasikan 3–6 foto kegiatan asli (outlet Teh Kota Mastrip, stand bazar OSIS, teater) ke `public/proof/` dan `PROOF_PHOTOS`
- [ ] Tambahkan 2–4 contoh desain Canva atau materi promosi asli ke `WORK_SAMPLES`
- [ ] Tambahkan 1–2 testimoni berizin tertulis (`consent: true`), metrik capaian terverifikasi, dan sertifikat asli bila tersedia
- [ ] Pasang meta verifikasi Google Search Console di `index.html` dan daftarkan `https://elvafebriana.my.id/sitemap.xml`
