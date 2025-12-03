'use client';
import { BottomNav } from "@/components/common/bottom-nav";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react"
import { ArrowRightCircle } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [section, setSection] = useState<number>(0)

    return (
        <div>
            {section == 0 && (
                <section className="bg-[url('/asset/local-food.png')] bg-cover bg-center w-full h-screen text-white">
                    <div className="w-full h-full bg-black/20 inset-0 z-10 absolute"></div>
                    <div className="flex flex-col justify-center px-32 gap-5 h-full z-20 fixed">
                        <h1 className="text-8xl font-bold">Makanan</h1>
                        <p className="max-w-[700px] text-2xl">Makanan Khas Sunda merupakan salah satu khas makanan yang populer di Indonesia. Makanan Suku Sunda memiliki keunikan dibandingkan makanan khas suku lainnya.</p>
                        <Button variant={'outline'} className="w-1/3 rounded-full h-14 text-lg flex items-center">Selengkapnya <ArrowRightCircle className="scale-110" /></Button>
                    </div>
                </section>
            )}
            {section == 1 && (
                <section className="bg-[url('/asset/seni.png')] bg-cover bg-top w-full h-screen text-white">
                    <div className="w-full h-full bg-black/20 inset-0 z-10 absolute"></div>
                    <div className="flex flex-col justify-center px-32 gap-5 h-full z-20 fixed">
                        <h1 className="text-8xl font-bold">Seni</h1>
                        <p className="max-w-[700px] text-2xl">Setiap suku di Indonesia memiliki keseniannya masing-masing, begitu juga dengan Suku Sunda yang memiliki ciri khas seninya.</p>
                        <Button variant={'outline'} className="w-1/3 rounded-full h-14 text-lg flex items-center">Selengkapnya <ArrowRightCircle className="scale-110" /></Button>
                    </div>
                </section>
            )}
            {section == 2 && (
                <section className="bg-[url('/asset/tradisi.png')] bg-cover bg-center w-full h-screen text-white ">
                    <div className="w-full h-full bg-black/20 inset-0 z-10 absolute"></div>
                    <div className="flex flex-col justify-center px-32 gap-5 h-full z-20 fixed">
                        <h1 className="text-8xl font-bold">Tradisi</h1>
                        <p className="max-w-[700px] text-2xl">Tradisi Suku Sunda berakar pada nilai kesopanan, kebersamaan, dan kedekatan dengan alam yang tercermin dalam adat, seni, serta cara hidup sehari-hari. Banyak tradisi seperti Seren Taun, ngaliwet, dan berbagai upacara adat yang tetap dipertahankan sebagai wujud syukur dan penghormatan terhadap leluhur.</p>
                        <Button variant={'outline'} className="w-1/3 rounded-full h-14 text-lg flex items-center">Selengkapnya <ArrowRightCircle className="scale-110" /></Button>
                    </div>
                </section>
            )}
            {section == 3 && (
                <section className="bg-[url('/asset/tari.png')] bg-cover bg-top w-full h-screen text-white ">
                    <div className="w-full h-full bg-black/20 inset-0 z-10 absolute"></div>
                    <div className="flex flex-col justify-center px-32 gap-5 h-full z-20 fixed">
                        <h1 className="text-8xl font-bold">Tarian</h1>
                        <p className="max-w-[700px] text-2xl">Tarian Sunda umumnya menampilkan gerakan halus, anggun, dan penuh ekspresi yang mencerminkan kelembutan budaya masyarakatnya. Banyak tarian seperti Jaipong dan Merak dipentaskan untuk hiburan, penyambutan tamu, serta acara adat.</p>
                        <Button variant={'outline'} className="w-1/3 rounded-full h-14 text-lg flex items-center">Selengkapnya <ArrowRightCircle className="scale-110" /></Button>
                    </div>
                </section>
            )}
            <BottomNav section={section} setSection={setSection} />
        </div>
    );
}