'use client'
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import Image from "next/image";

interface NavItems {
    name: string,
    link: string
}

const NavProps: NavItems[] = [
    {
        name: "Beranda",
        link: "/home"
    },
    {
        name: "Informasi",
        link: ""
    },
    {
        name: "Tentang Kami",
        link: ""
    },
    {
        name: "Profil",
        link: "/profil"
    },
]

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false) 

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30   )
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })

    return (
        <nav className={`${isScrolled ? "bg-black/70" : "bg-transparent"} transition-all duration-300 fixed px-32 py-5 w-full z-30 font-inter`}>
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Image src="/assets/logo_white.svg" alt="logo" width={30} height={30} />
                    <h1 className="text-white font-bold text-xl">LokaSwara</h1>
                </div>
                <div className="flex gap-20">
                    {NavProps.map((item, index) => {
                        return (
                            <a
                                key={index}
                                className="text-white font-bold text-xl"
                                href={item.link}
                            >
                                {item.name}
                            </a>
                        )
                    })}
                    <SearchIcon />
                </div>
            </div>
        </nav>
    )
}