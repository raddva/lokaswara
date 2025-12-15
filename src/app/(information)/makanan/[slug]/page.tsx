import Navbar from "@/components/common/app-navbar"
import MakananDetail from "./_components/slug"

export const metadata = {
    title: 'LokaSwara | Detail Makanan',
};

export default function MakananDetailPage() {
  return (
    <main>
      <Navbar />
      <MakananDetail />
    </main>
  )
}
