import Navbar from "@/components/common/app-navbar"
import MakananSundaPage from "./_components/makanan"

export const metadata = {
  title: 'LokaSwara | Ketahui makanan khas sunda lebih banyak',
};

export default function MakananSunda() {
  return (
    <main>
      <Navbar />
      <MakananSundaPage />
    </main>
  )
}