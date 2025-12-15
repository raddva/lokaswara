import Image from "next/image";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface CardProps {
  image: string;
  title: string;
  desc: string;
  route: string;
}

export default function CustomCard({ image, title, desc, route }: CardProps) {
  const router = useRouter()

  return (
    <Card
      className=" w-full max-w-sm mx-auto bg-black/60 border border-white/10 backdrop-blur-xl p-5 rounded-2xl shadow-xl transition hover:shadow-2xl hover:border-white/20">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          width={400}
          height={220}
          className="rounded-xl object-cover transition-transform duration-500 hover:scale-105 h-50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <CardTitle className="font-bold text-white text-2xl tracking-wide text-center">
          {title}
        </CardTitle>

        <CardDescription className="text-gray-300 text-sm leading-relaxed text-justify h-36">
          {desc}
        </CardDescription>
      </div>

      <Button
        variant={"default"}
        className="bg-linear-to-r from-blue-500 to-indigo-600  text-white shadow-lg rounded-xl w-full py-2  hover:from-blue-600  hover:to-indigo-700 transition-all"
        onClick={() => router.push(`${route}`)}
      >
        Selengkapnya
      </Button>
    </Card>
  );
}
