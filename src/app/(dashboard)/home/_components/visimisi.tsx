'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Element } from "react-scroll"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageCircle } from "lucide-react"

interface AboutItem {
  title: string
  desc: string
}

const aboutProps: AboutItem[] = [
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

type FeedbackFormValues = z.infer<typeof feedbackSchema>

type FormResponse = {
  status: "success" | "error"
  errors?: Record<string, string[]>
}

export default function VisiMisi() {
  const [loading, setLoading] = useState(false)
  const [successType, setSuccessType] = useState<"feedback" | "content" | null>(null)

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { email: "", message: "" },
  })

  const submitForm = async (values: FeedbackFormValues, type: "feedback" | "content"): Promise<FormResponse> => {
    try {
      const formData = new FormData()
      formData.append("user_email", values.email)
      formData.append("body", values.message)
      formData.append("subject", type === "feedback" ? "Feedback" : "Saran Konten")
      if (type === "content") formData.append("content_type", "artikel") // content_type only for content request

      const endpoint = type === "feedback" ? "/api/feedbacks" : "/api/content-request"
      const res = await fetch(endpoint, { method: "POST", body: formData })

      if (!res.ok) {
        const data = await res.json()
        return { status: "error", errors: data.errors || { _form: ["Gagal mengirim data"] } }
      }

      return { status: "success" }
    } catch (err) {
      console.error(err)
      return { status: "error", errors: { _form: ["Terjadi kesalahan saat mengirim data"] } }
    }
  }

  const onSubmit = async (type: "feedback" | "content", values: FeedbackFormValues) => {
    setLoading(true)
    const result = await submitForm(values, type)
    if (result.status === "success") {
      form.reset()
      setSuccessType(type)
    } else {
      alert(Object.values(result.errors!).flat().join(", "))
    }
    setLoading(false)
  }

  return (
    <Element name="visiMisi">
      <section
        id="visiMisi"
        className="relative bg-cover bg-bottom min-h-screen px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 py-16 sm:py-20 flex flex-col justify-center gap-10"
        style={{ backgroundImage: `url('/assets/lastsection.jpeg')` }}
      >
        <div className="bg-black/50 inset-0 absolute z-10 w-full h-full"></div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}
          className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl"
        >
          <span className="bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Tentang Kami
          </span>
        </motion.h1>

        <div className="relative z-10 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full mt-2" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative z-10 max-w-2xl text-white/85 text-sm sm:text-base md:text-lg leading-relaxed"
        >
          Kami menghadirkan informasi budaya secara{" "}
          <span className="text-white font-medium">ringkas</span>,{" "}
          <span className="text-white font-medium">visual</span>, dan{" "}
          <span className="text-white font-medium">mudah dipahami</span>,
          agar warisan lokal tetap hidup dan relevan di era digital.
        </motion.p>

        <div className="flex justify-between flex-col lg:flex-row gap-5">
          <div className="relative z-10 flex flex-col gap-6 max-w-3xl">
            {aboutProps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md p-5 sm:p-6 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Image src="/assets/logo_white.svg" alt="logo" width={28} height={28} />
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{item.title}</h2>
                </div>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/85">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative z-20 flex flex-col gap-5 ">
            {["feedback", "content"].map((type) => {
              const Icon = type === "feedback" ? ThumbsUp : MessageCircle
              const label = type === "feedback" ? "Feedback" : "Saran Konten"
              const title = type === "feedback" ? "Berikan Feedback Untuk Kami!" : "Berikan Saran Konten Untuk Kami!"
              const description = "Hal ini dapat membantu kami dalam pengembangan website ini lebih lanjut."

              return (
                <div key={type}>
                  {/* Main form dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md p-5 sm:p-6 shadow-lg flex flex-col justify-center items-center cursor-pointer"
                      >
                        <Icon fill={type === "content" ? "white" : undefined} />
                        <p className="text-white">{label}</p>
                      </motion.div>
                    </DialogTrigger>

                    <DialogContent className="max-w-md mx-auto">
                      <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>

                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit((values) => onSubmit(type as "feedback" | "content", values))}
                            className="flex flex-col gap-5 mb-3"
                          >
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="email@example.com" {...field} />
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
                                    <Textarea placeholder={`Tulis ${label.toLowerCase()} kamu...`} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" disabled={loading} className="w-full">
                              {loading ? "Mengirim..." : `Kirim ${label}`}
                            </Button>
                          </form>
                        </Form>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  {/* Success modal */}
                  <Dialog open={successType === type} onOpenChange={() => setSuccessType(null)}>
                    <DialogContent className="max-w-md mx-auto">
                      <DialogHeader className="text-center">
                        <DialogTitle>Terima Kasih 🙏</DialogTitle>
                        <DialogDescription>
                          {type === "feedback"
                            ? "Feedback kamu sudah kami terima."
                            : "Saran konten kamu sudah kami terima."}
                        </DialogDescription>
                        <Button className="mt-6 w-full" onClick={() => setSuccessType(null)}>
                          Tutup
                        </Button>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </Element>
  )
}
