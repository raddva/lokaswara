'use client'
import { Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="backdrop-blur-xl bg-black/60 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-12">
      <div className="flex flex-col gap-12 md:flex-row md:justify-between">

        <div className="flex flex-col items-center md:items-start gap-6">
          <Image
            src="/assets/logo_white_wtext.svg"
            alt="logo"
            width={120}
            height={120}
          />

          <div className="flex gap-4">
            <Instagram className="cursor-pointer hover:text-purple-400 transition" />
            <Mail className="cursor-pointer hover:text-red-400 transition" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 text-center md:text-left">

          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">Navigasi</h2>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li className="hover:text-white cursor-pointer">Beranda</li>
              <li className="hover:text-white cursor-pointer">Informasi</li>
              <li className="hover:text-white cursor-pointer">Tentang Kami</li>
              <li className="hover:text-white cursor-pointer">Profil</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">Kategori</h2>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li className="hover:text-white cursor-pointer">Makanan</li>
              <li className="hover:text-white cursor-pointer">Keunikan</li>
              <li className="hover:text-white cursor-pointer">Seni</li>
              <li className="hover:text-white cursor-pointer">Tradisi</li>
            </ul>
          </div>

        </div>
      </div>

      <hr className="my-10 border-white/10" />

      <p className="text-center text-sm text-white/60">
        © {new Date().getFullYear()} <Link href="https://lokaswara.netlify.app/" className="hover:text-white">LokaSwara</Link> . All rights reserved.
      </p>
    </footer>
  )
}