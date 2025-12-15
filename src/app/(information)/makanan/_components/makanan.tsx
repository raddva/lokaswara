'use client'

import CustomCard from "@/components/common/custom-card"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FoodsItem, getFoods } from "../actions"

export default function MakananSundaPage() {
  const [foods, setFoods] = useState<FoodsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFoods = async () => {
      const data = await getFoods()
      setFoods(data)
      setLoading(false)
    }

    fetchFoods()
  }, [])

  return (
    <section className="relative w-full bg-[url('/assets/makanan.jpeg')] bg-cover bg-center px-4 sm:px-8 md:px-16 lg:px-32 py-20">
      <div className="absolute inset-0 bg-linear-to-b from-black/70 to-black/95 z-10" />

      <div className="relative z-20 flex flex-col gap-10">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Jelajahi Makanan Khas Sunda
            </span>

            <div className="relative z-10 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full mt-2" />
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}

          {!loading &&
            foods.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
              >
                <CustomCard
                  title={item.name}
                  desc={item.description}
                  image={item.image_url}
                  route={`/makanan/${item.slug}`}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}

function SkeletonCard() {
  return (
    <div className="w-full max-w-sm mx-auto bg-black/50 border border-white/10 rounded-2xl p-5 animate-pulse">
      <div className="h-40 bg-white/10 rounded-xl mb-4" />
      <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
      <div className="h-3 bg-white/10 rounded w-full" />
    </div>
  )
}
