"use client";

import { useEffect, useState } from "react";
import { getContentByCategory, ContentT } from "../actions";
import { motion } from "framer-motion";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileImage } from "lucide-react";

export default function AlatMusik() {
  const [alatMusikItems, setAlatMusikItems] = useState<ContentT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContentByCategory("Musik");
      setAlatMusikItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const ContentImage = ({ src, title }: { src?: string; title: string }) => {
    const [imgError, setImgError] = useState(false);

    if (!src || imgError) {
      return (
        <Avatar className="w-full h-56 md:h-64 rounded-lg">
          <AvatarFallback className="bg-gray-200 flex items-center justify-center">
            <FileImage className="w-12 h-12 text-gray-400" />
          </AvatarFallback>
        </Avatar>
      );
    }

    return (
      <Image
        src={src}
        alt={title}
        width={300}
        height={400}
        className="w-full h-56 md:h-64 rounded-lg object-cover"
        onError={() => setImgError(true)}
      />
    );
  };

  const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-200/30 backdrop-blur-md rounded-lg h-56 md:h-64 w-full mb-8"></div>
  );

  return (
    <section className="relative px-4 sm:px-8 md:px-16 lg:px-32 py-20">

      <div className="relative z-20 flex flex-col gap-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          <span className="relative inline-block">
            <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Jelajahi Seni dan Alat Musik Suku Sunda
            </span>

            <div className="relative z-10 h-1 w-20 bg-linear-to-r from-purple-500 to-blue-500 rounded-full mt-2" />
          </span>
        </h1>

        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : alatMusikItems.map((item) => (
            <motion.div
              key={item.id}
              className="flex flex-col md:flex-row gap-6 bg-white/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full md:w-1/3 shrink-0">
                <ContentImage src={item.featured_image_url} title={item.title} />
              </div>

              <div className="w-full md:w-2/3 flex flex-col justify-between text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h2>
                <p className="text-sm md:text-base text-justify">{item.body}</p>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
}
