'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterInput } from '@mediconnect/shared-types';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultRole = searchParams.get('role') === 'DOCTOR' ? 'DOCTOR' : 'PATIENT';

    const [role, setRole] = useState<'PATIENT' | 'DOCTOR'>(defaultRole);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            role: defaultRole,
        },
    });

    const onRoleChange = (value: string) => {
        const newRole = value as 'PATIENT' | 'DOCTOR';
        setRole(newRole);
        setValue('role', newRole);
    };

    const onSubmit = async (data: RegisterInput) => {
        setIsLoading(true);
        try {
            await api.post('/auth/register', data);
            toast.success('Account created! Please log in.');
            router.push('/login');
        } catch (error: any) {
            toast.error(error.message || 'Registration failed');
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
                <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
                <p className="text-slate-500">Start your journey with us today</p>
            </div>

            <Tabs value={role} onValueChange={onRoleChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="PATIENT">I'm a Patient</TabsTrigger>
                    <TabsTrigger value="DOCTOR">I'm a Doctor</TabsTrigger>
                </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        placeholder={role === 'DOCTOR' ? 'Dr. Gregory House' : 'John Doe'}
                        {...register('fullName')}
                    />
                    {errors.fullName && (
                        <p className="text-sm text-red-500">{errors.fullName.message}</p>
                    )}
                </div>

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
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        {...register('password')}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                    <p className="text-xs text-slate-500">Must be at least 8 characters long</p>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
            </form>

            <div className="text-center text-sm">
                <span className="text-slate-500">Already have an account? </span>
                <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                    Log in
                </Link>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterForm />
        </Suspense>
    );
}
