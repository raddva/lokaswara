'use client'
import { Button } from "@/components/ui/button"
import { Element, scroller } from "react-scroll"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context"

interface imageData {
  link: string,
  position: string
}

const imageProps: imageData[] = [
  {
    link: "gambar1",
    position: "top-15 left-20"
  },
  {
    link: "gambar2",
    position: "top-75 right-0"
  },
  {
    link: "gambar3",
    position: "bottom-10 left-10"
  },
]

export default function Penjelasan() {
  const router = useRouter()

  return (
    <Element name="fact">
      <section
        className="h-screen bg-black px-32 flex justify-between items-center"
      // style={{ backgroundImage: `url('/assets/hero.png')` }}
      >
        <div className="flex flex-col gap-3">
          <motion.h1
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5
            }}
            viewport={{ once: true }}
            className="text-8xl font-bold"
          >
            Taukah kamu?
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5
            }}
            viewport={{ once: true }}
            className="border-2 border-white rounded-xl max-w-3xl p-4"
          >
            <p className="text-justify text-xl">Suku Sunda adalah kelompok etnis terbesar kedua di Indonesia yang terutama mendiami wilayah Jawa Barat dan Banten. Mereka dikenal memiliki budaya yang menjunjung tinggi kesopanan, keramahan, serta nilai kebersamaan. Bahasa Sunda menjadi ciri utama identitas mereka, disertai berbagai tradisi, kesenian, dan adat istiadat yang masih dilestarikan. Kehidupan masyarakat Sunda juga sangat dekat dengan alam dan memiliki filosofi hidup yang sederhana namun harmonis.</p>
          </motion.div>
          <Button
            variant={'default'}
            className="h-12 bg-linear-to-r from-blue-500 to-indigo-600  text-white shadow-lg rounded-xl w-full py-2  hover:from-blue-600  hover:to-indigo-700 transition-all"
            onClick={() => {
              router.push('/more')
            }}
          >
            Selengkapnya
          </Button>
        </div>
        <div
          className="w-1/2 h-full relative"
        >
          {imageProps.map((item, index) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  delay: 0.2 * (index + 1),
                  duration: 0.5
                }}

                className={`absolute w-80 bg-cover bg-bottom h-50 rounded-xl ${item.position}`} key={index}
                style={{ backgroundImage: `url('/assets/${item.link}.jpeg')` }}
              >
              </motion.div>
            )
          })}
        </div>
      </section>
    </Element>
  )
}