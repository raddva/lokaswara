import { BottomNav } from '@/components/common/bottom-nav';
import Navbar from '@/components/common/navbar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <main className=''>
            <Navbar />
            {children}
        </main>
    );
}