import { Input } from "../ui/input";
import { Instagram, SearchIcon } from "lucide-react";

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
        link: ""
    },
]

export default function Navbar() {
    return (
        <nav className="fixed px-32 py-5 w-full z-30 font-inter">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <img src="/assets/logo_white.svg" alt="logo" width={30} />
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