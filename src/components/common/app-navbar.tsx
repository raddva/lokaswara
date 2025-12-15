"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

interface NavItems {
    name: string
    link: string
}

const NavProps: NavItems[] = [
    { name: "Beranda", link: "/home" },
    { name: "Informasi", link: "/" },
    { name: "Tentang Kami", link: "/" },
    { name: "Profil", link: "/profile" },
]

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 z-30 w-full transition-all duration-300 ${isScrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"}`}>
            <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24 py-4">
                <div className="flex items-center gap-2">
                    <Image src="/assets/logo_white.svg" alt="logo" width={30} height={30} />
                    <h1 className="text-white font-bold text-lg sm:text-xl">
                        LokaSwara
                    </h1>
                </div>

                <div className="hidden md:flex items-center gap-12">
                    {NavProps.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            className="text-white font-medium hover:text-blue-400 transition"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white"
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} bg-transparent backdrop-blur-lg`}>
                <div className="flex flex-col px-6 py-6 gap-4">
                    {NavProps.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            className="text-white text-lg font-medium hover:text-blue-400 transition"
                            onClick={() => setOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}
