'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FoodsItem, getFoods } from "../../actions"

export default function MakananDetail() {
  const { slug } = useParams()
  const [food, setFood] = useState<FoodsItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFood = async () => {
      const data = await getFoods()
      const found = data.find(item => item.slug === slug)
      setFood(found || null)
      setLoading(false)
    }

    fetchFood()
  }, [slug])

  if (loading) return <p className="text-center text-xl mt-20 text-white/80">Loading...</p>
  if (!food) return <h1 className="text-center text-2xl mt-20 text-white/80">Makanan tidak ditemukan</h1>

  return (
    <section className="relative min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-16 bg-linear-to-b from-gray-900 to-black flex flex-col gap-16">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" />

      <motion.div
        className="flex flex-col md:flex-row items-center md:items-start gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="w-full md:w-[200px] h-[200px] rounded-3xl shadow-2xl border border-white/10 bg-cover bg-center shrink-0"
          style={{ backgroundImage: `url(${food.image_url})` }} />

        <motion.div
          className="flex-1 flex flex-col gap-4 bg-black/40 border border-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            <span className="bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {food.name}
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
            {food.description}
          </p>
        </motion.div>
      </motion.div>

      {food.ingredients && (
        <motion.div
          className="p-6 rounded-3xl shadow-lg bg-black/40 border border-white/10 backdrop-blur-md"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">
            Bahan-bahan
          </h2>
          <div className="w-full p-4 rounded-lg max-h-72 sm:max-h-80 md:max-h-96 overflow-auto bg-black/30 border border-white/10 backdrop-blur-sm text-white/85">
            {food.ingredients.split('\n').map((line, idx) => (
              <p key={idx} className="mb-1">{line}</p>
            ))}
          </div>
        </motion.div>
      )}

      {food.tutorial && (
        <motion.div
          className="p-6 rounded-3xl shadow-lg bg-black/40 border border-white/10 backdrop-blur-md"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: false }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4">
            Langkah-langkah Pembuatan
          </h2>
          <div className="w-full p-4 rounded-lg max-h-80 sm:max-h-96 md:max-h-112 overflow-auto bg-black/30 border border-white/10 backdrop-blur-sm text-white/85">
            {food.tutorial.split('\n').map((line, idx) => (
              <p key={idx} className="mb-1">{line}</p>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  )
}
