/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { getDictionary } from "../actions"
import { DictionaryItem } from "@/constants/dictionary-constant"
import { DictionaryCard } from "@/components/common/dictionary-card"
import { Pagination } from "@/components/common/pagination"

const ITEMS_PER_PAGE = 32

export default function Dictionary() {
    const [words, setWords] = useState<DictionaryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchDictionary = async () => {
            const data = await getDictionary()
            setWords(data)
            setLoading(false)
        }

        fetchDictionary()
    }, [])

    const filteredWords = useMemo(() => {
        const q = search.toLowerCase().trim()
        if (!q) return words

        return words.filter(item =>
            item.word.toLowerCase().includes(q)
        )
    }, [search, words])

    const totalPages = Math.ceil(filteredWords.length / ITEMS_PER_PAGE)

    const paginatedWords = filteredWords.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    return (
        <section className="relative w-full bg-[url('/assets/kamus.jpg')] bg-cover bg-center px-4 sm:px-8 md:px-16 lg:px-32 py-20">
            <div className="absolute inset-0 bg-linear-to-b from-black/70 to-black/95 z-10" />

            <div className="relative z-20 flex flex-col gap-10">
                <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
                    <span className="relative inline-block">
                        <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Kamus Bahasa Sunda
                        </span>
                        <div className="mt-2 h-1 w-24 rounded-full bg-linear-to-r from-purple-500 to-blue-500" />
                    </span>
                </h1>

                <div className="max-w-md">
                    <input
                        type="text"
                        placeholder="Cari kata..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl bg-black/60 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-500/20 transition"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading &&
                        Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                            <SkeletonDictionaryCard key={i} />
                        ))}

                    {!loading && paginatedWords.length === 0 && (
                        <p className="col-span-full text-center text-white/60">
                            Kata tidak ditemukan.
                        </p>
                    )}

                    {!loading &&
                        paginatedWords.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.45,
                                    ease: "easeOut",
                                    delay: index * 0.03,
                                }}
                                className="group"
                            >
                                <div className="relative overflow-hidden transition-all duration-300 group-hover:scale-[1.03]">
                                    <DictionaryCard item={item} />
                                </div>

                                <style jsx>{`
                                    .group:hover :global(.line-clamp-4) {
                                        -webkit-line-clamp: unset;
                                        overflow: visible;
                                        display: block;
                                    }
                                `}</style>
                            </motion.div>
                        ))}
                </div>

                {!loading && totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                )}
            </div>
        </section>
    )
}

function SkeletonDictionaryCard() {
    return (
        <div className="w-full max-w-sm mx-auto rounded-2xl bg-black/50 border border-white/10 p-5 animate-pulse">
            <div className="h-5 w-2/3 bg-white/10 rounded mb-2" />
            <div className="h-3 w-1/3 bg-white/10 rounded mb-4" />
            <div className="h-3 w-full bg-white/10 rounded mb-2" />
            <div className="h-3 w-5/6 bg-white/10 rounded" />
        </div>
    )
}
