// import AppSidebar from '@/components/common/app-sidebar';

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <main className="flex flex-1 flex-col items-start gap-4 p-4 pt-0">
                {children}
            </main>
        </div>
    );
}