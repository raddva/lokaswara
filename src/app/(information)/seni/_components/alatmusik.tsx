import Image from "next/image"

interface AlatMusikProps {
  name: string,
  desc: string,
  image: string
}

const AlatMusikItems: AlatMusikProps[] = [
  {
    name: "Angklung",
    desc: "Angklung adalah alat musik bambu khas Sunda yang terdiri dari dua hingga tiga tabung bambu berbeda ukuran yang dipasang pada rangka, menghasilkan nada tertentu ketika digoyangkan. Alat musik ini biasanya dimainkan secara berkelompok, karena setiap angklung hanya menghasilkan satu nada sehingga diperlukan kerja sama antar pemain untuk membentuk melodi lengkap. Cara memainkannya yaitu dengan menggenggam rangkanya lalu menggoyangkannya ke kiri dan kanan sesuai irama, sehingga tabung bambu bergetar dan menciptakan nada yang harmonis.",
    image: "angklung"
  },
  {
    name: "Calung",
    desc: "Calung adalah alat musik bambu yang mirip dengan angklung tetapi dimainkan dengan cara dipukul, bukan digoyangkan. Bilah-bilah bambu tersusun seperti papan nada dan menghasilkan suara cerah serta ritmis, sering digunakan dalam pertunjukan rakyat Sunda. Cara memainkannya, pemain memukul bilah bambu menggunakan kedua tangan, menghasilkan pola ritme dan melodi yang teratur serta dapat dikombinasikan dengan alat musik lain seperti kendang atau angklung.",
    image: "calung"
  },
  {
    name: "Kacapi",
    desc: "Kacapi adalah alat musik petik tradisional Sunda yang memiliki bentuk seperti perahu dan menghasilkan suara lembut serta melankolis. Kacapi digunakan dalam berbagai jenis musik Sunda seperti kacapi suling, tembang Cianjuran, dan musik pengiring tradisi. Cara memainkannya, pemain duduk di depan kacapi lalu memetik senar-senarnya dengan jari-jari tangan, menciptakan melodi dasar, pengiring, atau pola ornamen sesuai kebutuhan lagu.",
    image: "kacapi"
  },
  {
    name: "Suling Sunda",
    desc: "Suling Sunda adalah seruling bambu dengan enam lubang nada, terkenal karena suaranya yang lembut, melayang, dan penuh ekspresi. Suling ini sering digunakan dalam degung, kacapi suling, tembang Sunda, hingga pertunjukan tari. Cara memainkannya, pemain meniup lubang tiup sambil mengatur bukaan lubang nada dengan jari, menggunakan teknik napas yang halus dan stabil untuk menghasilkan nada panjang, vibrasi lembut, serta ornamentasi khas Sunda.",
    image: "suling"
  }
]


export default function AlatMusik() {
  return (
    <section className="bg-[url('/assets/alatmusikbg.jpeg')] bg-cover px-32 py-20 items-center jsutify-center relative">
      <div className="bg-linear-to-b from-black/50 to-black to-95% inset-0 absolute z-10 w-full h-full"></div>
      <div className="relative z-20  flex flex-col gap-20">
        <h1 className="text-5xl font-bold">Jelajahi Seni dan Alat Musik Suku Sunda</h1>
        <div
          className="flex flex-col gap-10"
        >
          <h2 className="font-bold text-4xl">Alat Musik</h2>
          {AlatMusikItems.map((item, index) => {
            return (
              <div
                key={index}
                className="flex gap-5"
              >
                <Image src={`/assets/${item.image}.jpg`} alt={item.image} width={200} height={200} className="w-40 h-60 rounded-xl" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-3xl">{item.name}</h3>
                  <p className="text-2xl text-justify">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}