import { Input } from "../ui/input";
import { Instagram, Search } from "lucide-react";

interface NavItems {
    name: string,
    link: string
}

const NavProps: NavItems[] = [
    {
        name: "Beranda",
        link: ""
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
        <nav className="fixed px-32 py-2 w-full z-30">
            <div>
                <div className="flex justify-end items-center gap-3">
                    <div className="bg-white rounded-full p-1">
                        <Instagram />
                    </div>
                    <Input name="search" className="bg-white h-8 w-1/4 rounded-full text-sm" placeholder="Search" />
                    <label ><Search className="text-white" /></label>
                </div>
                <div className="flex items-center gap-5">
                    <h1 className="text-white font-bold text-xl">LokaSwara</h1>
                    <div className="h-full w-full border border-white"></div>
                </div>
                <div className="flex gap-20 justify-end">
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
                </div>
            </div>
        </nav>
    )
}