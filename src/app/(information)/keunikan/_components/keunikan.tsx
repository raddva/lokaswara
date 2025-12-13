'use client'
import CustomCard from "@/components/common/custom-card"
import { Input } from "@/components/ui/input"
import { FilterIcon } from "lucide-react"
import { useRouter } from "next/navigation";

export function FoodCard(name: string) {
  const router = useRouter();
  const slug = encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));

  return (
    <div 
      className="p-4 bg-white shadow cursor-pointer"
      onClick={() => router.push(`/makanan/${slug}`)}
      
    >
      {name}
    </div>
  );
}

export default function Keunikan() {
  return (
    <section className="bg-[url('/assets/gambar3.jpeg')] w-full inset-0 bg-cover relative items-center justify-center px-32 py-20">
      <div className="bg-linear-to-b from-black/70 to-black to-95% inset-0 absolute z-10 w-full h-full"></div>
      <div className="relative z-20 flex flex-col gap-10">
        <h1 className="font-bold text-5xl">Keunikan Suku Sunda</h1>
        <ol className="flex flex-col gap-5">
          <li className="list-decimal ml-5 font-bold text-xl">
            <h1 className="font-bold text-xl">Asal-usul dan Nilai Dasar Adat Sunda</h1>
            <p className="text-lg font-medium text-justify">Sistem adat Suku Sunda terbentuk dari perpaduan tradisi leluhur pra-Islam, pengaruh Hindu-Buddha, serta nilai Islam yang masuk dan menyatu dalam budaya masyarakat. Nilai inti yang menjadi fondasi adat adalah silih asih, silih asah, silih asuh (saling mengasihi, saling mengajari, dan saling menjaga), serta tepasalira (tenggang rasa). Nilai-nilai ini tidak hanya menjadi pedoman tingkah laku, tetapi juga membentuk etika sosial orang Sunda yang dikenal lemah lembut, sopan, dan menjunjung harmoni.</p>
          </li>
          <li className="list-decimal ml-5 font-bold text-xl">
            <h1 className="font-bold text-xl">Struktur Sosial dan Peran Tokoh Adat</h1>
            <p className="text-lg font-medium text-justify">Dalam penerapannya, adat Sunda memiliki struktur sosial yang melibatkan tokoh-tokoh seperti kokolot lembur (tetua kampung), sesepuh, lebe (pemimpin urusan keagamaan dan perkawinan), dan kuncen (penjaga situs budaya). Mereka bertugas memimpin musyawarah, menjaga aturan adat, menyelesaikan konflik, serta mengarahkan masyarakat agar tetap berpegang pada norma-norma leluhur. Keputusan adat biasanya diambil secara kolektif dalam musyawarah, mencerminkan prinsip kerukunan dan kebersamaan yang menjadi ciri khas masyarakat Sunda.</p>
          </li>
          <li className="list-decimal ml-5 font-bold text-xl">
            <h1 className="font-bold text-xl">Adat Lembur dan Aturan Kehidupan Sehari-hari</h1>
            <p className="text-lg font-medium text-justify">Dalam penerapannya, adat Sunda memiliki struktur sosial yang melibatkan tokoh-tokoh seperti kokolot lembur (tetua kampung), sesepuh, lebe (pemimpin urusan keagamaan dan perkawinan), dan kuncen (penjaga situs budaya). Mereka bertugas memimpin musyawarah, menjaga aturan adat, menyelesaikan konflik, serta mengarahkan masyarakat agar tetap berpegang pada norma-norma leluhur. Keputusan adat biasanya diambil secara kolektif dalam musyawarah, mencerminkan prinsip kerukunan dan kebersamaan yang menjadi ciri khas masyarakat Sunda.</p>
          </li>
          <li className="list-decimal ml-5 font-bold text-xl">
            <h1 className="font-bold text-xl">Upacara Adat dan Perkembangannya di Era Modern</h1>
            <p className="text-lg font-medium text-justify">Rangkaian upacara seperti kelahiran, khitanan, pernikahan, kematian, hingga upacara agraris seperti Seren Taun merupakan bagian penting dari sistem adat. Ritual-ritual ini berfungsi memperkuat ikatan sosial, menjaga hubungan dengan leluhur, serta melestarikan identitas budaya. Dalam perkembangan modern, adat Sunda terus beradaptasi dengan hukum negara, agama, dan kehidupan urban. Banyak tradisi tetap dipertahankan karena memiliki nilai universal, sementara sebagian lainnya menyesuaikan kebutuhan zaman, menjadikan adat Sunda tetap hidup tanpa kehilangan jati dirinya.</p>
          </li>
        </ol>
      </div>
    </section>
  )
}