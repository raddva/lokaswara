import Navbar from "@/components/common/app-navbar";
import Dictionary from "./_components/dictionary";

export const metadata = {
    title: 'LokaSwara | Kamus Bahasa Sunda',
};

export default function DictionaryPage() {
    return (
        <main>
            <Navbar />
            <Dictionary />
        </main>
    )
}