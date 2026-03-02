'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Search, Stethoscope, Clock, DollarSign, RefreshCw, Star, ArrowRight } from 'lucide-react';

interface Doctor {
    id: string;
    userId: string;
    user: { email: string; };
    fullName: string;
    specialization: string;
    experienceYears: number;
    consultationFee: number;
    bio: string;
}

export default function PatientDashboard() {
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
        setLoading(true);
        try {
            const data = await api.get('/doctors');
            setDoctors(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load doctors');
            toast.error('Failed to load doctors');
        } finally {
            setLoading(false);
        }
    };

    const handleBookAppointment = async () => {
        if (!selectedDoctor || !date || !time) {
            toast.error('Please fill in all required fields');
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
                reason: reason || 'General Consultation'
            });
            toast.success('Appointment request sent! The doctor will review and confirm your booking.', { duration: 5000 });
            setDate(''); setTime(''); setReason('');
            setSelectedDoctor(null); setDialogOpen(false);
        } catch (error: any) {
            toast.error(error.message || 'Booking failed. Please try again.');
        } finally {
            setBooking(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Find a Doctor</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-slate-200" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-3/4 bg-slate-200 rounded-full" />
                                    <div className="h-3 w-1/2 bg-slate-100 rounded-full" />
                                </div>
                            </div>
                            <div className="h-16 bg-slate-100 rounded-xl mb-4" />
                            <div className="h-10 bg-slate-200 rounded-xl" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Find a Doctor</h2>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl flex items-center justify-center mb-5 shadow-premium">
                        <Stethoscope className="w-9 h-9 text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1">Unable to Load Doctors</h3>
                    <p className="text-sm text-slate-500 mb-5 max-w-xs">{error}</p>
                    <Button onClick={fetchDoctors} variant="outline" size="sm" className="rounded-xl">
                        <RefreshCw className="w-4 h-4 mr-2" /> Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Find a Doctor</h2>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    {doctors.length} Available
                </span>
            </div>

            {doctors.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-5">
                        <Search className="w-9 h-9 text-slate-300" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-600">No Doctors Available</h3>
                    <p className="text-xs text-slate-400 mt-1">Please check back later.</p>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doc) => (
                        <div key={doc.id} className="group glass rounded-2xl overflow-hidden hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
                            {/* Gradient top accent */}
                            <div className="h-1 bg-gradient-to-r from-indigo-500 to-cyan-500" />

                            <div className="p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20 shrink-0">
                                        {doc.fullName?.charAt(0) || 'D'}
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-slate-900 truncate">
                                            Dr. {doc.fullName || doc.user.email.split('@')[0]}
                                        </h3>
                                        <p className="text-sm text-indigo-600 font-medium">{doc.specialization}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">{doc.bio || 'No bio available'}</p>

                                <div className="flex justify-between text-sm mb-5 px-1">
                                    <span className="flex items-center gap-1.5 text-slate-500">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        {doc.experienceYears} yrs exp
                                    </span>
                                    <span className="flex items-center gap-1 font-bold text-emerald-600">
                                        <DollarSign className="w-3.5 h-3.5" />
                                        {Number(doc.consultationFee).toFixed(0)}
                                    </span>
                                </div>

                                <Dialog open={dialogOpen && selectedDoctor?.id === doc.id} onOpenChange={(open) => {
                                    setDialogOpen(open);
                                    if (open) setSelectedDoctor(doc);
                                    if (!open) { setSelectedDoctor(null); setDate(''); setTime(''); setReason(''); }
                                }}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-lg shadow-indigo-500/20 rounded-xl h-11 font-semibold group-hover:shadow-indigo-500/30 transition-all">
                                            Book Appointment
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="rounded-2xl">
                                        <DialogHeader>
                                            <DialogTitle className="text-lg">Book with Dr. {doc.fullName}</DialogTitle>
                                            <DialogDescription>
                                                Select a date and time. Your request will be sent to the doctor for confirmation.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                                                <Label htmlFor={`date-${doc.id}`} className="sm:text-right font-medium">Date</Label>
                                                <Input id={`date-${doc.id}`} type="date" className="sm:col-span-3 rounded-xl" value={date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setDate(e.target.value)} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                                                <Label htmlFor={`time-${doc.id}`} className="sm:text-right font-medium">Time</Label>
                                                <Input id={`time-${doc.id}`} type="time" className="sm:col-span-3 rounded-xl" value={time} onChange={(e) => setTime(e.target.value)} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                                                <Label htmlFor={`reason-${doc.id}`} className="sm:text-right font-medium">Reason</Label>
                                                <Input id={`reason-${doc.id}`} placeholder="Fever, Checkup, Headache..." className="sm:col-span-3 rounded-xl" value={reason} onChange={(e) => setReason(e.target.value)} />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={handleBookAppointment} disabled={booking || !date || !time}
                                                className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white w-full sm:w-auto rounded-xl shadow-lg shadow-indigo-500/20">
                                                {booking ? (<><Loader2 className="w-4 h-4 animate-spin mr-2" /> Sending Request...</>) : 'Send Appointment Request'}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
