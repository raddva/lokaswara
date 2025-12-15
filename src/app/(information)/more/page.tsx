import Navbar from "@/components/common/app-navbar";
import MoreSection from "./_components/more";

export const metadata = {
  title: 'LokaSwara | Informasi Tentang Suku Sunda',
};

export default function MorePage() {
  return (
    <main>
      <Navbar />
      <MoreSection />
    </main>
  )
}