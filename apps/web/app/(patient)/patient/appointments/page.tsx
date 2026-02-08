'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Appointment {
    id: string;
    doctor: {
        fullName: string;
        user: {
            email: string;
        };
    };
    startTime: string;
    status: string;
    reason: string;
}

export default function PatientAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const data = await api.get('/appointments');
            setAppointments(data);
        } catch (error) {
            toast.error('Failed to load appointments');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading appointments...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Appointments</h2>
            <div className="space-y-4">
                {appointments.length === 0 ? (
                    <p className="text-slate-500">No appointments found.</p>
                ) : (
                    appointments.map((appt) => (
                        <Card key={appt.id}>
                            <CardHeader>
                                <CardTitle>Dr. {appt.doctor?.fullName || appt.doctor?.user?.email?.split('@')[0] || 'Unknown'}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="font-semibold text-slate-500">Date & Time</p>
                                        <p>{format(new Date(appt.startTime), 'PPpp')}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-500">Reason</p>
                                        <p>{appt.reason}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-500">Status</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appt.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                            appt.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {appt.status}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
