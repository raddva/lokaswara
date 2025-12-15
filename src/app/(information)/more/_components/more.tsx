'use client'
import Image from "next/image";
import dynamic from "next/dynamic";
const SundaMap = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-gray-100 rounded-xl animate-pulse">Loading Map...</div>
});

export default function MoreSection() {
  return (
    <section className="bg-[url('/assets/morebg.jpeg')] w-full inset-0 bg-cover relative items-center justify-center px-32 py-20">
      <div className="bg-linear-to-b from-black/70 to-black to-95% inset-0 absolute z-10 w-full h-full"></div>
      <div className="relative z-20 flex flex-col justify-center h-full gap-10">
        <h1 className="text-8xl font-bold">Suku Sunda</h1>
        <div className="flex gap-5">
          <Image src={"/assets/gambar3.jpeg"} alt="gambar1" width={500} height={1000} className="max-w-sm h-full rounded-xl" />
          <p className="text-2xl text-justify">Suku Sunda adalah kelompok etnis yang berasal dari bagian barat Pulau Jawa dan memiliki sejarah panjang sejak masa Kerajaan Sunda dan Pajajaran. Asal usulnya sangat berkaitan dengan budaya agraris, sehingga banyak tradisi yang berhubungan dengan alam—mulai dari penghormatan kepada padi sebagai sumber kehidupan hingga kebiasaan hidup sederhana.</p>
        </div>
        <p className="text-2xl text-justify">Dalam kehidupan sehari-hari, masyarakat Sunda dikenal memiliki tata krama yang tinggi, ramah (someah), serta menjunjung nilai “silih asih, silih asah, silih asuh” yang berarti saling menyayangi, saling mengajari, dan saling membimbing. Keunikan budaya Sunda juga terlihat dari keseniannya, seperti angklung, kacapi suling, wayang golek, serta tarian yang lembut dan anggun.</p>
        <div>
          <h2 className="font-bold text-4xl">Location</h2>
          <div className="mt-3 border-2 border-white rounded-xl p-2 flex flex-col gap-5">
            <p className="text-2xl text-justify">Secara geografis, Suku Sunda terutama mendiami wilayah Jawa Barat, Banten, dan sebagian DKI Jakarta, dengan kota-kota penting seperti Bandung, Bogor, Sukabumi, Garut, dan Cirebon.</p>
            <SundaMap />
          </div>
        </div>
        <div>
          <h2 className="font-bold text-4xl">Ciri Khas</h2>
          <p className="text-2xl text-justify pt-3  mt-3 border-2 border-white rounded-xl p-2">Banyak kebiasaan khas Sunda masih dijalani hingga sekarang, misalnya tradisi ngaliwet, upacara Seren Taun, hingga gaya bahasa yang sopan dan bertingkat seperti lemes, sedeng, dan kasar. Bahasa Sunda sendiri kaya akan ungkapan daerah seperti “someah hade ka semah” (ramah kepada tamu) atau “ulah poho diri” (jangan lupa diri), yang mencerminkan filosofi hidup masyarakatnya. Dengan perpaduan adat, bahasa, kesenian, dan nilai-nilai tersebut, budaya Sunda tetap hidup dan melekat kuat di wilayah yang mereka tinggali.</p>
        </div>
      </div>
    </section>
  )
}