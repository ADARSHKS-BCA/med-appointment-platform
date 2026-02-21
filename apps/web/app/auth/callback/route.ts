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

    // Bridge to existing JWT system:
    // Call our backend API to find/create user and get JWT token
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
            const errorData = await response.json();
            console.error('Backend auth error:', errorData);
            return NextResponse.redirect(`${origin}/login?error=backend_auth_failed`);
        }

        const authData = await response.json();

        // Set the same cookies the existing login flow uses
        const redirectResponse = NextResponse.redirect(
            `${origin}/${authData.user.role === 'DOCTOR' ? 'doctor/dashboard' : 'patient/dashboard'}`
        );

        redirectResponse.cookies.set('token', authData.token, {
            path: '/',
            maxAge: 15 * 60, // 15 minutes (matches JWT expiry)
            sameSite: 'lax',
        });

        redirectResponse.cookies.set('user', JSON.stringify(authData.user), {
            path: '/',
            maxAge: 15 * 60,
            sameSite: 'lax',
        });

        if (authData.refreshToken) {
            redirectResponse.cookies.set('refreshToken', authData.refreshToken, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60, // 7 days
            });
        }

        return redirectResponse;
    } catch (err) {
        console.error('Backend call failed:', err);
        return NextResponse.redirect(`${origin}/login?error=server_error`);
    }
}
