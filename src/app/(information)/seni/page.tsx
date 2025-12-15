import Navbar from "@/components/common/app-navbar";
import SeniSection from "./_components/alatmusik";
import SeniTari from "./_components/senitari";

export const metadata = {
    title: 'LokaSwara | Jelajahi seni tradisional suku sunda',
}

export default function SeniPage() {
  return (
    <main>
      <Navbar />
      <SeniSection />
      <SeniTari />
    </main>
  )
}