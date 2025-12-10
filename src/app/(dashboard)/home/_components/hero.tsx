'use client'
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { motion } from "framer-motion"
import { scroller } from "react-scroll"

export default function Hero() {
  return (
    <section
      className="bg-[url('/assets/hero.png')] bg-fixed h-screen w-full inset-0 bg-cover relative items-center justify-center"
    >
      <div className="bg-linear-to-b from-black/50 to-black to-99% inset-0 absolute z-10 w-full h-full"></div>
      <motion.div
        initial={{ opacity: 0, fontSize: 0 }}
        animate={{ opacity: 1, fontSize: 1 }}

        className="z-20 relative flex flex-col gap-5 items-center justify-center h-full"
      >
        <h1 className="font-bold text-5xl text-center">Menghidupkan Kembali Warisan Nusantara<br /> di Era Digital</h1>
        <p className="text-lg max-w-2xl text-center">Jelajahi kekayaan tradisi Indonesia yang telah terdokumentasi dalam platform digital yang mudah diakses.</p>
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
      </motion.div>
    </section>
  )
}