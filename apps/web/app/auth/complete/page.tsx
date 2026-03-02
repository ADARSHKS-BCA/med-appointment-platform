'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { Loader2 } from 'lucide-react';

function CompleteAuth() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');
        const redirect = searchParams.get('redirect') || '/patient/dashboard';
        const refreshToken = searchParams.get('refreshToken');

        if (!token || !userStr) {
            router.replace('/login?error=missing_auth_data');
            return;
        }

        try {
            // Set cookies client-side — this is much more reliable than server-side cookie setting
            setCookie('token', token, { path: '/', maxAge: 60 * 60 }); // 1 hour
            setCookie('user', userStr, { path: '/', maxAge: 60 * 60 });

            if (refreshToken) {
                setCookie('refreshToken', refreshToken, { path: '/', maxAge: 7 * 24 * 60 * 60 });
            }

            // Small delay to ensure cookies are written before redirect
            setTimeout(() => {
                router.replace(redirect);
            }, 100);
        } catch (err) {
            console.error('Failed to complete auth:', err);
            router.replace('/login?error=cookie_error');
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            <h2 className="text-lg font-semibold text-slate-800">Signing you in...</h2>
            <p className="text-sm text-slate-500">You'll be redirected in a moment.</p>
        </div>
    );
}

export default function AuthCompletePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        }>
            <CompleteAuth />
        </Suspense>
    );
}
