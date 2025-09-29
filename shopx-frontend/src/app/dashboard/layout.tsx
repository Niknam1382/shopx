'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const hasSession = document.cookie.includes('session=');
    if (!hasSession) router.replace('/account/login');
  }, [router]);
  return <div className="container mx-auto p-4">{children}</div>;
}