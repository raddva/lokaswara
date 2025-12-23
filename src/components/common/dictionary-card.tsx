'use client'

import { DictionaryItem } from "@/constants/dictionary-constant"

export function DictionaryCard({ item }: { item: DictionaryItem }) {
    return (
        <div className="group w-full max-w-sm mx-auto rounded-2xl border border-white/10 bg-black/50 p-5 backdrop-blur-md transition-all duration-300 hover:border-purple-400/40 hover:bg-black/60 hover:scale-[1.02]">
            <h2 className="text-lg font-bold text-white group-hover:text-purple-400 transition">
                {item.word}
            </h2>

            {item.pronunciation && (
                <p className="mt-1 text-sm italic text-white/60">
                    {item.pronunciation}
                </p>
            )}

            <p
                className="mt-3 text-sm text-white/80 line-clamp-3 group-hover:line-clamp-none transition-all duration-300"
            >
                {item.meaning}
            </p>

            {item.synonym && (
                <p className="mt-3 text-xs text-blue-300">
                    Sinonim: {item.synonym}
                </p>
            )}
        </div>
    )
}
