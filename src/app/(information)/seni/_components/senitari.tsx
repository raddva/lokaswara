import Image from "next/image"

interface SeniTariProps {
  name: string,
  desc: string,
  image: string
}

const SeniTariItems: SeniTariProps[] =  [
  {
    name: "Tari Jaipong",
    desc: "Jaipong adalah tari energik dan dinamis yang muncul pada 1980-an sebagai pengembangan dari ketuk tilu dan ritme kendang Sunda. Gerakannya lincah, penuh hentakan, dengan unsur keluwesan yang menonjolkan karakter ceria masyarakat Sunda. Tari ini biasanya diiringi musik jaipongan yang kuat dan ritmis.",
    image: ""
  },
  {
    name: "Tari Ketuk Tilu",
    desc: "Tari ketuk tilu merupakan tari tradisional yang lebih tua dari jaipong dan menjadi dasar perkembangannya. Tari ini diiringi musik ritmis dari kendang, gong kecil, kecrek, serta nyanyian sinden. Gerakannya lebih sederhana, bersifat rakyat, dan sering dilakukan dalam acara hiburan kampung atau pesta adat.",
    image: ""
  },
  {
    name: "Tari Merak",
    desc: "Tari Merak menggambarkan keindahan gerak burung merak dengan kostum berwarna cerah dan sayap khas. Gerakannya lembut, anggun, dan penuh ekspresi, menggambarkan keindahan alam Sunda. Tari ini banyak ditampilkan dalam penyambutan tamu penting atau acara budaya.",
    image: ""
  },
  {
    name: "Tari Topeng Sunda",
    desc: "Tari Topeng Sunda menggunakan topeng sebagai properti utama, mencerminkan karakter tertentu seperti lucu, gagah, atau halus. Tarian ini memiliki nilai filosofis dan sering dibawakan dalam pertunjukan seni tradisional. Musik pengiringnya menggunakan gamelan dengan ritme yang khas.",
    image: ""
  },
  {
    name: "Tari Ronggeng Gunung",
    desc: "Tari ini berasal dari daerah Ciamis dan memiliki karakter rakyat yang sederhana tetapi penuh makna. Tarian ini biasanya dipentaskan dalam upacara pertanian sebagai ungkapan syukur kepada alam. Gerakannya halus dengan iringan musik tradisional dan nyanyian berirama pelan.",
    image: ""
  },
]

export default function SeniTari() {
  return (
    <section className="bg-[url('/assets/senitari.jpg')] bg-cover px-32 py-20 items-center jsutify-center relative">
      <div className="bg-linear-to-t from-black/50 to-black to-95% inset-0 absolute z-10 w-full h-full"></div>
      <div className="relative z-20">
        {SeniTariItems.map((item, index) => {
          return (
            <div 
              key={index}
              className=""
            >
              <Image src={`/assets/${item.image}.jpg`} alt={item.image} width={200} height={200} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}