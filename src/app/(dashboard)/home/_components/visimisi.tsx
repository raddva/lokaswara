'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { MessageCircle, ThumbsUp } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import z from "zod"

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

const feedbackSchema = z.object({
  email: z.string().email(),
  message: z.string().min(5),
})

export default function VisiMisi() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  })

  const onSubmit = async (
    values: z.infer<typeof feedbackSchema>
  ) => {
    // setLoading(true)
    // try {
    //   await createFeedback(values)
    //   form.reset()
    //   setSuccess(true)
    // } catch {
    //   alert("Gagal mengirim feedback")
    // } finally {
    //   setLoading(false)
    // }
  }
  if (success) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Terima kasih 🙏</h1>
        <p>Feedback kamu sudah kami terima.</p>
      </div>
    )
  }

  return (
    <section
      className="relative bg-cover bg-bottom min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 flex flex-col justify-center gap-10"
      style={{ backgroundImage: `url('/assets/lastsection.jpeg')` }}
    >
      <div className="bg-linear-to-b from-black to-black/50 inset-0 absolute z-10 w-full h-full"></div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false }}
        className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl">
        <span className="bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Tentang Kami
        </span>
      </motion.h1>

      <div className="relative z-10 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full mt-2" />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        viewport={{ once: false }}
        className="relative z-10 max-w-2xl text-white/85 text-sm sm:text-base md:text-lg leading-relaxed">
        Kami menghadirkan informasi budaya secara{" "}
        <span className="text-white font-medium">ringkas</span>,{" "}
        <span className="text-white font-medium">visual</span>, dan{" "}
        <span className="text-white font-medium">mudah dipahami</span>,
        agar warisan lokal tetap hidup dan relevan di era digital.
      </motion.p>

      <div className="flex flex-col lg:flex-row gap-5 justify-between">
        <div className="relative z-10 flex flex-col gap-6 max-w-3xl">
          {aboutProps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: false }}
              className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md p-5 sm:p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/logo_white.svg"
                  alt="logo"
                  width={28}
                  height={28}
                />
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  {item.title}
                </h2>
              </div>

              <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/85 text-left">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="relative z-20 flex flex-col gap-5">
          <Dialog>
            <DialogTrigger>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                viewport={{ once: false }}
                className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md p-5 sm:p-6 shadow-lg flex flex-col justify-center items-center">
                <ThumbsUp />
                <p>Feedback</p>
              </motion.div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Berikan Feedback Untuk Kami!</DialogTitle>
                <DialogDescription>
                  Hal ini dapat membantu kami dalam pengembangan website ini lebih lanjut.
                </DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 mb-3"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xl">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pesan</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tulis feedback kamu..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={loading}
                      className="relative h-12 w-full rounded-xl p-px bg-linear-to-br from-purple-600 to-blue-500 shadow-lg overflow-hidden group">
                      <span className="flex h-full w-full items-center justify-center rounded-xl bg-linear-to-br from-purple-600 to-blue-500 text-white font-medium transition-all duration-300 ease-out group-hover:bg-black/60 group-hover:bg-none">
                        {loading ? "Mengirim..." : "Kirim Feedback"}
                      </span>
                    </Button>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                viewport={{ once: false }}
                className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md p-5 sm:p-6 shadow-lg flex flex-col justify-center items-center">
                <MessageCircle fill="white" />
                <p className="text-white">Saran Konten</p>
              </motion.div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Berikan Saran Konten Untuk Kami!</DialogTitle>
                <DialogDescription>
                  Hal ini dapat membantu kami dalam pengembangan website ini lebih lanjut.
                </DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 mb-3"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xl">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pesan</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tulis saran kamu..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={loading}
                      className="relative h-12 w-full rounded-xl p-px bg-linear-to-br from-purple-600 to-blue-500 shadow-lg overflow-hidden group">
                      <span className="flex h-full w-full items-center justify-center rounded-xl bg-linear-to-br from-purple-600 to-blue-500 text-white font-medium transition-all duration-300 ease-out group-hover:bg-black/60 group-hover:bg-none">
                        {loading ? "Mengirim..." : "Kirim Saran"}
                      </span>
                    </Button>
                  </form>
                </Form>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
} 