'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Stethoscope, ArrowLeft } from 'lucide-react';

interface Doctor {
    id: string;
    userId: string;
    user: {
        email: string;
    };
    fullName: string;
    specialization: string;
    experienceYears: number;
    consultationFee: number;
    bio: string;
    verificationStatus: string;
}

export default function DoctorsPage() {
    const router = useRouter();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    // Booking State
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const data = await api.get('/doctors');
            // Only show verified/approved doctors to the public
            const approvedDoctors = data.filter(
                (doc: Doctor) => doc.verificationStatus === 'APPROVED'
            );
            setDoctors(approvedDoctors);
        } catch (error) {
            toast.error('Failed to load doctors');
        } finally {
            setLoading(false);
        }
    };

    const isLoggedIn = () => {
        const token = getCookie('token');
        return !!token;
    };

    const getUserRole = () => {
        try {
            const userCookie = getCookie('user');
            if (userCookie) {
                const user = JSON.parse(userCookie as string);
                return user.role;
            }
        } catch {
            return null;
        }
        return null;
    };

    const handleBookClick = (doctor: Doctor) => {
        if (!isLoggedIn()) {
            // Redirect to login with return URL
            router.push(`/login?redirectTo=/doctors`);
            return;
        }

        const role = getUserRole();
        if (role !== 'PATIENT') {
            toast.error('Only patients can book appointments. Please log in with a patient account.');
            return;
        }

        setSelectedDoctor(doctor);
    };

    const handleBookAppointment = async () => {
        if (!selectedDoctor || !date || !time) {
            toast.error('Please fill in all fields');
            return;
        }

        setBooking(true);
        try {
            const startTime = new Date(`${date}T${time}:00`);
            const endTime = new Date(startTime.getTime() + 30 * 60000);

            await api.post('/appointments', {
                doctorId: selectedDoctor.id,
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                reason: reason || 'General Consultation',
            });

            toast.success('Appointment requested successfully!');
            setSelectedDoctor(null);
            setDate('');
            setTime('');
            setReason('');
        } catch (error: any) {
            toast.error(error.message || 'Booking failed');
        } finally {
            setBooking(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-500 text-lg">Loading doctors...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Simple header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                            <Stethoscope className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            MediConnect
                        </span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>
                        </Button>
                        {!isLoggedIn() && (
                            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Link href="/login">Log In</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            {/* Doctor listing */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Find a Doctor</h1>
                    <p className="text-slate-500 mt-2">Browse our verified specialists and book an appointment.</p>
                </div>

                {doctors.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">No verified doctors available at the moment.</p>
                        <p className="text-slate-400 mt-2">Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {doctors.map((doc) => (
                            <Card key={doc.id}>
                                <CardHeader>
                                    <CardTitle>Dr. {doc.fullName || doc.user.email.split('@')[0]}</CardTitle>
                                    <CardDescription>{doc.specialization}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-500 line-clamp-3">{doc.bio}</p>
                                    <div className="mt-4 flex justify-between text-sm">
                                        <span>Exp: {doc.experienceYears} years</span>
                                        <span>${Number(doc.consultationFee).toFixed(2)}</span>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                className="w-full"
                                                onClick={() => handleBookClick(doc)}
                                            >
                                                Book Appointment
                                            </Button>
                                        </DialogTrigger>
                                        {selectedDoctor?.id === doc.id && isLoggedIn() && (
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Book with Dr. {doc.fullName}</DialogTitle>
                                                    <DialogDescription>
                                                        Select a date and time for your consultation.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="date" className="text-right">Date</Label>
                                                        <Input
                                                            id="date"
                                                            type="date"
                                                            className="col-span-3"
                                                            value={date}
                                                            onChange={(e) => setDate(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="time" className="text-right">Time</Label>
                                                        <Input
                                                            id="time"
                                                            type="time"
                                                            className="col-span-3"
                                                            value={time}
                                                            onChange={(e) => setTime(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor="reason" className="text-right">Reason</Label>
                                                        <Input
                                                            id="reason"
                                                            placeholder="Fever, Checkup..."
                                                            className="col-span-3"
                                                            value={reason}
                                                            onChange={(e) => setReason(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button
                                                        type="submit"
                                                        onClick={handleBookAppointment}
                                                        disabled={booking}
                                                    >
                                                        {booking ? 'Booking...' : 'Confirm Booking'}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        )}
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
