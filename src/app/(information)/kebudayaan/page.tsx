import Navbar from "@/components/common/app-navbar";
import Keunikan from "./_components/kebudayaan";

export const metadata = {
  title: 'LokaSwara | Jelajahi kebudayaan suku sunda',
};

export default function KebudayaanPage() {
  return (
    <main>
      <Navbar />
      <Keunikan />
    </main>
  )
}