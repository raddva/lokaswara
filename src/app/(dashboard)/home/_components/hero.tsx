'use client'
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import { Element, scroller } from "react-scroll"

export default function Hero() {
  return (
    <Element name="hero">
      <section
        className="bg-[url('/assets/hero.png')] bg-fixed h-screen w-full inset-0 bg-cover relative items-center justify-center"
      >
        <div className="bg-linear-to-b from-black/50 to-black to-99% inset-0 absolute z-10 w-full h-full"></div>
        <div className="z-20 relative flex flex-col gap-5 items-center justify-center h-full">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-5xl text-center"
          >
            Menghidupkan Kembali Warisan Nusantara<br /> di Era Digital
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg max-w-2xl text-center"
          >
            Jelajahi kekayaan tradisi Indonesia yang telah terdokumentasi dalam platform digital yang mudah diakses.
          </motion.h2>
          <Button
            variant={'outline'}
            onClick={() => {
              scroller.scrollTo("fact", {
                duration: 800,
                smooth: "easeInOutQuart",
                offset: -10,
              });
            }}
            className="w-60 h-14 rounded-xl align-bottom"
          >
            <ArrowDown /> Mulai Menjelajah
          </Button>
        </div>
      </section>
    </Element>
  )
}