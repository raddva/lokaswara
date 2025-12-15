import { Instagram, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="backdrop-blur-xl px-32 py-10">
      <div className="flex justify-between">
        <div className="flex flex-col justify-between items-center pb-10">
          <Image src="/assets/logo_white_wtext.svg" alt="logo" width={100} height={100} />
          {/* <h1 className="text-2xl font-bold">LokaSwara</h1> */}
          <div className="flex gap-3 w-full">
            <Instagram height={30} width={30} />
            <Mail height={30} width={30} />
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center">
          <div className="flex gap-10 pb-10"> 
            <div className="flex flex-col gap-5">
              <h2 className="font-semibold text-lg">Navigasi</h2>
              <ul  className="flex flex-col gap-3">
                <li>Beranda</li>
                <li>Informasi</li>
                <li>Tentang Kami</li>
                <li>Profil</li>
              </ul>
            </div>
            <div  className="flex flex-col gap-5">
              <h2 className="font-semibold text-lg">Kategori</h2>
              <ul className="flex flex-col gap-3">
                <li>Makanan</li>
                <li>Keunikan</li>
                <li>Seni</li>
                <li>Tradisi</li>
              </ul>
            </div>
          </div>
      </div>
      </div>
      <div>
        
      </div>
      <hr className="h-2" />
      <h5>&copy; 2025 LokaSwara. All rights reserved</h5>
    </footer>
  )
}