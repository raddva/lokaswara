"use client";

import { useEffect, useState } from "react";
import { getTari, ContentT } from "../actions";
import { motion } from "framer-motion";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileImage, Play } from "lucide-react";

export default function SeniTari() {
  const [tariItems, setTariItems] = useState<ContentT[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTari();
      setTariItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const ContentImage = ({ src, title }: { src?: string; title: string }) => {
    const [imgError, setImgError] = useState(false);

    if (!src || imgError) {
      return (
        <Avatar className="w-full h-full rounded-lg">
          <AvatarFallback className="bg-gray-200 flex items-center justify-center">
            <FileImage className="w-10 h-10 text-gray-400" />
          </AvatarFallback>
        </Avatar>
      );
    }

    return (
      <Image
        src={src}
        alt={title}
        width={400}
        height={250}
        className="w-full h-full rounded-lg object-cover"
        onError={() => setImgError(true)}
      />
    );
  };

  const SkeletonCard = () => (
    <div className="animate-pulse bg-gray-200/30 backdrop-blur-md rounded-lg h-48 md:h-56 w-full mb-8"></div>
  );

  return (
    <section className="relative px-4 sm:px-8 md:px-16 lg:px-32 py-10 bg-linear-to-b from-bg- to-bg-black/60 backdrop-blur-md">
      {loading
        ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        : tariItems.map((item) => (
          <motion.div
            key={item.id}
            className="mb-10 p-4 md:p-6 rounded-xl bg-white/20 backdrop-blur-lg border border-white/10 shadow-lg flex flex-col md:flex-row items-center gap-4 md:gap-6 hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full md:w-1/3 h-40 md:h-56 shrink-0">
              <ContentImage src={item.featured_image_url} title={item.title} />
            </div>

            <div className="w-full md:w-2/3 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h2>
                <p className="text-sm md:text-base mb-4">{item.body}</p>
              </div>
              {item.videos?.length && item.videos[0].youtube_url && (
                <button
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/30 backdrop-blur-md border border-blue-300/40 hover:bg-blue-500/50 hover:scale-105 transition-transform text-white font-medium"
                  onClick={() => setSelectedVideo(item.videos![0].youtube_url!)}
                >
                  <Play className="w-4 h-4" />
                  Watch Video
                </button>
              )}
            </div>
          </motion.div>
        ))}

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedVideo(null)}
          />
          <div className="relative z-10 bg-white p-4 rounded-lg w-full max-w-3xl mx-4">
            <button
              className="absolute top-0 -right-7 text-xl font-bold"
              onClick={() => setSelectedVideo(null)}
            >
              ×
            </button>
            <iframe
              className="w-full aspect-video rounded"
              src={selectedVideo}
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
