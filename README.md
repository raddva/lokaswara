# 🌿 LokaSwara: Arsip Digital Budaya Lisan Sunda

LokaSwara (Suara Lokal) adalah platform arsip digital kolaboratif yang didedikasikan untuk melestarikan dan mendokumentasikan bahasa, cerita rakyat, dan warisan budaya lisan dari tatar Sunda (Jawa Barat). Proyek ini berfokus pada Crowdsourcing data dari komunitas dan memastikan akses publik yang mudah terhadap materi-materi tersebut.

## ✨ Fitur Utama

LokaSwara memadukan arsip media dengan interaksi komunitas:

- 📺 Arsip Video: Koleksi video budaya dan sejarah yang terintegrasi langsung melalui embed YouTube.

- 📖 Kamus Digital: Kamus bahasa Sunda (berbagai dialek) yang dilengkapi makna, sinonim, dan panduan pengucapan.

- 🖼️ Galeri Visual: Kumpulan gambar yang berkaitan dengan budaya Sunda (kostum, manuskrip, arsitektur).

- 📜 Cerita Rakyat & Artikel: Kumpulan narasi lisan dan artikel edukatif.

- 💬 Pengajuan Konten: Pengguna non-Admin dapat mengirimkan usulan kata baru, koreksi, atau artikel melalui form yang akan ditinjau oleh Super Admin (Crowdsourcing).

- 🛡️ Role-Based Access: Super Admin memiliki hak penuh untuk verifikasi, publikasi, dan manajemen konten.

## 💻 Tech Stack

| Kategori             | Teknologi                | Lencana                                                                                                                                      | Penjelasan                                                                          |
| :------------------- | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| **Frontend**         | **Next.js (App Router)** | <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js Badge"/>                | React Framework untuk performa, SEO, dan routing yang efisien.                      |
| **Styling**          | **Tailwind CSS**         | <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge"/> | Styling utility-first yang responsif dan cepat.                                     |
| **Database**         | **Supabase**             | <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase Badge"/>             | Backend-as-a-Service (BaaS) yang menyediakan Database (PostgreSQL) dan Autentikasi. |
| **Database**         | **PostgreSQL**           | <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Badge"/>       | Sistem Database Relasional yang digunakan oleh Supabase.                            |
| **Storage (Gambar)** | **Cloudinary**           | <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary Badge"/>       | Optimasi dan hosting gambar.                                                        |
| **Storage (Video)**  | **YouTube**              | <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube Badge"/>                | Layanan hosting dan streaming video gratis (embedded).                              |

## 🚀 Panduan Setup Lokal

Ikuti langkah-langkah ini untuk menjalankan LokaSwara di lingkungan lokal Anda:

Prasyarat

- Node.js (versi 18.x atau lebih tinggi)

- Akun Supabase

- Akun Cloudinary

1. Kloning Repositori

```bash
git clone [https://github.com/raddva/lokaswara.git](https://github.com/raddva/lokaswara.git)
cd lokaswara
```

2. Konfigurasi Database Supabase

Buat proyek baru di Dasbor Supabase Anda.

Buka SQL Editor dan jalankan semua queries DDL (Data Definition Language) untuk membuat skema tabel: users, videos, dictionary, images, articles, content_requests, categories, dan languages.

(Pastikan Anda menggunakan skema yang sudah diperbaiki dengan tipe data UUID untuk Foreign Keys yang merujuk ke tabel auth.users.)

Ambil Project URL dan Anon Public Key dari bagian Settings > API di Supabase.

3. Setup Lingkungan Variabel

Buat file .env.local di root proyek dan tambahkan variabel berikut:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
```

4. Instalasi Dependensi dan Jalankan

```bash
npm install
npm run dev
```

Aplikasi akan berjalan di http://localhost:3000.

## 📌 Kontributor

- [@Reksaditya](https://github.com/Reksaditya) sebagai Front-End Developer
- [@raddva](https://github.com/raddva) sebagai Back-End Developer
