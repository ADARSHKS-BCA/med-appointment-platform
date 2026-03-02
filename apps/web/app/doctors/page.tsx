'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Stethoscope, ArrowLeft, Clock, DollarSign, Search, Loader2, ArrowRight, Star, RefreshCw } from 'lucide-react';

interface Doctor {
    id: string;
    userId: string;
    user: { email: string; };
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
    const [error, setError] = useState<string | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [booking, setBooking] = useState(false);

    useEffect(() => { fetchDoctors(); }, []);

    const fetchDoctors = async () => {
        setError(null);
        try {
            const data = await api.get('/doctors');
            const approvedDoctors = data.filter(
                (doc: Doctor) => doc.verificationStatus === 'APPROVED'
            );
            setDoctors(approvedDoctors);
        } catch (err: any) {
            setError('Failed to load doctors');
            toast.error('Failed to load doctors');
        } finally {
            setLoading(false);
        }
    };

    const isLoggedIn = () => !!getCookie('token');
    const getUserRole = () => {
        try {
            const userCookie = getCookie('user');
            if (userCookie) return JSON.parse(userCookie as string).role;
        } catch { }
        return null;
    };

    const handleBookClick = (doctor: Doctor) => {
        if (!isLoggedIn()) {
            router.push(`/login?redirectTo=/doctors`);
            return;
        }
        if (getUserRole() !== 'PATIENT') {
            toast.error('Only patients can book appointments.');
            return;
        }
        setSelectedDoctor(doctor);
        setDialogOpen(true);
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
            toast.success('Appointment request sent! The doctor will review and confirm.', { duration: 5000 });
            setSelectedDoctor(null);
            setDialogOpen(false);
            setDate(''); setTime(''); setReason('');
        } catch (error: any) {
            toast.error(error.message || 'Booking failed');
        } finally {
            setBooking(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white p-1.5 rounded-xl shadow-md shadow-indigo-500/20">
                            <Stethoscope className="h-4 w-4" />
                        </div>
                        <span className="text-lg font-bold text-gradient">MediConnect</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Button asChild variant="ghost" size="sm" className="rounded-xl text-slate-500 hover:text-indigo-600">
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Link>
                        </Button>
                        {!isLoggedIn() && (
                            <Button asChild size="sm" className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl shadow-md shadow-indigo-500/20">
                                <Link href="/login">Log In</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-10">
                    <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-2">Browse Specialists</p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Find a Doctor</h1>
                    <p className="text-slate-500 mt-2">Browse our verified specialists and book an appointment.</p>
                </div>

                {loading ? (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-200" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-3/4 bg-slate-200 rounded-full" />
                                        <div className="h-3 w-1/2 bg-slate-100 rounded-full" />
                                    </div>
                                </div>
                                <div className="h-14 bg-slate-100 rounded-xl mb-4" />
                                <div className="h-11 bg-slate-200 rounded-xl" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-5 shadow-premium">
                            <Stethoscope className="w-9 h-9 text-red-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Unable to Load Doctors</h3>
                        <p className="text-sm text-slate-500 mb-5">{error}</p>
                        <Button onClick={fetchDoctors} variant="outline" size="sm" className="rounded-xl">
                            <RefreshCw className="w-4 h-4 mr-2" /> Retry
                        </Button>
                    </div>
                ) : doctors.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-5">
                            <Search className="w-9 h-9 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700">No Verified Doctors</h3>
                        <p className="text-sm text-slate-400 mt-1">Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {doctors.map((doc) => (
                            <div key={doc.id} className="group glass rounded-2xl overflow-hidden hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
                                <div className="h-1 bg-gradient-to-r from-indigo-500 to-cyan-500" />
                                <div className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 shrink-0">
                                            {doc.fullName?.charAt(0) || 'D'}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-slate-900 truncate">Dr. {doc.fullName || doc.user.email.split('@')[0]}</h3>
                                            <p className="text-sm text-indigo-600 font-medium">{doc.specialization}</p>
                                            <div className="flex gap-0.5 mt-1">
                                                {[1, 2, 3, 4, 5].map(i => (
                                                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">{doc.bio || 'No bio available'}</p>

                                    <div className="flex justify-between text-sm mb-5 px-1">
                                        <span className="flex items-center gap-1.5 text-slate-500">
                                            <Clock className="w-3.5 h-3.5 text-slate-400" /> {doc.experienceYears} yrs
                                        </span>
                                        <span className="flex items-center gap-1 font-bold text-emerald-600">
                                            <DollarSign className="w-3.5 h-3.5" /> {Number(doc.consultationFee).toFixed(0)}
                                        </span>
                                    </div>

                                    <Button
                                        className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/20 rounded-xl h-11 font-semibold transition-all"
                                        onClick={() => handleBookClick(doc)}
                                    >
                                        Book Appointment
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Booking Dialog */}
            <Dialog open={dialogOpen} onOpenChange={(open) => {
                setDialogOpen(open);
                if (!open) { setSelectedDoctor(null); setDate(''); setTime(''); setReason(''); }
            }}>
                <DialogContent className="rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg">Book with Dr. {selectedDoctor?.fullName}</DialogTitle>
                        <DialogDescription>
                            Select a date and time. Your request will be sent for confirmation.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                            <Label htmlFor="pub-date" className="sm:text-right font-medium">Date</Label>
                            <Input id="pub-date" type="date" className="sm:col-span-3 rounded-xl" value={date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                            <Label htmlFor="pub-time" className="sm:text-right font-medium">Time</Label>
                            <Input id="pub-time" type="time" className="sm:col-span-3 rounded-xl" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                            <Label htmlFor="pub-reason" className="sm:text-right font-medium">Reason</Label>
                            <Input id="pub-reason" placeholder="Fever, Checkup..." className="sm:col-span-3 rounded-xl" value={reason} onChange={(e) => setReason(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleBookAppointment} disabled={booking || !date || !time}
                            className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white w-full sm:w-auto rounded-xl shadow-lg shadow-indigo-500/20">
                            {booking ? (<><Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending...</>) : 'Send Appointment Request'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
