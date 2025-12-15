/* eslint-disable react-hooks/purity */
'use client'

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const SundaMap = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] bg-gray-100 rounded-xl animate-pulse">
      Loading Map...
    </div>
  ),
});

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function MoreSection() {
  return (
    <section className="relative w-full bg-cover bg-center px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-20"
      style={{ backgroundImage: `url('/assets/morebg.jpeg')` }}
    >
      <div className="absolute inset-0 z-0 bg-linear-to-b from-black/80 via-black/60 to-black/40" />

      <motion.div
        className="relative z-10 flex flex-col gap-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: false }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-center"
        >
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-purple-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Suku Sunda
            </span>

            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-24 rounded-full bg-linear-to-r from-purple-500 to-indigo-600 opacity-80" />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: false }}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
        >
          <div className="shrink-0 w-full md:w-1/2">
            <Image
              src="/assets/gambar3.jpeg"
              alt="gambar1"
              width={500}
              height={1000}
              className="w-full h-auto rounded-xl shadow-xl object-cover"
            />
          </div>
          <p className="text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed text-justify md:w-1/2">
            Suku Sunda adalah kelompok etnis yang berasal dari bagian barat Pulau Jawa dan memiliki sejarah panjang sejak masa Kerajaan Sunda dan Pajajaran. Asal usulnya sangat berkaitan dengan budaya agraris, sehingga banyak tradisi yang berhubungan dengan alam—mulai dari penghormatan kepada padi sebagai sumber kehidupan hingga kebiasaan hidup sederhana.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: false }}

          className="text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed text-justify"
        >
          Dalam kehidupan sehari-hari, masyarakat Sunda dikenal memiliki tata krama yang tinggi, ramah (someah), serta menjunjung nilai “silih asih, silih asah, silih asuh” yang berarti saling menyayangi, saling mengajari, dan saling membimbing. Keunikan budaya Sunda juga terlihat dari keseniannya, seperti angklung, kacapi suling, wayang golek, serta tarian yang lembut dan anggun.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: false }}
          className="flex flex-col gap-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Location</h2>
          <div className="flex flex-col gap-4 p-4 rounded-xl border border-white/20 backdrop-blur-sm shadow-lg">
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed text-justify">
              Secara geografis, Suku Sunda terutama mendiami wilayah Jawa Barat, Banten, dan sebagian DKI Jakarta, dengan kota-kota penting seperti Bandung, Bogor, Sukabumi, Garut, dan Cirebon.
            </p>
            <SundaMap key={Date.now()} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: false }}
          className="flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ciri Khas</h2>
          <p className="text-white/90 text-lg sm:text-xl leading-relaxed text-justify p-4 border border-white/20 rounded-xl backdrop-blur-sm shadow-lg">
            Banyak kebiasaan khas Sunda masih dijalani hingga sekarang, misalnya tradisi ngaliwet, upacara Seren Taun, hingga gaya bahasa yang sopan dan bertingkat seperti lemes, sedeng, dan kasar. Bahasa Sunda sendiri kaya akan ungkapan daerah seperti “someah hade ka semah” (ramah kepada tamu) atau “ulah poho diri” (jangan lupa diri), yang mencerminkan filosofi hidup masyarakatnya. Dengan perpaduan adat, bahasa, kesenian, dan nilai-nilai tersebut, budaya Sunda tetap hidup dan melekat kuat di wilayah yang mereka tinggali.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
