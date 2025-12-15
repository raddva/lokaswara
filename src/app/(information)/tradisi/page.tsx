import Navbar from "@/components/common/app-navbar";
import TradisiSection from "./_components/tradisi";

export const metadata = {
    title: 'LokaSwara | Jelajahi Tradisi Suku Sunda',
}


export default function TradisiPage() {
  return (
    <main>
      <Navbar />
      <TradisiSection />
    </main>
  )
}