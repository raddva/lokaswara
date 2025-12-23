'use client'
import { Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NavItem {
  name: string;
  link: string;
  scrollTo?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Beranda", link: "/home" },
  { name: "Informasi", link: "/home", scrollTo: "fact" },
  { name: "Tentang Kami", link: "/home", scrollTo: "visiMisi" },
  { name: "Profil", link: "/profile" },
];

export default function Footer() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (item: NavItem) => {
    if (item.scrollTo) {
      if (pathname === "/home") {
        const el = document.getElementById(item.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        router.push(`${item.link}?scrollTo=${item.scrollTo}`);
      }
    } else {
      router.push(item.link);
    }
  };

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
            <div className="flex flex-col gap-2 text-sm text-white/80">
              {NAV_ITEMS.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="text-white font-medium hover:text-blue-400 transition cursor-pointer text-left"
                    onClick={() => handleClick(item)}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">Kategori</h2>
            <div className="flex flex-col gap-2 text-sm text-white/80">
              <a href="/makanan" className="hover:text-white cursor-pointer">Makanan</a>
              <a href="/keunikan" className="hover:text-white cursor-pointer">Keunikan</a>
              <a href="/seni" className="hover:text-white cursor-pointer">Seni</a>
              <a href="/tradisi" className="hover:text-white cursor-pointer">Tradisi</a>
            </div>
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