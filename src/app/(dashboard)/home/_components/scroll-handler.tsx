'use client';

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ScrollHandler() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const scrollTo = searchParams.get("scrollTo");
        if (scrollTo) {
            const el = document.getElementById(scrollTo);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        }
    }, [searchParams]);

    return null;
}
