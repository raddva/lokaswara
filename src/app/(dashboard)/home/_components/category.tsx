'use client'
import { Element } from "react-scroll"
import { motion } from "framer-motion"
import CustomCard from "@/components/common/custom-card"
import { useEffect, useState } from "react"
import { CategoryItem, getCategories } from "../actions"

export default function Category() {
  const [categories, setCategories] = useState<CategoryItem[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  return (
    <Element name="category">
      <section className="bg-black px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-12 sm:py-16 md:py-20 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-center">
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-purple-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Jelajahi Lebih Banyak
            </span>

            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-24 rounded-full bg-linear-to-r from-purple-500 to-indigo-600 opacity-80" />
          </span>
        </motion.h1>


        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 place-items-center">
          {categories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="w-full"
            >
              <CustomCard
                title={item.name}
                desc={item.description}
                image={`/assets/${item.slug}.jpeg`}
                route={`/${item.slug}`}
              />
            </motion.div>
          ))}
        </div>
      </section>
    </Element>
  )
}