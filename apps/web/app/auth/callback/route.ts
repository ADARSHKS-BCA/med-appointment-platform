import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.redirect(`${origin}/login?error=no_code`);
    }

    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options);
                    });
                },
            },
        }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.user) {
        console.error('OAuth callback error:', error);
        return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }

    // Bridge to existing JWT system
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

    try {
        const response = await fetch(`${API_URL}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.user.email,
                fullName: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'User',
                avatarUrl: data.user.user_metadata?.avatar_url,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Backend auth error:', errorData);
            return NextResponse.redirect(`${origin}/login?error=backend_auth_failed`);
        }

        const authData = await response.json();
        const role = authData.user?.role;

        // Redirect to the client-side handler page which will set cookies and redirect
        // This is more reliable than server-side cookie setting with redirects on Vercel
        const destination = role === 'DOCTOR' ? '/doctor/dashboard' : '/patient/dashboard';
        const callbackUrl = new URL(`${origin}/auth/complete`);
        callbackUrl.searchParams.set('token', authData.token);
        callbackUrl.searchParams.set('user', JSON.stringify(authData.user));
        callbackUrl.searchParams.set('redirect', destination);
        if (authData.refreshToken) {
            callbackUrl.searchParams.set('refreshToken', authData.refreshToken);
        }

        return NextResponse.redirect(callbackUrl.toString());
    } catch (err) {
        console.error('Backend call failed:', err);
        return NextResponse.redirect(`${origin}/login?error=server_error`);
    }
}
