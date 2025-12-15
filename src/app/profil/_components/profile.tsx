import Image from "next/image"

interface memberProps {
  image: string,
  name: string
}

const memberItems: memberProps[] = [
  {
    image: "darrel",
    name: "Darrel Mark Yoel Exaudi Silalahi"
  },
  {
    image: "nadya",
    name: "Nadya Auradiva"
  },
  {
    image: "arini",
    name: "Maysisca Arini"
  },
  {
    image: "danish",
    name: "Muhammad Danish Arrafisya Maula"
  },
  {
    image: "reksa",
    name: "Dewa Gede Reksa Parama Aditya"
  },
  {
    image: "zayid",
    name: "Muhammad Zayid Yuslaifa Zumal"
  },
  {
    image: "hafiz",
    name: "Akhmad Hafiz"
  },
  {
    image: "farhan",
    name: "Muhammad Farhan Putra Maulana"
  },
]

export default function ProfileSection() {
  return (
    <section className="bg-[url('/assets/profilebg.jpeg')] bg-fixed w-full bg-cover relative items-center justify-center px-32 py-20">
      <div className="bg-linear-to-b from-black/50 to-black to-95% inset-0 absolute z-10 w-full h-full"></div>
      <div className="w-full h-full relative z-20 flex flex-col gap-10">
        <h1 className="text-5xl font-bold text-center">Profil Kelompok</h1>
        <div className="bg-white w-full h-full rounded-xl">
          <Image src="logo.svg" alt="" width={300} height={300} />
        </div>
        <div className="flex flex-col justify-center gap-10">
          {memberItems.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <Image src={`/assets/${item.image}.jpg`} alt={item.image} width={100} height={100} className="rounded-full" />
                <h3 className="text-xl font-bold text-center">{item.name}</h3>
                <p>{ }</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 