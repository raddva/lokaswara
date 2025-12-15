'use client'
import CustomCard from "@/components/common/custom-card";
import { foodItems } from "../data/food";

export default function MakananSundaPage() {
  return (
    <section className="bg-[url('/assets/makanan.jpeg')] w-full inset-0 bg-cover relative items-center justify-center px-32 py-20">
      <div className="bg-linear-to-b from-black/70 to-black to-95% inset-0 absolute z-10 w-full h-full"></div>
      <div className="relative z-20 flex flex-col gap-10">
        <h1 className="font-bold text-5xl">Jelajahi Makanan Khas Sunda</h1>
        <div className="grid grid-cols-4 gap-3">
          {foodItems.map((item, index) => {
            return (
              <div key={index}>
                <CustomCard
                  title={item.title}
                  desc={item.desc}
                  image={`/assets/${item.image}.jpg`}
                  route={`/makanan/${item.slug}`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}