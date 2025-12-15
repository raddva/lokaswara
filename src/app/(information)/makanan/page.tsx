import Navbar from "@/components/common/app-navbar"
import MakananSundaPage from "./_components/makanan"

export const metadata = {
  title: 'LokaSwara | Jelajahi makanan khas sunda',
};

export default function MakananSunda() {
  return (
    <main>
      <Navbar />
      <MakananSundaPage />
    </main>
  )
}