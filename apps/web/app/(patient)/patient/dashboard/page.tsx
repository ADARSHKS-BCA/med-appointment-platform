'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Search, Stethoscope, Clock, DollarSign, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
}

export default function PatientDashboard() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Booking State
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');
    const [booking, setBooking] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

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

            toast.success(
                'Appointment request sent! The doctor will review and confirm your booking.',
                { duration: 5000 }
            );

            // Reset form and close dialog
            setDate('');
            setTime('');
            setReason('');
            setSelectedDoctor(null);
            setDialogOpen(false);
        } catch (error: any) {
            toast.error(error.message || 'Booking failed. Please try again.');
        } finally {
            setBooking(false);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Find a Doctor</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map(i => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="h-5 w-40 bg-slate-200 rounded mb-2" />
                                <div className="h-4 w-24 bg-slate-100 rounded" />
                            </CardHeader>
                            <CardContent>
                                <div className="h-12 bg-slate-100 rounded mb-4" />
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 bg-slate-100 rounded" />
                                    <div className="h-4 w-16 bg-slate-100 rounded" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <div className="h-10 w-full bg-slate-200 rounded" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">Find a Doctor</h2>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <Stethoscope className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-1">Unable to Load Doctors</h3>
                    <p className="text-sm text-slate-500 mb-4 max-w-xs">{error}</p>
                    <Button onClick={fetchDoctors} variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Find a Doctor</h2>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                    {doctors.length} Available
                </Badge>
            </div>

            {doctors.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-600">No Doctors Available</h3>
                    <p className="text-xs text-slate-400 mt-1">Please check back later.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {doctors.map((doc) => (
                        <Card key={doc.id} className="hover:shadow-lg transition-shadow duration-200 border-slate-200">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-base">
                                            Dr. {doc.fullName || doc.user.email.split('@')[0]}
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            {doc.specialization}
                                        </CardDescription>
                                    </div>
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                        {doc.fullName?.charAt(0) || 'D'}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{doc.bio || 'No bio available'}</p>
                                <div className="flex justify-between text-sm text-slate-600">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        {doc.experienceYears} yrs exp
                                    </span>
                                    <span className="flex items-center gap-1 font-semibold text-emerald-600">
                                        <DollarSign className="w-3.5 h-3.5" />
                                        {Number(doc.consultationFee).toFixed(0)}
                                    </span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Dialog open={dialogOpen && selectedDoctor?.id === doc.id} onOpenChange={(open) => {
                                    setDialogOpen(open);
                                    if (open) setSelectedDoctor(doc);
                                    if (!open) { setSelectedDoctor(null); setDate(''); setTime(''); setReason(''); }
                                }}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                            Book Appointment
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Book with Dr. {doc.fullName}</DialogTitle>
                                            <DialogDescription>
                                                Select a date and time. Your request will be sent to the doctor for confirmation.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                                                <Label htmlFor={`date-${doc.id}`} className="sm:text-right">Date</Label>
                                                <Input
                                                    id={`date-${doc.id}`}
                                                    type="date"
                                                    className="sm:col-span-3"
                                                    value={date}
                                                    min={new Date().toISOString().split('T')[0]}
                                                    onChange={(e) => setDate(e.target.value)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                                                <Label htmlFor={`time-${doc.id}`} className="sm:text-right">Time</Label>
                                                <Input
                                                    id={`time-${doc.id}`}
                                                    type="time"
                                                    className="sm:col-span-3"
                                                    value={time}
                                                    onChange={(e) => setTime(e.target.value)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                                                <Label htmlFor={`reason-${doc.id}`} className="sm:text-right">Reason</Label>
                                                <Input
                                                    id={`reason-${doc.id}`}
                                                    placeholder="Fever, Checkup, Headache..."
                                                    className="sm:col-span-3"
                                                    value={reason}
                                                    onChange={(e) => setReason(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                onClick={handleBookAppointment}
                                                disabled={booking || !date || !time}
                                                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                                            >
                                                {booking ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                        Sending Request...
                                                    </>
                                                ) : (
                                                    'Send Appointment Request'
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
