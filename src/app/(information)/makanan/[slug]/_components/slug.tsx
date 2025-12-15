"use client"

import { useParams } from "next/navigation"
import { foodItems } from "../../data/food"

export default function MakananDetail() {
  const { slug } = useParams()

  const food = foodItems.find(item => item.slug === slug)

  if (!food) {
    return <h1 className="text-center text-2xl">Makanan tidak ditemukan</h1>
  }

  return (
    <section className="px-32 py-20">
      <div
        className="w-full h-30 md:h-90 lg:h-100 rounded-xl bg-cover bg-center mb-6"
        style={{ backgroundImage: `url(/assets/${food.image}.jpg)` }}
      ></div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-bold">{food.title}</h1>
          {food.detail.map((item, index) => {
            return (
              <p
                key={index}
                className="text-xl leading-relaxed"
              >
                {item}
              </p>
            )
          })}
        </div>
        <div>
          <h3 className="text-2xl font-semibold">Berikut langkah-langkah pembuatan {food.title} khas Sunda:</h3>
          <ol className="list-decimal list-inside">
            {food.tutorial.map((item, index) => {
              return (
                <li
                  key={index}
                  className="text-xl leading-relaxed"
                >
                  {item}
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}