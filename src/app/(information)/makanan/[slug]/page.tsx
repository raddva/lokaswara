'use client'
import Navbar from "@/components/common/app-navbar";
import { foodItems } from "../_components/makanan";

function formatTitle(slug: string) {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function FoodDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const nama = (await params).name;

  return (
    <main>
      <Navbar />
      <section className="px-32 py-20">
        <h1>{formatTitle(nama)}</h1>

      </section>
    </main>
  )
}