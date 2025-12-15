'use client'
import { Button } from "@/components/ui/button"
import { Element } from "react-scroll"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface imageData {
  link: string,
}

const imageProps: imageData[] = [
  {
    link: "gambar1",
  },
  {
    link: "gambar2",
  },
  {
    link: "gambar3",
  },
]

export default function Penjelasan() {
  const router = useRouter()

  return (
    <Element name="fact">
      <section id="fact" className="min-h-screen bg-black px-4 sm:px-8 md:px-16 lg:px-32 py-12 md:py-0 flex flex-col md:flex-row justify-between items-center gap-8"
      // style={{ backgroundImage: `url('/assets/hero.png')` }}
      >
        <div className="flex flex-col gap-3 w-full md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white relative">
            <span className="bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Tahukah kamu?
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false }}
            className="max-w-3xl rounded-2xl p-6 sm:p-8 border border-white/20 bg-white/5 backdrop-blur-sm shadow-lg">
            <p className="text-sm sm:text-base md:text-lg lg:text-lg leading-relaxed text-white/90 text-left">
              Suku Sunda adalah kelompok etnis terbesar kedua di Indonesia yang terutama
              mendiami wilayah Jawa Barat dan Banten. Mereka dikenal memiliki budaya yang
              menjunjung tinggi kesopanan, keramahan, serta nilai kebersamaan. Bahasa Sunda
              menjadi ciri utama identitas mereka, disertai berbagai tradisi, kesenian, dan
              adat istiadat yang masih dilestarikan. Kehidupan masyarakat Sunda juga sangat
              dekat dengan alam dan memiliki filosofi hidup yang sederhana namun harmonis.
            </p>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: false }}
          >
            <Button
              variant="default"
              onClick={() => router.push('/more')}
              className="relative h-12 w-full rounded-xl p-px bg-linear-to-br from-purple-600 to-blue-500 shadow-lg overflow-hidden group">
              <span className="flex h-full w-full items-center justify-center rounded-xl bg-linear-to-br from-purple-600 to-blue-500 text-white font-medium transition-all duration-300 ease-out group-hover:bg-black/60 group-hover:bg-none">
                Selengkapnya
              </span>
            </Button>
          </motion.h1>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[400px] md:min-h-[500px] flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 relative">
            {imageProps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  delay: 0.2 * index,
                  duration: 0.5,
                }}
                className={`w-48 sm:w-60 md:w-72 lg:w-80 h-32 sm:h-40 md:h-48 lg:h-60 bg-cover bg-center rounded-xl shadow-lg ${index === 1 ? "translate-y-30" : ""} ${index === 2 ? "mx-auto" : ""}`}
                style={{ backgroundImage: `url('/assets/${item.link}.jpeg')` }}
              />
            ))}
          </div>
        </div>
      </section>
    </Element>
  )
}