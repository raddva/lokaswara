interface TradisiProps {
  title: string,
  list: string[],
  desc: string[]
}

const TradisiItems: TradisiProps[] = [
  {
    title: "Tradisi Pernikahan",
    list: [
      "Ngeyeuk Seureuh",
      "Neundeun Omong",
      "Siraman",
      "Nincak Endog",
      "Buku Pintu"
    ],
    desc: [
      "Ritual simbolis sebelum akad untuk memberikan nasihat kehidupan rumah tangga kepada calon pengantin.",
      "Pertemuan awal keluarga untuk membicarakan rencana pernikahan dan menyampaikan maksud lamaran.",
      "Prosesi memandikan calon pengantin sebagai simbol penyucian diri sebelum memasuki kehidupan baru.",
      "Pengantin pria menginjak telur sebagai lambang kesiapan menjadi kepala keluarga.",
      "Dialog simbolis antara kedua mempelai sebelum bertemu, menggambarkan restu dan izin memasuki kehidupan bersama."
    ]
  },
  {
    title: "Tradisi Upacara Adat",
    list: [
      "Seren Taun",
      "Ngabungbang",
      "Ruwatan Bumi"
    ],
    desc: [
      "Upacara panen raya sebagai ungkapan syukur kepada Tuhan atas hasil bumi, terutama dilakukan oleh masyarakat Sunda Wiwitan.",
      "Ritual membersihkan diri secara spiritual, biasanya dilakukan pada waktu tertentu seperti malam hari menjelang bulan baru.",
      "Upacara untuk menjaga keseimbangan alam dan memohon keselamatan desa, biasanya melibatkan sesajen dan doa bersama."
    ]
  },
  {
    title: "Tradisi Upacara Lainnya",
    list: [
      "Botram",
      "Nyalin",
      "Sisingaan"
    ],
    desc: [
      "Botram adalah tradisi makan bersama yang dilakukan oleh keluarga, kerabat, atau masyarakat dalam suasana santai. Kegiatan ini biasanya disajikan lesehan, dengan makanan yang ditata berjajar atau dalam satu wadah besar sehingga semua orang dapat menyantapnya bersama-sama. Botram bukan sekadar makan, tetapi juga sarana mempererat hubungan, menjaga kebersamaan, dan melestarikan nilai gotong royong dalam budaya Sunda",
      "Nyalin adalah tradisi membantu tetangga atau kerabat yang sedang memiliki hajat, pekerjaan besar, atau kebutuhan mendesak. Bantuan ini bisa berupa tenaga, makanan, peralatan, atau bentuk dukungan lainnya. Tradisi nyalin mencerminkan sikap saling tolong-menolong dalam masyarakat Sunda, di mana kebaikan dianggap sebagai investasi sosial yang suatu saat akan kembali ketika kita membutuhkan pertolongan serupa. Semangat gotong royong ini menjadi bagian penting dalam menjaga keharmonisan hidup bermasyarakat.",
      "Sisingaan adalah tradisi seni pertunjukan khas Subang, di mana anak yang sedang disunat atau dirayakan dinaikkan ke atas boneka singa yang dipanggul oleh empat sampai enam orang. Pertunjukan ini diiringi musik tradisional dan gerakan tari yang penuh energi. Tradisi sisingaan melambangkan keberanian, penghargaan, serta kebanggaan keluarga atas tumbuhnya seorang anak menuju fase kedewasaan. Selain itu, sisingaan juga menjadi simbol perlawanan masyarakat Sunda terhadap penjajahan pada masa lalu."
    ]
  }
]

export default function TradisiSection() {
  return (
    <section className="bg-[url('/assets/lastsection.jpeg')] bg-cover px-32 py-20 items-center justify-center relative">
      <div className="bg-linear-to-b from-black/50 to-black to-95% inset-0 absolute z-10 w-full h-full"></div>
      <div className="relative z-20 flex flex-col gap-10">
        <h1 className="text-5xl font-bold">Tradisi Suku Sunda</h1>
        <div className="flex flex-col gap-5">
          {TradisiItems.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-3 font-semibold"
              >
                <h2 className="text-3xl">{item.title}</h2>
                <ol className="list-decimal ml-5 space-y-4">
                  {item.list.map((listItem, idx) => (
                    <li key={idx}>
                      <h3 className="text-xl font-medium">
                        {listItem}
                      </h3>
                      <p className="text-gray-200 mt-1">
                        {item.desc[idx]}
                      </p>
                    </li>
                  ))}
                </ol>

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}