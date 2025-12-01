'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/common/navbar';

export default function Home() {
  const profile = useAuthStore((state) => state.profile);
  const router = useRouter();

  useEffect(() => {
    if (!profile) return;

    if (profile.role === 'admin') {
      router.replace('/admin');
    } else {
      router.replace('/home');
    }
  }, [profile, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted">
      <Navbar />
      <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
    </div>
  );
}