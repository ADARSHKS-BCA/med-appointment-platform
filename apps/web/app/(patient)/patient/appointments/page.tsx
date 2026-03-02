'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { api } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { RefreshCw, Calendar, Clock, FileText, Inbox, Loader2 } from 'lucide-react';

interface Appointment {
    id: string;
    doctor: {
        fullName: string;
        specialization: string;
        user: {
            email: string;
        };
    };
    startTime: string;
    endTime: string;
    status: string;
    reason: string;
    rejectionReason?: string;
}

const POLL_INTERVAL = 10000; // 10 seconds

const statusConfig: Record<string, { label: string; className: string }> = {
    REQUESTED: { label: 'Pending Review', className: 'bg-amber-100 text-amber-800 border-amber-200' },
    CONFIRMED: { label: 'Confirmed', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    REJECTED: { label: 'Rejected', className: 'bg-red-100 text-red-800 border-red-200' },
    COMPLETED: { label: 'Completed', className: 'bg-blue-100 text-blue-800 border-blue-200' },
    CANCELLED: { label: 'Cancelled', className: 'bg-slate-100 text-slate-700 border-slate-200' },
};

export default function PatientAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cancelling, setCancelling] = useState<string | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const prevStatusRef = useRef<Record<string, string>>({});

    const fetchAppointments = useCallback(async (showLoading = false) => {
        try {
            if (showLoading) setLoading(true);
            const data = await api.get('/appointments');

            // Check for status changes and notify
            if (Object.keys(prevStatusRef.current).length > 0) {
                data.forEach((appt: Appointment) => {
                    const prevStatus = prevStatusRef.current[appt.id];
                    if (prevStatus && prevStatus !== appt.status) {
                        if (appt.status === 'CONFIRMED') {
                            toast.success(`Your appointment with Dr. ${appt.doctor?.fullName || 'your doctor'} has been confirmed!`, { duration: 6000 });
                        } else if (appt.status === 'REJECTED') {
                            toast.error(`Your appointment with Dr. ${appt.doctor?.fullName || 'your doctor'} was declined.`, { duration: 6000 });
                        }
                    }
                });
            }

            // Track statuses
            const statusMap: Record<string, string> = {};
            data.forEach((appt: Appointment) => {
                statusMap[appt.id] = appt.status;
            });
            prevStatusRef.current = statusMap;

            setAppointments(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to load appointments');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAppointments(true);

        intervalRef.current = setInterval(() => {
            fetchAppointments(false);
        }, POLL_INTERVAL);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [fetchAppointments]);

    const handleCancel = async (id: string) => {
        setCancelling(id);
        try {
            await api.patch(`/appointments/${id}/status`, { status: 'CANCELLED' });
            toast.success('Appointment cancelled');
            fetchAppointments(false);
        } catch (err: any) {
            toast.error(err.message || 'Failed to cancel appointment');
        } finally {
            setCancelling(null);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">My Appointments</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader><div className="h-5 w-48 bg-slate-200 rounded" /></CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-12 bg-slate-100 rounded" />
                                    <div className="h-12 bg-slate-100 rounded" />
                                </div>
                            </CardContent>
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
                <h2 className="text-2xl font-bold text-slate-900">My Appointments</h2>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <Inbox className="w-8 h-8 text-red-400" />
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{error}</p>
                    <Button onClick={() => fetchAppointments(true)} variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" /> Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">My Appointments</h2>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Auto-refreshing</span>
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                </div>
            </div>

            {appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Calendar className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-600">No Appointments Yet</h3>
                    <p className="text-xs text-slate-400 mt-1">
                        Book an appointment from the Dashboard to get started.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {appointments.map((appt) => {
                        const config = statusConfig[appt.status] || statusConfig.REQUESTED;

                        return (
                            <Card key={appt.id} className="border-slate-200 hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-base">
                                            Dr. {appt.doctor?.fullName || appt.doctor?.user?.email?.split('@')[0] || 'Unknown'}
                                        </CardTitle>
                                        <Badge
                                            variant="outline"
                                            className={`text-xs border ${config.className}`}
                                        >
                                            {config.label}
                                        </Badge>
                                    </div>
                                    {appt.doctor?.specialization && (
                                        <p className="text-xs text-slate-500">{appt.doctor.specialization}</p>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-start gap-2">
                                            <Calendar className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Date & Time</p>
                                                <p className="text-slate-700 font-medium">
                                                    {format(new Date(appt.startTime), 'EEE, MMM d')}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {format(new Date(appt.startTime), 'h:mm a')}
                                                    {appt.endTime && ` – ${format(new Date(appt.endTime), 'h:mm a')}`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <FileText className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Reason</p>
                                                <p className="text-slate-700">{appt.reason || 'General Consultation'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Status</p>
                                                <p className="text-slate-700">
                                                    {appt.status === 'REQUESTED' && 'Waiting for doctor to confirm'}
                                                    {appt.status === 'CONFIRMED' && 'Doctor confirmed your appointment'}
                                                    {appt.status === 'REJECTED' && 'Doctor declined this appointment'}
                                                    {appt.status === 'COMPLETED' && 'Appointment completed'}
                                                    {appt.status === 'CANCELLED' && 'This appointment was cancelled'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rejection reason */}
                                    {appt.status === 'REJECTED' && appt.rejectionReason && (
                                        <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-100">
                                            <p className="text-xs font-semibold text-red-700 mb-0.5">Reason for rejection:</p>
                                            <p className="text-sm text-red-600">{appt.rejectionReason}</p>
                                        </div>
                                    )}

                                    {/* Cancel button for REQUESTED or CONFIRMED */}
                                    {['REQUESTED', 'CONFIRMED'].includes(appt.status) && (
                                        <div className="mt-4 pt-3 border-t border-slate-100">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                                onClick={() => handleCancel(appt.id)}
                                                disabled={cancelling === appt.id}
                                            >
                                                {cancelling === appt.id ? (
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                                                ) : null}
                                                Cancel Appointment
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
