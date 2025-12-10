'use client'
import { Button } from "@/components/ui/button"
import { Element, scroller } from "react-scroll"

interface imageData {
  link: string,
  position: string
}

const imageProps: imageData[] = [
  {
    link: "gambar1",
    position: "top-15 left-20"
  },
  {
    link: "gambar2",
    position: "top-75 right-0"
  },
  {
    link: "gambar3",
    position: "bottom-10 left-10"
  },
]

export default function Penjelasan() {
  return (
    <Element name="fact">
      <section
        className="h-screen bg-black px-32 flex justify-between items-center"
      // style={{ backgroundImage: `url('/assets/hero.png')` }}
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-8xl font-bold">Taukah kamu?</h1>
          <div className="border-2 border-white rounded-xl max-w-3xl p-4">
            <p className="text-justify text-xl">Suku Sunda adalah kelompok etnis terbesar kedua di Indonesia yang terutama mendiami wilayah Jawa Barat dan Banten. Mereka dikenal memiliki budaya yang menjunjung tinggi kesopanan, keramahan, serta nilai kebersamaan. Bahasa Sunda menjadi ciri utama identitas mereka, disertai berbagai tradisi, kesenian, dan adat istiadat yang masih dilestarikan. Kehidupan masyarakat Sunda juga sangat dekat dengan alam dan memiliki filosofi hidup yang sederhana namun harmonis.</p>
          </div>
          <Button
            variant={'default'}
            className="h-12" 
            onClick={() => {
              scroller.scrollTo("category", {
                duration: 800,
                smooth: "easeInOutQuart",
                offset: -10,
              });
            }}
          >
            Selengkapnya
          </Button>
        </div>
        <div className="w-1/2 h-full relative">
          {imageProps.map((item, index) => {
            return (
              <div
                className={`absolute w-80 bg-cover bg-bottom h-50 rounded-xl ${item.position}`} key={index}
                style={{ backgroundImage: `url('/assets/${item.link}.jpeg')` }}
              >
              </div>
            )
          })}
        </div>
      </section>
    </Element>
  )
}