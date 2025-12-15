import Navbar from "@/components/common/app-navbar";
import AlatMusik from "./_components/alatmusik";
import SeniTari from "./_components/senitari";
import Image from "next/image";

export const metadata = {
  title: 'LokaSwara | Jelajahi seni tradisional suku sunda',
};

export default function SeniPage() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/50"></div>
        <Image
          src="/assets/alatmusikbg.jpeg"
          alt="Background"
          className="w-full h-full object-cover"
          width={400}
          height={400}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <AlatMusik />
        <SeniTari />
      </div>
    </main>
  )
}