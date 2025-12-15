interface foodProps {
  slug: string;
  title: string;
  desc: string;
  image: string;
  detail: string[];
  tutorial: string[];
}

export const foodItems: foodProps[] = [
  {
    slug: "nasi-bakar",
    title: "Nasi Bakar",
    desc: "Nasi berbumbu yang dibungkus daun pisang lalu dibakar hingga harum. Isinya biasanya terdiri dari ayam suwir, ikan teri, atau rempah khas Sunda yang menghasilkan aroma smoky dan rasa gurih yang khas.",
    image: "nasibakar",
    detail: [
      "Nasi Bakar adalah hidangan tradisional yang dibuat dengan cara membungkus nasi berbumbu rempah dalam daun pisang, kemudian membakarnya hingga menghasilkan aroma smoky yang khas. Biasanya, nasi ini diisi dengan lauk seperti ayam suwir, teri, jamur, atau sambal yang menambah cita rasa gurih dan pedas sekaligus mempertahankan keharuman alami daun pisang.",
      "Teknik pembakaran membuat bumbunya semakin meresap, menjadikan nasi bakar tidak hanya wangi tetapi juga kaya rasa tanpa harus menggunakan banyak minyak. Hidangan ini sering disajikan sebagai makanan rumahan maupun menu favorit di warung makanan Sunda karena keunikannya yang memadukan kesederhanaan, kehangatan, dan cita rasa tradisional yang khas.",
    ],
    tutorial: [
      "Masak nasi gurih dengan menanak beras bersama santan, garam, daun salam, dan serai hingga matang.",
      "Siapkan isian seperti ayam suwir, teri, jamur, atau sambal, lalu tumis dengan bumbu halus (bawang merah, bawang putih, cabai, kemiri, dan rempah lainnya).",
      "Ambil selembar daun pisang, layukan sebentar di atas api agar lentur, lalu letakkan nasi dan beri isian di tengahnya.",
      "Gulung daun pisang, padatkan dan semat ujungnya dengan tusuk lidi agar tidak terbuka.",
      "Bakar gulungan nasi di atas bara atau teflon hingga daun pisang sedikit menghitam dan aromanya keluar.",
      "Sajikan hangat, biasanya ditemani sambal dan lalapan.",
    ],
  },
  {
    slug: "karedok",
    title: "Karedok",
    desc: "Salad tradisional Sunda berisi sayuran mentah seperti kol, mentimun, tauge, dan kacang panjang yang dicampur sambal kacang segar. Rasanya renyah, pedas, dan segar tanpa proses memasak.",
    image: "karedok",
    detail: [
      "Karedok khas Sunda adalah hidangan tradisional berupa sayuran mentah seperti kacang panjang, kol, tauge, terong lalap, dan timun yang disiram dengan bumbu kacang segar. Bumbunya dibuat dari kacang tanah, bawang putih, cabai, kencur, gula merah, dan sedikit cuka atau asam, sehingga menghasilkan cita rasa segar, pedas, dan wangi rempah yang khas.",
      "Keunikan karedok terletak pada penggunaan sayuran mentah yang memberikan tekstur renyah sekaligus rasa alami yang tidak berubah akibat proses pemasakan. Hidangan ini sering disajikan sebagai pendamping nasi atau lauk utama, mencerminkan kesederhanaan sekaligus kekayaan cita rasa kuliner Sunda yang menonjolkan kesegaran bahan-bahan alami.",
    ],
    tutorial: [
      "Siapkan sayuran mentah: kacang panjang, timun, kol, tauge, dan terong lalap.",
      "Haluskan bumbu: kacang tanah goreng, bawang putih, cabai, kencur, garam, gula merah, dan asam/cuka.",
      "Tambahkan sedikit air ke bumbu hingga mencapai kekentalan yang pas.",
      "Iris atau potong sayuran sesuai selera.",
      "Campurkan sayuran dengan bumbu kacang hingga merata.",
      "Sajikan segera agar tetap segar dan renyah.",
    ],
  },
  {
    slug: "nasi-liwet",
    title: "Nasi Liwet",
    desc: "Nasi yang dimasak dengan santan ringan, bawang, daun salam, dan teri, menghasilkan rasa gurih lembut. Biasanya disajikan bersama lalapan, sambal, dan lauk tradisional dalam suasana kebersamaan.",
    image: "nasiliwet",
    detail: [
      "Nasi liwet khas Sunda adalah hidangan nasi gurih yang dimasak bersama santan, bawang merah, bawang putih, serai, daun salam, dan sedikit garam sehingga menghasilkan rasa yang lembut, wangi, dan kaya rempah. Proses memasaknya bisa menggunakan panci, kastrol, atau magic com, namun cara tradisional memakai panci liwet di atas api kecil, membuat aroma santan dan rempah meresap sempurna ke dalam butir nasi.",
      "Keunikan nasi liwet terletak pada penggunaan bahan pelengkap seperti ikan teri, cabai rawit utuh, dan daun kemangi yang dimasukkan saat menanak, memberikan rasa gurih-pedas-aromatik yang khas Sunda. Hidangan ini biasa disajikan bersama tahu-tempe goreng, ayam, sambal, dan lalapan, menjadikannya menu favorit untuk makan bersama, terutama pada acara keluarga atau tradisi ngaliwet yang penuh kebersamaan.",
    ],
    tutorial: [
      "Cuci beras hingga bersih lalu tiriskan.",
      "Tumis bawang merah dan bawang putih dengan sedikit minyak sampai harum.",
      "Masukkan serai dan daun salam, aduk sebentar hingga aromanya keluar.",
      "(Opsional) Tambahkan ikan teri, tumis hingga sedikit kering dan wangi.",
      "Masukkan beras ke dalam tumisan, aduk hingga bumbu merata dan menyerap.",
      "Tuang air dan santan, lalu tambahkan garam sesuai selera.",
      "Aduk perlahan sekali agar santan tidak pecah, kemudian masukkan cabai rawit utuh (opsional).",
      "Masak dengan api kecil hingga air menyusut dan nasi hampir matang.",
      "Tambahkan daun kemangi, tutup kembali, dan biarkan nasi mengukus hingga matang sempurna.",
      "Aduk pelan sebelum disajikan agar bumbu merata di seluruh bagian nasi.",
    ],
  },
  {
    slug: "batagor",
    title: "Batagor",
    desc: "Batagor adalah tahu isi ikan yang digoreng garing lalu disiram saus kacang manis-pedas. Jajanan legendaris Bandung yang populer di seluruh Indonesia.",
    image: "batagor",
    detail: [
      "Batagor khas Sunda adalah jajanan berbahan dasar tahu yang diisi adonan ikan tenggiri atau ikan lain yang dicampur tepung tapioka, kemudian digoreng hingga berwarna keemasan dan renyah. Selain tahu, batagor juga biasanya menggunakan kulit pangsit berisi adonan ikan, sehingga memberikan variasi tekstur yang garing di luar namun lembut di dalam. Hidangan ini berasal dari Bandung dan menjadi salah satu kuliner paling populer karena rasanya yang gurih, ringan, dan cocok dinikmati kapan saja.",
      "Keistimewaan batagor terletak pada bumbu kacangnya yang kaya rasa, dibuat dari kacang tanah goreng, gula merah, bawang putih, cabai, dan sedikit air jeruk limau untuk aroma segar. Biasanya batagor disajikan dengan tambahan kecap manis, sambal, dan perasan jeruk limau, sehingga menghasilkan perpaduan rasa gurih, manis, pedas, dan asam yang seimbang. Kelezatan dan kepraktisannya menjadikan batagor tidak hanya jajanan jalanan, tetapi juga favorit di rumah makan Sunda dan restoran modern.",
    ],
    tutorial: [
      "Buat adonan isi dengan mencampurkan ikan giling, tepung tapioka, bawang putih halus, daun bawang, telur, garam, merica, dan sedikit air hingga lembut.",
      "Siapkan tahu, keruk bagian tengahnya dan isi dengan adonan ikan sampai padat.",
      "Isi kulit pangsit dengan adonan lalu lipat sesuai selera.",
      "Panaskan minyak, lalu goreng tahu isi dan pangsit hingga berwarna keemasan dan renyah.",
      "Buat bumbu kacang dengan menghaluskan kacang tanah goreng, bawang putih goreng, cabai, gula merah, dan garam; encerkan dengan air panas.",
      "Sajikan batagor dengan siraman bumbu kacang, tambahan kecap, sambal, dan perasan jeruk limau.",
    ],
  },
  {
    slug: "lotek",
    title: "Lotek",
    desc: "Mirip gado-gado, tetapi dengan cita rasa lebih kental dan manis-gurih. Sayuran rebus dicampur bumbu kacang dengan sedikit gula merah dan kencur, menciptakan rasa khas Sunda yang hangat.",
    image: "lotek",
    detail: [
      "Lotek adalah hidangan khas Sunda yang terdiri dari sayuran rebus seperti kacang panjang, kol, bayam, dan tauge yang disiram dengan bumbu kacang halus beraroma kuat. Bumbu kacangnya dibuat dari kacang tanah, cabai, bawang putih, kencur, gula merah, dan garam, memberikan rasa manis, gurih, dan sedikit pedas yang menjadi ciri khas kuliner Sunda. Lotek memiliki tekstur lembut dari sayuran rebus, namun tetap segar karena bumbu kacang yang encer dan wangi.",
      "Keunikan lotek dibandingkan gado-gado atau karedok terletak pada penggunaan kencur dan bumbu yang diulek langsung, membuat aromanya lebih tajam dan khas. Hidangan ini sering disantap dengan lontong atau nasi, ditambah taburan kerupuk untuk menambah tekstur. Kesederhanaannya membuat lotek menjadi makanan rumahan yang populer, namun rasanya tetap kaya dan penuh karakter Sunda.",
    ],
    tutorial: [
      "Siapkan sayuran seperti kol, kacang panjang, bayam, dan tauge, lalu cuci hingga benar-benar bersih agar aman dikonsumsi.",
      "Rebus sayuran secara bertahap: mulai dari sayuran yang paling keras seperti kacang panjang dan kol, kemudian bayam dan tauge yang cukup direbus sebentar agar tetap segar dan tidak terlalu lembek.",
      "Setelah matang, angkat dan tiriskan sayuran, lalu biarkan hingga tidak terlalu panas agar bumbu lebih mudah meresap saat dicampur.",
      "Buat bumbu kacang dengan menyiapkan kacang tanah goreng, bawang putih, cabai, kencur, gula merah, dan garam. Ulek bahan-bahan tersebut hingga halus dan tercampur rata.",
      "Tambahkan sedikit air secara bertahap sambil mengulek agar bumbu menjadi lebih encer dan mudah melapisi sayuran; sesuaikan kekentalannya sesuai selera.",
      "Masukkan sayuran rebus ke wadah besar, lalu tuang bumbu kacang di atasnya.",
      "Aduk hingga seluruh sayuran terlapisi bumbu secara merata, pastikan tekstur bumbu dan sayuran menyatu.",
      "Sajikan lotek dengan lontong atau nasi, lalu tambahkan kerupuk sebagai pelengkap untuk memberi tekstur renyah.",
    ],
  },
  {
    slug: "serabi",
    title: "Serabi",
    desc: "Pancake tradisional dari tepung beras yang dipanggang tanpa minyak, menghasilkan tekstur lembut dan sedikit renyah di pinggir. Biasanya disajikan dengan kuah kinca gula merah atau topping modern.",
    image: "serabi",
    detail: [
      "Serabi adalah kudapan tradisional Sunda yang dibuat dari adonan tepung beras dan santan, lalu dimasak di atas wajan kecil dari tanah liat yang memberikan aroma khas serta tekstur lembut di bagian tengah dan sedikit renyah di pinggirnya. Hidangan ini biasanya disajikan dengan kuah kinca berbahan gula merah dan santan, sehingga menghasilkan perpaduan rasa manis, gurih, dan harum yang sangat khas masakan Sunda.",
      "Selain menjadi camilan rumahan, serabi juga sering dijual di pasar tradisional atau dijadikan suguhan pada acara keluarga sebagai simbol kehangatan dan kebersamaan. Beberapa daerah di Jawa Barat memiliki variasi serabi, baik dari topping maupun cara penyajiannya, namun tetap mempertahankan cita rasa klasik yang sudah dikenal turun-temurun sebagai bagian dari warisan kuliner Sunda.",
    ],
    tutorial: [
      "Siapkan bahan seperti tepung beras, santan, gula, garam, dan bila perlu ragi untuk membuat serabi lebih mengembang.",
      "Campur bahan kering dalam mangkuk, lalu tuang santan sedikit demi sedikit sambil diaduk hingga adonan halus dan licin.",
      "Diamkan adonan sekitar 30 menit agar menyatu dan menghasilkan tekstur serabi yang lembut.",
      "Panaskan wajan tanah liat dan oles tipis minyak agar serabi tidak lengket.",
      "Tuang satu sendok sayur adonan, goyangkan sedikit wajan agar pinggirnya membentuk kerak.",
      "Tutup wajan dan masak hingga bagian tengah serabi setengah basah dan pinggirnya renyah.",
      "Jika ingin topping, tambahkan gula merah cair atau kinca sebelum ditutup kembali.",
      "Angkat serabi yang sudah matang dan sajikan selagi hangat.",
    ],
  },
];
