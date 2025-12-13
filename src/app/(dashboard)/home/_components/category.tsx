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
    desc: "Masakan Sunda bercita rasa segar dan alami, didominasi lalapan, sambal, dan hidangan ringan seperti karedok, pepes, dan nasi liwet.",
    link: "/makanan"
  },
  {
    name: "Keunikan",
    image: "gambar3",
    desc: "Suku Sunda terkenal ramah dan lemah lembut, dengan bahasa bertingkat sebagai bentuk sopan santun serta budaya yang dekat dengan alam.",
    link: "/keunikan"
  },
  {
    name: "Seni",
    image: "seni",
    desc: "Seni tradisional seperti angklung, kecapi suling, jaipong, dan wayang golek menjadi ciri kuat budaya Sunda yang penuh harmoni.",
    link: "/seni"
  },
  {
    name: "Tradisi",
    image: "tradisi",
    desc: "Tradisi seperti seren taun dan berbagai ritual adat mencerminkan rasa syukur, kebersamaan, dan hubungan erat dengan alam.",
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
                <CustomCard 
                  title={item.name} 
                  desc={item.desc} 
                  image={`/assets/${item.image}.jpeg`}
                  route={item.link}
                />
              </motion.div>
            )
          })}
        </div>
      </section>
    </Element>
  )
}