'use client'
import { useRouter } from "next/navigation"
import { Element } from "react-scroll"
import { motion } from "framer-motion"
import CustomCard from "@/components/common/custom-card"

interface cardItem {
  name: string,
  image: string,
  desc: string,
  link: string,
}

const cardProps: cardItem[] = [
  {
    name: "Makanan",
    image: "makanan",
    desc: "Masakan Sunda dikenal dengan cita rasa yang segar, ringan, dan alami, banyak menggunakan lalapan, sambal, serta bumbu sederhana. Hidangan seperti nasi timbel, karedok, pepes, dan sayur asem menggambarkan kedekatan masyarakat Sunda dengan alam serta gaya hidup sehat yang turun-temurun.",
    link: "/makanan"
  },
  {
    name: "Keunikan",
    image: "gambar3",
    desc: "Suku Sunda terkenal dengan sifatnya yang ramah, lemah lembut, dan menjunjung tinggi kesopanan. Bahasa Sunda memiliki tingkatan tutur yang unik, mencerminkan rasa hormat dalam interaksi sosial. Seni musik, tarian, serta keindahan alam pegunungan menjadi ciri khas yang membuat budaya Sunda begitu menonjol.",
    link: "/keunikan"
  },
  {
    name: "Seni",
    image: "seni",
    desc: "Suku Sunda terkenal dengan sifatnya yang ramah, lemah lembut, dan menjunjung tinggi kesopanan. Bahasa Sunda memiliki tingkatan tutur yang unik, mencerminkan rasa hormat dalam interaksi sosial. Seni musik, tarian, serta keindahan alam pegunungan menjadi ciri khas yang membuat budaya Sunda begitu menonjol.",
    link: "/seni"
  },
  {
    name: "Tradisi",
    image: "tradisi",
    desc: "Suku Sunda terkenal dengan sifatnya yang ramah, lemah lembut, dan menjunjung tinggi kesopanan. Bahasa Sunda memiliki tingkatan tutur yang unik, mencerminkan rasa hormat dalam interaksi sosial. Seni musik, tarian, serta keindahan alam pegunungan menjadi ciri khas yang membuat budaya Sunda begitu menonjol.",
    link: "/tradisi"
  },
]

export default function Category() {
  const router = useRouter()

  return (
    <Element name="category">
      <section className="bg-black  px-32 h-screen flex flex-col justify-center items-center gap-20">
        <h1 className="text-5xl font-bold">Jelajahi Lebih Banyak</h1>
        <div className="w-full flex gap-5">
          {cardProps.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.2 * index, 
                  duration: 0.8, 
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                <CustomCard title={item.name} desc={item.desc} image={`/assets/${item.image}.jpeg`} />
              </motion.div>
            )
          })}
        </div>
      </section>
    </Element>
  )
}