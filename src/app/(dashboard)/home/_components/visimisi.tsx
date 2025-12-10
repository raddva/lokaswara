'use client'
import { motion } from "framer-motion"

interface aboutItems {
  title: string,
  desc: string
}

const aboutProps: aboutItems[] = [
  {
    title: "LokaSwara",
    desc: "Platform digital yang kami kembangkan untuk melestarikan budaya Indonesia dengan cara yang modern dan mudah diakses. Melalui situs ini, pengguna dapat menikmati berbagai konten budaya seperti seni, tradisi, bahasa, dan cerita rakyat yang dikemas secara menarik. Lokaswara juga menjadi ruang kolaborasi antara kreator, komunitas budaya, dan masyarakat umum untuk berbagi pengetahuan serta karya. Dengan pendekatan digital, Lokaswara bertujuan menjaga warisan budaya Indonesia tetap hidup"
  },
  {
    title: "Tujuan",
    desc: "Menjaga keberlanjutan budaya Indonesia dengan mengubahnya ke dalam format digital yang lebih mudah dijangkau generasi masa kini. Kami ingin menghadirkan media pembelajaran dan hiburan yang memperkenalkan kekayaan tradisi, seni, dan nilai budaya secara menarik. Upaya ini juga bertujuan memperluas jangkauan pelestarian budaya hingga ke masyarakat global melalui teknologi. Selain itu, kami berharap produk digital ini dapat menumbuhkan rasa bangga dan kepedulian masyarakat terhadap warisan budaya bangsa."
  },
  {
    title: "Visi Misi",
    desc: "Menjadi penggerak utama pelestarian budaya Indonesia melalui inovasi produk digital yang mudah diakses oleh seluruh masyarakat. Misi kami mencakup pengembangan platform yang menghadirkan konten budaya secara autentik, edukatif, dan menarik. Kami berkomitmen untuk berkolaborasi dengan komunitas, seniman, dan pelaku budaya guna memastikan warisan leluhur tetap relevan di era modern. Selain itu, kami berupaya memanfaatkan teknologi untuk mendokumentasikan, mempromosikan, dan menyebarkan nilai-nilai budaya ke generasi mendatang."
  },
]

export default function VisiMisi() {
  return (
    <section
      className="h-screen bg-cover bg-bottom relative flex flex-col justify-center px-32 gap-10"
      style={{ backgroundImage: `url('/assets/lastsection.jpeg')` }}
    >
      <div className="bg-linear-to-b from-black to-black/50 inset-0 absolute z-10 w-full h-full"></div>
      <h1 className="text-5xl font-bold relative z-20">Tentang Kami</h1>
      <div className="relative z-20 flex flex-col gap-5">
        {aboutProps.map((item, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 * index,
                duration: 0.8,
                ease: "easeOut"
              }}
              viewport={{ once: false }}
              className="border-2 border-white rounded-xl p-5 backdrop-blur-lg"
            >
              <div className="flex gap-3 items-center">
                <img src="/assets/logo_white.svg" alt="logo" width={30} />
                <h2 className="text-2xl font-bold">{item.title}</h2>
              </div>
              <p className="text-justify pt-2">{item.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
} 