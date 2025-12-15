import Hero from './_components/hero';
import Penjelasan from './_components/penjelasan';
import Category from './_components/category';
import VisiMisi from './_components/visimisi';
import Footer from '@/components/common/app-footer';

export const metadata = {
    title: 'LokaSwara | Lestarikan Budaya Melalui Sistem Digital',
};

export default function HomePage() {
    return (
        <main>
            <Hero />
            <Penjelasan />
            <Category />
            <VisiMisi />
            <Footer />
        </main>
    );
}
