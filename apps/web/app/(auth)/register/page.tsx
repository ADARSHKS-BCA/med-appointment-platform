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
import { Loader2, Stethoscope } from 'lucide-react';

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
        defaultValues: { role: defaultRole },
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
                <Link href="/" className="inline-flex items-center gap-2 mb-2">
                    <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white p-1.5 rounded-xl shadow-md shadow-indigo-500/20">
                        <Stethoscope className="h-4 w-4" />
                    </div>
                    <span className="text-xl font-bold text-gradient">MediConnect</span>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create an account</h1>
                <p className="text-slate-500">Start your journey with us today</p>
            </div>

            <Tabs value={role} onValueChange={onRoleChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-xl h-11 bg-slate-100">
                    <TabsTrigger value="PATIENT" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium">
                        I'm a Patient
                    </TabsTrigger>
                    <TabsTrigger value="DOCTOR" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium">
                        I'm a Doctor
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        placeholder={role === 'DOCTOR' ? 'Dr. Gregory House' : 'John Doe'}
                        className="rounded-xl h-11 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
                        {...register('fullName')}
                    />
                    {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        className="rounded-xl h-11 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
                        {...register('email')}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        className="rounded-xl h-11 border-slate-200 focus:border-indigo-300 focus:ring-indigo-200"
                        {...register('password')}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    <p className="text-xs text-slate-500">Must be at least 8 characters long</p>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/20 rounded-xl h-11 font-semibold"
                    disabled={isLoading}
                >
                    {isLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Creating account...</> : 'Create account'}
                </Button>
            </form>

            <div className="text-center text-sm">
                <span className="text-slate-500">Already have an account? </span>
                <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
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
