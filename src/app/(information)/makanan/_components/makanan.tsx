'use client'
import CustomCard from "@/components/common/custom-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface foodProps {
  title: string,
  desc: string,
  image: string,
  link: string
}

const foodItems: foodProps[] = [
  {
    title: "Nasi Bakar",
    desc: "Nasi berbumbu yang dibungkus daun pisang lalu dibakar hingga harum. Isinya biasanya terdiri dari ayam suwir, ikan teri, atau rempah khas Sunda yang menghasilkan aroma smoky dan rasa gurih yang khas.",
    image: "nasibakar",
    link: ""
  },
  {
    title: "Karedok",
    desc: "Salad tradisional Sunda berisi sayuran mentah seperti kol, mentimun, tauge, dan kacang panjang yang dicampur sambal kacang segar. Rasanya renyah, pedas, dan segar tanpa proses memasak.",
    image: "karedok",
    link: ""
  },
  {
    title: "Nasi Liwet",
    desc: "Nasi yang dimasak dengan santan ringan, bawang, daun salam, dan teri, menghasilkan rasa gurih lembut. Biasanya disajikan bersama lalapan, sambal, dan lauk tradisional dalam suasana kebersamaan.",
    image: "nasiliwet",
    link: ""
  },
  {
    title: "Batagor",
    desc: "Batagor adalah tahu isi ikan yang digoreng garing lalu disiram saus kacang manis-pedas. Jajanan legendaris Bandung yang populer di seluruh Indonesia.",
    image: "batagor",
    link: ""
  },
  {
    title: "Lotek",
    desc: "Mirip gado-gado, tetapi dengan cita rasa lebih kental dan manis-gurih. Sayuran rebus dicampur bumbu kacang dengan sedikit gula merah dan kencur, menciptakan rasa khas Sunda yang hangat.",
    image: "lotek",
    link: ""
  },
  {
    title: "Serabi",
    desc: "Pancake tradisional dari tepung beras yang dipanggang tanpa minyak, menghasilkan tekstur lembut dan sedikit renyah di pinggir. Biasanya disajikan dengan kuah kinca gula merah atau topping modern.",
    image: "serabi",
    link: ""
  },
]

export function FoodCard(name: string) {
  const router = useRouter();
  const slug = encodeURIComponent(name.toLowerCase().replace(/\s+/g, "-"));

  return (
    <div 
      className="p-4 bg-white shadow cursor-pointer"
      onClick={() => router.push(`/makanan/${slug}`)}
      
    >
      {name}
    </div>
  );
}

export default function MakananSundaPage() {
  const router = useRouter()
    
  return (
    <section className="bg-[url('/assets/makanan.jpeg')] w-full inset-0 bg-cover relative items-center justify-center px-32 py-20">
      <div className="bg-linear-to-b from-black/70 to-black to-95% inset-0 absolute z-10 w-full h-full"></div>
      <div className="relative z-20 flex flex-col gap-10">
        <h1 className="font-bold text-5xl">Jelajahi Makanan Khas Sunda</h1>
        <div className="flex">
          <FilterIcon className="bg-white/10 rounded-xl p-5" width={20} height={20} />
          <Input className="bg-white" />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {foodItems.map((item, index) => {
            return (
              <div key={index}>
                <CustomCard
                  title={item.title}
                  desc={item.desc}
                  image={`/assets/${item.image}.jpg`}
                  route=""
                />
                {FoodCard(item.title)}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}