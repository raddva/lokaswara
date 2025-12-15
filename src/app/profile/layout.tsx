import Footer from '@/components/common/app-footer';
import { ReactNode } from 'react';

type AuthLayoutProps = {
    children: ReactNode;
};

export default function ProfileLayout({ children }: AuthLayoutProps) {
    return (
        <div className="">
            <div className="">
            </div>
            <div className="">{children}</div>
            <Footer />
        </div>
    );
}