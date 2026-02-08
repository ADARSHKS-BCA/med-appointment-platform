'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, LoginInput } from '@mediconnect/shared-types';
import { api } from '@/lib/api';
import { setCookie } from 'cookies-next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', data);

            // Store token and user info
            setCookie('token', response.token);
            setCookie('user', JSON.stringify(response.user));

            toast.success('Logged in successfully');

            // Redirect based on role
            if (response.user.role === 'DOCTOR') {
                router.push('/doctor/dashboard');
            } else if (response.user.role === 'PATIENT') {
                router.push('/patient/dashboard');
            } else {
                router.push('/admin');
            }
        } catch (error: any) {
            toast.error(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center lg:text-left">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    MediConnect
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                <p className="text-slate-500">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>

            <div className="text-center text-sm">
                <span className="text-slate-500">Don't have an account? </span>
                <Link href="/register" className="font-semibold text-blue-600 hover:underline">
                    Create an account
                </Link>
            </div>
        </div>
    );
}
