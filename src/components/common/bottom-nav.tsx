import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"

interface NavItems {
    index: number,
    name: string,
}

const NavProps: NavItems[] = [
    {
        index: 0,
        name: "Makanan",
    },
    {
        index: 1,
        name: "Seni",
    },
    {
        index: 2,
        name: "Tradisi",
    },
    {
        index: 3,
        name: "Tarian",
    },
]

type Props = {
    section: number
    setSection: (value: number) => void;
}

export function BottomNav({ section, setSection }: Props) {
    const ref = useRef<HTMLDivElement>(null)
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 250, width: 0 })

    useEffect(() => {
        const activeButton = ref.current?.querySelector(
            `[data-id= "${section}"]`
        ) as HTMLElement

        if (activeButton) {
            setIndicatorStyle({
                left: activeButton.offsetLeft,
                width: activeButton.offsetWidth
            })
        }
    }, [section])

    return (
        <nav
            ref={ref}
            className="fixed px-32 flex z-30 justify-between w-full bottom-10"
        >
            <div
                className="absolute top-0 bottom-0 bg-linear-to-l from-[#8400FF] to-[#4300FC] rounded-full transition-all duration-500"
                style={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                }}
            />

            {NavProps.map((item, index) => {
                return (
                    <Button
                        key={index}
                        data-id={index}
                        variant={'ghost'}
                        className="text-4xl text-white font-bold py-8 px-10 rounded-full relative z-10 transition"
                        onClick={() => setSection(index)}
                    >
                        {item.name}
                    </Button>
                )
            })}
        </nav>
    )
}