'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            // Redirect to login if not authenticated and not on a public page
            const publicPages = ['/', '/login', '/register'];
            if (!publicPages.includes(pathname || '')) {
                router.push('/login');
            }
        }
    }, [user, loading, router, pathname]);

    const isPublicPage = ['/', '/login', '/register'].includes(pathname || '');
    if (loading && !isPublicPage) {
        return (
            <div className="h-screen flex items-center justify-center bg-zinc-950">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-zinc-400" />
                    <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Authenticating...</span>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
