"use client"

import { motion } from "framer-motion"
import { getKebudayaan, KebudayaanT } from "../actions"
import { useEffect, useState } from "react"

export default function Kebudayaan() {
  const [data, setData] = useState<KebudayaanT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getKebudayaan()
      setData(data)
      setLoading(false)
    }
    fetchData()
  }, [])

  const SkeletonCard = () => (
    <div className="flex flex-col md:flex-row gap-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full md:w-1/3 aspect-square bg-gray-700/30" />
      <div className="flex-1 p-6 flex flex-col gap-4">
        <div className="h-8 w-3/4 bg-gray-700/30 rounded-lg" />
        <div className="space-y-2 mt-2">
          <div className="h-4 w-full bg-gray-700/20 rounded-lg" />
          <div className="h-4 w-full bg-gray-700/20 rounded-lg" />
          <div className="h-4 w-5/6 bg-gray-700/20 rounded-lg" />
          <div className="h-4 w-2/3 bg-gray-700/20 rounded-lg" />
        </div>
        <div className="h-6 w-24 bg-gray-700/30 rounded-full mt-4" />
      </div>
    </div>
  )

  return (
    <section className="relative bg-linear-to-b from-gray-900 to-black min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-16 flex flex-col gap-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-center mb-10"
      >
        <span className="relative inline-block">
          <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Kebudayaan Suku Sunda
          </span>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-24 rounded-full bg-linear-to-r from-purple-500 to-indigo-600 opacity-80" />
        </span>
      </motion.h1>

      <div className="flex flex-col gap-8">
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)
          : data.map((item) => (
            <motion.div
              key={item.id}
              className="flex flex-col md:flex-row gap-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <div
                className="w-full md:w-1/3 aspect-square bg-cover bg-center shrink-0"
                style={{ backgroundImage: `url(${item.featured_image_url})` }}
              />
              <div className="flex-1 p-6 flex flex-col gap-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {item.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                  {item.body.length > 400 ? item.body.slice(0, 400) + '...' : item.body}
                </p>
                <a
                  href={`/kebudayaan/${item.slug}`}
                  className="self-start mt-2 text-purple-400 hover:text-purple-500 font-medium transition-colors"
                >
                  Read more →
                </a>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  )
}
