'use client'

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
    name: string;
    link: string;
    scrollTo?: string;
}

const NAV_ITEMS: NavItem[] = [
    { name: "Beranda", link: "/home" },
    { name: "Informasi", link: "/home", scrollTo: "fact" },
    { name: "Tentang Kami", link: "/home", scrollTo: "visiMisi" },
    { name: "Profil", link: "/profile" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (item: NavItem) => {
        setOpen(false);
        if (item.scrollTo) {
            if (pathname === "/home") {
                const el = document.getElementById(item.scrollTo);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            } else {
                router.push(`${item.link}?scrollTo=${item.scrollTo}`);
            }
        } else {
            router.push(item.link);
        }
    };

    return (
        <nav className={`fixed top-0 z-30 w-full transition-all duration-300 ${isScrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"}`}>
            <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24 py-4">
                <div className="flex items-center gap-2">
                    <Image src="/assets/logo_white.svg" alt="logo" width={30} height={30} />
                    <h1 className="text-white font-bold text-lg sm:text-xl">LokaSwara</h1>
                </div>

                <div className="hidden md:flex items-center gap-12">
                    {NAV_ITEMS.map((item, idx) => (
                        <button
                            key={idx}
                            className="text-white font-medium hover:text-blue-400 transition cursor-pointer"
                            onClick={() => handleClick(item)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                <button onClick={() => setOpen(!open)} className="md:hidden text-white">
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} bg-black/80 backdrop-blur-lg`}
            >
                <div className="flex flex-col px-6 py-6 gap-4">
                    {NAV_ITEMS.map((item, idx) => (
                        <button
                            key={idx}
                            className="text-white text-lg font-medium hover:text-blue-400 transition text-left"
                            onClick={() => handleClick(item)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
