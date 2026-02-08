'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface Appointment {
    id: string;
    patient: {
        fullName: string;
        user: {
            email: string;
        };
    };
    startTime: string;
    endTime: string;
    status: string;
    reason: string;
}

export default function DoctorDashboard() {
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

    const handleStatusUpdate = async (id: string, status: 'CONFIRMED' | 'CANCELLED') => {
        try {
            await api.patch(`/appointments/${id}/status`, { status });
            toast.success(`Appointment ${status.toLowerCase()}`);
            fetchAppointments(); // Refresh list
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{appointments.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {appointments.filter(a => new Date(a.startTime).toDateString() === new Date().toDateString()).length}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-xl font-bold mt-8">Recent Appointments</h2>
            <div className="space-y-4">
                {appointments.length === 0 ? (
                    <p className="text-slate-500">No appointments found.</p>
                ) : (
                    appointments.map((appt) => (
                        <Card key={appt.id}>
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="space-y-1">
                                    <p className="font-medium leading-none">
                                        {appt.patient?.fullName || appt.patient?.user?.email || 'Unknown Patient'}
                                    </p>
                                    <p className="text-sm text-slate-500">{appt.reason}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">{format(new Date(appt.startTime), 'PP')}</p>
                                    <p className="text-sm text-slate-500">{format(new Date(appt.startTime), 'p')} - {format(new Date(appt.endTime), 'p')}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appt.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                            appt.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {appt.status}
                                        </span>
                                    </div>
                                    {appt.status === 'REQUESTED' && (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleStatusUpdate(appt.id, 'CONFIRMED')}
                                                className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(appt.id, 'CANCELLED')}
                                                className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
