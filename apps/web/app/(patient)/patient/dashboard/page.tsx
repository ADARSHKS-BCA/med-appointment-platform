'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Doctor {
    id: string;      // Doctor ID
    userId: string;  // User ID
    user: {
        email: string;
    };
    fullName: string;
    specialization: string;
    experienceYears: number; // camelCase
    consultationFee: number; // camelCase
    bio: string;
}

export default function PatientDashboard() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    // Booking State
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const data = await api.get('/doctors');
            setDoctors(data);
        } catch (error) {
            toast.error('Failed to load doctors');
        } finally {
            setLoading(false);
        }
    };

    const handleBookAppointment = async () => {
        if (!selectedDoctor || !date || !time) return;

        try {
            const startTime = new Date(`${date}T${time}:00`);
            const endTime = new Date(startTime.getTime() + 30 * 60000); // 30 mins later output

            await api.post('/appointments', {
                doctorId: selectedDoctor.id, // Use Doctor ID
                startTime: startTime.toISOString(),
                endTime: endTime.toISOString(),
                reason: reason || 'General Consultation'
            });

            toast.success('Appointment requested!');
            setSelectedDoctor(null); // Close modal
        } catch (error: any) {
            toast.error(error.message || 'Booking failed');
        }
    };

    if (loading) return <div>Loading doctors...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Find a Doctor</h2>
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
                                    <Button className="w-full" onClick={() => setSelectedDoctor(doc)}>Book Appointment</Button>
                                </DialogTrigger>
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
                                            <Input id="date" type="date" className="col-span-3" onChange={(e) => setDate(e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="time" className="text-right">Time</Label>
                                            <Input id="time" type="time" className="col-span-3" onChange={(e) => setTime(e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="reason" className="text-right">Reason</Label>
                                            <Input id="reason" placeholder="Fever, Checkup..." className="col-span-3" onChange={(e) => setReason(e.target.value)} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" onClick={handleBookAppointment}>Confirm Booking</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
