import Navbar from "@/components/common/app-navbar";
import Keunikan from "./_components/keunikan";

export const metadata = {
    title: 'LokaSwara | Jelajahi keunikan suku sunda',
};

export default function KeunikanPage() {
  return (
    <main>
      <Navbar />
      <Keunikan />
    </main>
  )
}