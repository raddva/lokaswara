'use client'
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import { Element, scroller } from "react-scroll"

export default function Hero() {
  return (
    <Element name="hero">
      <section
        className="bg-[url('/assets/hero.png')] bg-fixed bg-cover bg-center h-screen w-full relative flex items-center justify-center"
      >
        <div className="bg-linear-to-b from-black/50 to-black to-99% inset-0 absolute z-10 w-full h-full"></div>
        <div className="z-20 relative flex flex-col gap-5 items-center justify-center h-full px-4 sm:px-8 md:px-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight"
          >
            Menghidupkan Kembali Warisan Nusantara<br className="hidden sm:block" /> di Era Digital
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xs sm:max-w-lg md:max-w-2xl text-center px-4"
          >
            Jelajahi kekayaan tradisi Indonesia yang telah terdokumentasi dalam platform digital yang mudah diakses.
          </motion.h2>
          <Button
            variant={'outline'}
            onClick={() => {
              scroller.scrollTo("fact", {
                duration: 1000,
                smooth: "easeInOutQuart",
                offset: -10,
              });
            }}
            className="w-48 sm:w-56 md:w-60 h-12 sm:h-13 md:h-14 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" /> Mulai Menjelajah
          </Button>
        </div>
      </section>
    </Element>
  )
}