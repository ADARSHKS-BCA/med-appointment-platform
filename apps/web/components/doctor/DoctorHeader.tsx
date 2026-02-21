'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { getCookie } from 'cookies-next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface DoctorProfile {
    fullName: string;
    profilePictureUrl?: string;
    specialization: string;
}

export default function DoctorHeader() {
    const [profile, setProfile] = useState<DoctorProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkRole = () => {
            const userCookie = getCookie('user');
            if (userCookie) {
                const user = JSON.parse(userCookie as string);
                if (user.role !== 'DOCTOR') {
                    // Optional: Redirect or show warning
                    // window.location.href = '/patient/dashboard';
                    console.warn('DoctorHeader: User is not a DOCTOR', user);
                }
            }
        };
        checkRole();
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            // Try to fetch specific doctor profile
            const data = await api.get('/doctors/me');
            setProfile(data);
        } catch (error) {
            // If full profile fetch fails, try to fall back to basic user info from cookie
            // or just log error. The user might not have completed profile setup.
            console.error('Failed to fetch doctor profile:', error);
            try {
                const userCookie = getCookie('user');
                if (userCookie) {
                    const user = JSON.parse(userCookie as string);
                    // Minimal fallback
                    setProfile({
                        fullName: user.email?.split('@')[0] || 'Doctor',
                        specialization: 'General',
                    });
                }
            } catch (e) {
                // Ignore cookie parse error
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-slate-200 rounded-full animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
                <p className="text-sm font-medium leading-none">{profile?.fullName || 'Doctor'}</p>
                <p className="text-xs text-slate-500">{profile?.specialization || 'Specialist'}</p>
            </div>
            <Avatar>
                <AvatarImage src={profile?.profilePictureUrl} alt={profile?.fullName} />
                <AvatarFallback className="bg-blue-100 text-blue-700">
                    {profile?.fullName?.charAt(0) || 'D'}
                </AvatarFallback>
            </Avatar>
        </div>
    );
}
