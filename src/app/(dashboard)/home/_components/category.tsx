'use client'
import { useRouter } from "next/navigation"
import { Element } from "react-scroll"
import { motion } from "framer-motion"

interface cardItem {
  name: string,
  image: string,
  link: string,
}

const cardProps: cardItem[] = [
  {
    name: "Makanan",
    image: "makanan",
    link: "/makanan"
  },
  {
    name: "Keunikan",
    image: "gambar3",
    link: "/keunikan"
  },
  {
    name: "Seni",
    image: "seni",
    link: "/seni"
  },
  {
    name: "Tradisi",
    image: "tradisi",
    link: "/tradisi"
  },
]

export default function Category() {
  const router = useRouter()

  return (
    <Element name="category">
      <section className="bg-black px-32 h-screen flex flex-col justify-center items-center gap-20">
        <h1 className="text-5xl font-bold">Jelajahi Lebih Banyak</h1>
        <div className="w-full flex justify-between">
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
                className="w-75 h-100 bg-cover bg-center rounded-xl flex items-end justify-center relative overflow-hidden p-10 cursor-pointer"
                style={{ backgroundImage: `url('/assets/${item.image}.jpeg')` }}
                onClick={() => {
                  router.push(item.link)
                }}
              >
                <div
                  className="absolute bottom-0 w-full h-100 backdrop-blur-3xl"
                  style={{
                    maskImage: "linear-gradient(to top, black, transparent)",
                    WebkitMaskImage: "linear-gradient(to top, black, transparent)",
                  }}
                ></div>
                <h2 className="z-20 text-2xl font-bold">{item.name}</h2>
              </motion.div>
            )
          })}
        </div>
      </section>
    </Element>
  )
}