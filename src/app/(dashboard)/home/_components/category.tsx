'use client'
import { Element } from "react-scroll"

interface cardItem {
  name: string,
  image: string,
  link: string,
}

const cardProps: cardItem[] = [
  {
    name: "Makanan",
    image: "makanan",
    link: "/makanan"
  },
  {
    name: "Keunikan",
    image: "gambar3",
    link: ""
  },
  {
    name: "Seni",
    image: "seni",
    link: ""
  },
  {
    name: "Tradisi",
    image: "tradisi",
    link: ""
  },
]

export default function Category() {
  return (
    <Element name="category">
      <section className="bg-black px-32 h-screen flex flex-col justify-center items-center gap-20">
        <h1 className="text-5xl font-bold">Ketahui Lebih Banyak</h1>
        <div className="w-full flex justify-between">
          {cardProps.map((item, index) => {
            return (
              <div
                key={index}
                className="w-75 h-100 bg-cover bg-center rounded-xl flex items-end justify-center relative overflow-hidden p-10 cursor-pointer"
                style={{ backgroundImage: `url('/assets/${item.image}.jpeg')` }}
              >
                <div 
                  className="absolute bottom-0 w-full h-100 backdrop-blur-3xl"
                  style={{
                    maskImage: "linear-gradient(to top, black, transparent)",
                    WebkitMaskImage: "linear-gradient(to top, black, transparent)",
                  }}
                ></div>
                <h2 className="z-20 text-2xl font-bold">{item.name}</h2>
              </div>
            )
          })}
        </div>
      </section>
    </Element>
  )
}