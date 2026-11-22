"""Generate QR code for https://elvafebriana.my.id and build Elva Febriana's 1-page A4 CV PDF."""

from __future__ import annotations

import base64
import subprocess
import tempfile
from pathlib import Path

import pymupdf
import qrcode
import qrcode.image.svg

PORTFOLIO_URL = "https://elvafebriana.my.id"
DISPLAY_HOST = "elvafebriana.my.id"

ROOT_DIR = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT_DIR / "public"
INTAKE_DIR = ROOT_DIR / "content-intake"
AVATAR_PATH = PUBLIC_DIR / "elva_avatar.png"
PDF_OUT_PATH = PUBLIC_DIR / "Elva-Febriana-CV.pdf"
PNG_OUT_PATH = INTAKE_DIR / "Elva-Febriana-CV.png"
QR_PNG_OUT_PATH = INTAKE_DIR / "qr-elvafebriana.png"
QR_SVG_OUT_PATH = INTAKE_DIR / "qr-elvafebriana.svg"

CHROME_CANDIDATES = [
    Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
    Path(r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"),
    Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
]


def find_browser() -> Path:
    for candidate in CHROME_CANDIDATES:
        if candidate.exists():
            return candidate
    raise FileNotFoundError("Chrome or Edge executable not found.")


def generate_qr_assets(url: str) -> str:
    """Create crisp QR PNG + SVG files and return the SVG markup."""
    INTAKE_DIR.mkdir(parents=True, exist_ok=True)

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_Q,
        box_size=24,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="#111111", back_color="#FFFFFF")
    img.save(QR_PNG_OUT_PATH)

    svg_qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_Q,
        box_size=10,
        border=3,
        image_factory=qrcode.image.svg.SvgPathImage,
    )
    svg_qr.add_data(url)
    svg_qr.make(fit=True)
    svg_img = svg_qr.make_image(fill_color="#111111", back_color="#FFFFFF")
    svg_bytes = svg_img.to_string(encoding="unicode")
    QR_SVG_OUT_PATH.write_text(svg_bytes, encoding="utf-8")
    return svg_bytes


def build_html(avatar_b64: str, qr_svg: str) -> str:
    # Make QR SVG responsive to its container box
    qr_svg_clean = qr_svg.replace("<svg ", '<svg class="qr-svg" ', 1)
    return f"""<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <title>CV — Elva Febriana</title>
  <style>
    @page {{
      size: A4 portrait;
      margin: 15mm 17mm 14mm 17mm;
    }}
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    html, body {{
      width: 100%;
      background: #ffffff;
      color: #1c1917;
      font-family: Georgia, "Times New Roman", Times, serif;
      font-size: 10.6pt;
      line-height: 1.48;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    a {{
      color: #1c1917;
      text-decoration: none;
    }}
    .cv-sheet {{
      width: 100%;
    }}

    /* Header */
    .header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }}
    .header-left {{
      display: flex;
      align-items: center;
      gap: 16px;
      flex: 1;
      min-width: 0;
    }}
    .avatar-wrap {{
      width: 86px;
      height: 86px;
      border-radius: 9999px;
      overflow: hidden;
      flex-shrink: 0;
      border: 1.5px solid #e7e5e4;
    }}
    .avatar-wrap img {{
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }}
    .identity {{
      flex: 1;
      min-width: 0;
    }}
    .name {{
      font-family: Georgia, "Times New Roman", serif;
      font-size: 22pt;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: #111111;
      line-height: 1.15;
      margin-bottom: 3px;
    }}
    .headline {{
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 9pt;
      font-weight: 600;
      color: #7c5c2e;
      letter-spacing: 0.02em;
      margin-bottom: 6px;
    }}
    .contact-line {{
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 8.8pt;
      color: #3f3f46;
      line-height: 1.45;
    }}
    .web-link {{
      color: #7c5c2e;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 2px;
    }}

    /* QR Box */
    .qr-card {{
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 6px 7px 5px 7px;
      border: 1px solid #d6d3d1;
      border-radius: 8px;
      background: #fafaf9;
      text-align: center;
    }}
    .qr-box {{
      width: 82px;
      height: 82px;
      background: #ffffff;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }}
    .qr-svg {{
      width: 82px;
      height: 82px;
      display: block;
    }}
    .qr-label {{
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 6.7pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #44403c;
      margin-top: 4px;
      line-height: 1.15;
    }}
    .qr-url {{
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 6.8pt;
      font-weight: 600;
      color: #7c5c2e;
      margin-top: 1px;
      line-height: 1.15;
    }}

    /* Sections */
    .section {{
      margin-bottom: 13px;
    }}
    .section-title {{
      font-family: Georgia, "Times New Roman", serif;
      font-size: 11.5pt;
      font-weight: 700;
      color: #111111;
      border-bottom: 1.4px solid #1c1917;
      padding-bottom: 2px;
      margin-bottom: 6px;
    }}
    .summary {{
      text-align: justify;
      color: #27272a;
    }}

    .entry {{
      margin-bottom: 8px;
    }}
    .entry:last-child {{
      margin-bottom: 0;
    }}
    .entry-head {{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 10px;
      margin-bottom: 2px;
    }}
    .entry-title {{
      font-weight: 700;
      color: #111111;
      font-size: 10.3pt;
    }}
    .entry-meta {{
      font-family: "Segoe UI", Arial, sans-serif;
      font-size: 8.6pt;
      font-weight: 600;
      color: #57534e;
      white-space: nowrap;
    }}
    .edu-line {{
      margin-top: 2px;
      color: #27272a;
    }}

    ul.bullets {{
      list-style: disc;
      padding-left: 17px;
      margin-top: 2px;
    }}
    ul.bullets li {{
      margin-bottom: 2.5px;
      color: #27272a;
    }}

    /* Skills 2 columns */
    .skills-grid {{
      column-count: 2;
      column-gap: 28px;
      list-style: disc;
      padding-left: 18px;
    }}
    .skills-grid li {{
      break-inside: avoid;
      margin-bottom: 3.5px;
      color: #27272a;
    }}
  </style>
</head>
<body>
  <main class="cv-sheet">
    <header class="header">
      <div class="header-left">
        <div class="avatar-wrap">
          <img src="data:image/png;base64,{avatar_b64}" alt="Foto Profil Elva Febriana" />
        </div>
        <div class="identity">
          <h1 class="name">Elva Febriana</h1>
          <p class="headline">Barista &middot; Koordinator Acara &middot; Lulusan SMAN 3 Probolinggo</p>
          <p class="contact-line">
            Probolinggo, Jawa Timur &nbsp;|&nbsp; +62 831 6917 4103<br />
            elvafebriana611@gmail.com &nbsp;|&nbsp;
            <a class="web-link" href="{PORTFOLIO_URL}">{DISPLAY_HOST}</a>
          </p>
        </div>
      </div>

      <a class="qr-card" href="{PORTFOLIO_URL}" title="Buka Portofolio Digital Elva Febriana">
        <div class="qr-box">
          {qr_svg_clean}
        </div>
        <span class="qr-label">Scan Portofolio</span>
        <span class="qr-url">{DISPLAY_HOST}</span>
      </a>
    </header>

    <section class="section">
      <h2 class="section-title">Profil Singkat</h2>
      <p class="summary">
        Siswa SMAN 3 Kota Probolinggo (Lulusan 2026) jurusan IPAS dengan minat pada Matematika,
        Fisika, Ekonomi, dan Sosiologi. Terbiasa bekerja dalam tim maupun individu, cepat beradaptasi,
        cekatan, teliti, dan bertanggung jawab. Mampu bekerja di bawah tekanan serta memiliki kemampuan
        komunikasi dan koordinasi acara yang baik.
      </p>
    </section>

    <section class="section">
      <h2 class="section-title">Pendidikan</h2>
      <div class="entry">
        <div class="entry-head">
          <span class="entry-title">SMAN 3 PROBOLINGGO</span>
          <span class="entry-meta">2023 &ndash; 2026 &middot; Lulus</span>
        </div>
        <p class="edu-line">Peminatan mapel: Ilmu Pengetahuan Alam dan Sosial (IPAS)</p>
        <p class="edu-line">Mata pelajaran pilihan: Matematika, Fisika, Ekonomi, Sosiologi</p>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Pengalaman Kerja</h2>
      <div class="entry">
        <div class="entry-head">
          <span class="entry-title">Barista &mdash; Teh Kota Mastrip</span>
          <span class="entry-meta">4 bulan &middot; Probolinggo</span>
        </div>
        <ul class="bullets">
          <li>Membuat pesanan minuman sesuai SOP dan standar outlet Teh Kota.</li>
          <li>Mencatat dan merekap hasil penjualan harian secara teliti.</li>
          <li>Menjaga kebersihan, kerapian area kerja, serta ketersediaan stok barang.</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Pengalaman Organisasi &amp; Ekstrakurikuler</h2>
      <div class="entry">
        <div class="entry-head">
          <span class="entry-title">Anggota OSIS SMAN 3 Probolinggo</span>
          <span class="entry-meta">2023/2024</span>
        </div>
        <ul class="bullets">
          <li>Mengoordinasikan pelaksanaan acara sekolah dan memastikan seluruh tugas terlaksana tepat waktu.</li>
          <li>Mengelola stand bazar, termasuk promosi dan penjualan makanan serta minuman.</li>
          <li>Menyusun surat permohonan juri untuk kegiatan lomba.</li>
          <li>Terlatih bekerja di bawah tekanan dengan rasa tanggung jawab tinggi.</li>
        </ul>
      </div>

      <div class="entry">
        <div class="entry-head">
          <span class="entry-title">Teater SMAN 3 Probolinggo</span>
          <span class="entry-meta">2024/2025</span>
        </div>
        <ul class="bullets">
          <li>Berperan aktif sebagai pemain dalam pementasan drama sekolah.</li>
          <li>Menghidupkan karakter sesuai naskah dan arahan sutradara untuk mendukung jalan cerita.</li>
        </ul>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Kemampuan</h2>
      <ul class="skills-grid">
        <li>Kerja Tim maupun Individu</li>
        <li>Cepat Belajar &amp; Beradaptasi</li>
        <li>Manajemen Waktu</li>
        <li>Komunikasi Efektif</li>
        <li>Koordinasi Acara</li>
        <li>Desain Canva &amp; Materi Promosi</li>
        <li>Mengoperasikan Laptop &amp; Administrasi</li>
      </ul>
    </section>
  </main>
</body>
</html>
"""


def main() -> None:
    if not AVATAR_PATH.exists():
        raise FileNotFoundError(f"Avatar not found: {AVATAR_PATH}")

    qr_svg = generate_qr_assets(PORTFOLIO_URL)
    avatar_b64 = base64.b64encode(AVATAR_PATH.read_bytes()).decode("ascii")
    html_content = build_html(avatar_b64=avatar_b64, qr_svg=qr_svg)

    browser = find_browser()
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory() as tmp_dir:
        html_path = Path(tmp_dir) / "cv-elva.html"
        html_path.write_text(html_content, encoding="utf-8")

        cmd = [
            str(browser),
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--no-pdf-header-footer",
            f"--print-to-pdf={PDF_OUT_PATH}",
            html_path.as_uri(),
        ]
        subprocess.run(cmd, check=True)

    with pymupdf.open(PDF_OUT_PATH) as doc:
        page_count = doc.page_count
        pix = doc[0].get_pixmap(dpi=220)
        pix.save(PNG_OUT_PATH)
        text = doc[0].get_text()

    print(f"QR PNG: {QR_PNG_OUT_PATH} ({QR_PNG_OUT_PATH.stat().st_size} bytes)")
    print(f"QR SVG: {QR_SVG_OUT_PATH} ({QR_SVG_OUT_PATH.stat().st_size} bytes)")
    print(f"CV PDF: {PDF_OUT_PATH} ({PDF_OUT_PATH.stat().st_size} bytes, pages={page_count})")
    print(f"CV PNG: {PNG_OUT_PATH} ({pix.width}x{pix.height})")
    print("PDF contains URL:", DISPLAY_HOST in text)


if __name__ == "__main__":
    main()
