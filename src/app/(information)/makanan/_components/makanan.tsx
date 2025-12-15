'use client'
import CustomCard from "@/components/common/custom-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface foodProps {
  slug: string,
  title: string,
  desc: string,
  image: string,
  link: string
}

export const foodItems: foodProps[] = [
  {
    slug: "nasi-bakar",
    title: "Nasi Bakar",
    desc: "Nasi berbumbu yang dibungkus daun pisang lalu dibakar hingga harum. Isinya biasanya terdiri dari ayam suwir, ikan teri, atau rempah khas Sunda yang menghasilkan aroma smoky dan rasa gurih yang khas.",
    image: "nasibakar",
    link: ""
  },
  {
    slug: "karedok",
    title: "Karedok",
    desc: "Salad tradisional Sunda berisi sayuran mentah seperti kol, mentimun, tauge, dan kacang panjang yang dicampur sambal kacang segar. Rasanya renyah, pedas, dan segar tanpa proses memasak.",
    image: "karedok",
    link: ""
  },
  {
    slug: "nasi-liwet",
    title: "Nasi Liwet",
    desc: "Nasi yang dimasak dengan santan ringan, bawang, daun salam, dan teri, menghasilkan rasa gurih lembut. Biasanya disajikan bersama lalapan, sambal, dan lauk tradisional dalam suasana kebersamaan.",
    image: "nasiliwet",
    link: ""
  },
  {
    slug: "batagor",
    title: "Batagor",
    desc: "Batagor adalah tahu isi ikan yang digoreng garing lalu disiram saus kacang manis-pedas. Jajanan legendaris Bandung yang populer di seluruh Indonesia.",
    image: "batagor",
    link: ""
  },
  {
    slug: "lotek",
    title: "Lotek",
    desc: "Mirip gado-gado, tetapi dengan cita rasa lebih kental dan manis-gurih. Sayuran rebus dicampur bumbu kacang dengan sedikit gula merah dan kencur, menciptakan rasa khas Sunda yang hangat.",
    image: "lotek",
    link: ""
  },
  {
    slug: "serabi",
    title: "Serabi",
    desc: "Pancake tradisional dari tepung beras yang dipanggang tanpa minyak, menghasilkan tekstur lembut dan sedikit renyah di pinggir. Biasanya disajikan dengan kuah kinca gula merah atau topping modern.",
    image: "serabi",
    link: ""
  },
]

export default function MakananSundaPage() {
  const router = useRouter()

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

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
                  route={`/makanan/${slugify(item.title)}`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}