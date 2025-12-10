"use client";

import Navbar from '@/components/common/app-navbar';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/common/app-sidebar';
import { Separator } from '@radix-ui/react-separator';
import DashboardBreadcrumb from './admin/_components/dashboard-breadcrumb';
import { DarkmodeToggle } from '@/components/common/mode-toggle';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isDashboardPage = pathname.startsWith('/admin');

    return (
        <main className=''>
            {!isDashboardPage ?
                <div>
                    <Navbar />
                    {children}
                    {/* <Footer /> */}
                </div>
                :
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset className="overflow-x-hidden">
                        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="cursor-pointer" />
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 data-[orientation=vertical]:h-4"
                                />
                                <DashboardBreadcrumb />
                            </div>
                            <div className="px-4">
                                <DarkmodeToggle />
                            </div>
                        </header>
                        <main className="flex flex-1 flex-col items-start gap-4 p-4 pt-0">
                            {children}
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            }
        </main>
    );
}