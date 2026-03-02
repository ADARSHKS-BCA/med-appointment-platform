'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { api } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { RefreshCw, Calendar, Clock, FileText, Inbox, Loader2, XCircle, CheckCircle2 } from 'lucide-react';

interface Appointment {
    id: string;
    doctor: {
        fullName: string;
        specialization: string;
        user: { email: string; };
    };
    startTime: string;
    endTime: string;
    status: string;
    reason: string;
    rejectionReason?: string;
}

const POLL_INTERVAL = 10000;

const statusConfig: Record<string, { label: string; className: string; icon: any }> = {
    REQUESTED: { label: 'Pending Review', className: 'bg-amber-50 text-amber-700 border-amber-200', icon: Clock },
    CONFIRMED: { label: 'Confirmed', className: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
    REJECTED: { label: 'Rejected', className: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
    COMPLETED: { label: 'Completed', className: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: CheckCircle2 },
    CANCELLED: { label: 'Cancelled', className: 'bg-slate-100 text-slate-600 border-slate-200', icon: XCircle },
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

            const statusMap: Record<string, string> = {};
            data.forEach((appt: Appointment) => { statusMap[appt.id] = appt.status; });
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
        intervalRef.current = setInterval(() => fetchAppointments(false), POLL_INTERVAL);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
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

    if (loading) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900">My Appointments</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass rounded-2xl p-6 animate-pulse">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-200" />
                                    <div className="space-y-2"><div className="h-4 w-36 bg-slate-200 rounded-full" /><div className="h-3 w-24 bg-slate-100 rounded-full" /></div>
                                </div>
                                <div className="h-6 w-20 bg-slate-200 rounded-full" />
                            </div>
                            <div className="grid grid-cols-3 gap-4"><div className="h-14 bg-slate-100 rounded-xl" /><div className="h-14 bg-slate-100 rounded-xl" /><div className="h-14 bg-slate-100 rounded-xl" /></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900">My Appointments</h2>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-5">
                        <Inbox className="w-9 h-9 text-red-400" />
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{error}</p>
                    <Button onClick={() => fetchAppointments(true)} variant="outline" size="sm" className="rounded-xl">
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
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-5 shadow-premium">
                        <Calendar className="w-9 h-9 text-slate-300" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-600">No Appointments Yet</h3>
                    <p className="text-xs text-slate-400 mt-1">Book from the Dashboard to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {appointments.map((appt) => {
                        const config = statusConfig[appt.status] || statusConfig.REQUESTED;
                        const StatusIcon = config.icon;

                        return (
                            <div key={appt.id} className="group glass rounded-2xl overflow-hidden hover:shadow-premium transition-all duration-300">
                                {/* Status accent bar */}
                                <div className={`h-1 ${appt.status === 'CONFIRMED' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' :
                                        appt.status === 'REJECTED' ? 'bg-gradient-to-r from-red-400 to-rose-500' :
                                            appt.status === 'REQUESTED' ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                                                'bg-gradient-to-r from-slate-300 to-slate-400'
                                    }`} />

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
                                                {appt.doctor?.fullName?.charAt(0) || 'D'}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">
                                                    Dr. {appt.doctor?.fullName || appt.doctor?.user?.email?.split('@')[0] || 'Unknown'}
                                                </h3>
                                                {appt.doctor?.specialization && (
                                                    <p className="text-xs text-indigo-600 font-medium">{appt.doctor.specialization}</p>
                                                )}
                                            </div>
                                        </div>
                                        <Badge variant="outline" className={`text-xs border rounded-full px-3 py-1 flex items-center gap-1.5 ${config.className}`}>
                                            <StatusIcon className="w-3 h-3" />
                                            {config.label}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-start gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                                                <Calendar className="w-4 h-4 text-indigo-500" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Date & Time</p>
                                                <p className="text-slate-800 font-semibold">{format(new Date(appt.startTime), 'EEE, MMM d')}</p>
                                                <p className="text-xs text-slate-500">{format(new Date(appt.startTime), 'h:mm a')}{appt.endTime && ` – ${format(new Date(appt.endTime), 'h:mm a')}`}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center shrink-0">
                                                <FileText className="w-4 h-4 text-violet-500" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Reason</p>
                                                <p className="text-slate-700">{appt.reason || 'General Consultation'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                                                <Clock className="w-4 h-4 text-cyan-500" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Status</p>
                                                <p className="text-slate-700 text-xs">
                                                    {appt.status === 'REQUESTED' && 'Waiting for doctor'}
                                                    {appt.status === 'CONFIRMED' && 'Doctor confirmed'}
                                                    {appt.status === 'REJECTED' && 'Doctor declined'}
                                                    {appt.status === 'COMPLETED' && 'Completed'}
                                                    {appt.status === 'CANCELLED' && 'Cancelled'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {appt.status === 'REJECTED' && appt.rejectionReason && (
                                        <div className="mt-4 p-3.5 bg-red-50 rounded-xl border border-red-100">
                                            <p className="text-xs font-bold text-red-700 mb-0.5">Reason for rejection:</p>
                                            <p className="text-sm text-red-600">{appt.rejectionReason}</p>
                                        </div>
                                    )}

                                    {['REQUESTED', 'CONFIRMED'].includes(appt.status) && (
                                        <div className="mt-4 pt-4 border-t border-slate-100/50">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 rounded-xl"
                                                onClick={() => handleCancel(appt.id)}
                                                disabled={cancelling === appt.id}
                                            >
                                                {cancelling === appt.id ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : null}
                                                Cancel Appointment
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
