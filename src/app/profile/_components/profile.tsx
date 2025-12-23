"use client"

import Image from "next/image"
import { getProfiles, Profiles } from "../actions"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ProfileSection() {
  const [profiles, setProfiles] = useState<Profiles[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfiles = async () => {
      const data = await getProfiles()
      setProfiles(data)
      setLoading(false)
    }

    fetchProfiles()
  }, [])

  return (
    <section className="relative w-full bg-[url('/assets/profilebg.jpeg')] bg-cover bg-fixed">
      <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black/95 z-10" />
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-20 flex flex-col gap-16">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-white tracking-tight"
        >
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Profil Kelompok
            </span>

            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-24 rounded-full bg-linear-to-r from-purple-500 to-indigo-600 opacity-80" />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-[220px] sm:h-[300px] md:h-[500px]
             rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        >
          <Image
            src="/assets/group-photo.jpeg"
            alt="Foto Kelompok"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}

          {!loading &&
            profiles.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                className="bg-white/5 border border-white/10 backdrop-blur-md
                 rounded-2xl p-6 flex flex-col items-center
                 text-center gap-4 hover:bg-white/10 transition"
              >
                <div className="relative w-28 h-28">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="rounded-full object-cover border border-white/20"
                  />
                </div>

                <h3 className="text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
        </div>

      </div>
    </section>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6
                    flex flex-col items-center gap-4 animate-pulse">
      <div className="w-28 h-28 rounded-full bg-white/10" />
      <div className="h-4 w-32 bg-white/10 rounded" />
      <div className="h-3 w-full bg-white/10 rounded" />
      <div className="h-3 w-5/6 bg-white/10 rounded" />
    </div>
  )
}
