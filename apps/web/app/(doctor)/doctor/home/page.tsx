'use client';

import { useState } from 'react';
import { useAppointments } from '@/lib/use-appointments';
import { AppointmentRequestCard } from '@/components/doctor-dashboard/AppointmentRequestCard';
import { RejectReasonModal } from '@/components/doctor-dashboard/RejectReasonModal';
import { Inbox, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DoctorHomePage() {
    const { appointments, loading, error, confirm, reject, refresh, requested } = useAppointments();
    const [rejectingId, setRejectingId] = useState<string | null>(null);

    const rejectingAppointment = appointments.find(a => a.id === rejectingId);

    const handleRejectConfirm = (reason: string) => {
        if (rejectingId) {
            reject(rejectingId, reason || undefined);
            setRejectingId(null);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <div className="h-8 w-64 bg-slate-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-96 bg-slate-100 rounded animate-pulse" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full" />
                                <div>
                                    <div className="h-5 w-40 bg-slate-200 rounded mb-2" />
                                    <div className="h-3 w-24 bg-slate-100 rounded" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="h-16 bg-slate-100 rounded-lg" />
                                <div className="h-16 bg-slate-100 rounded-lg" />
                            </div>
                            <div className="flex gap-3 pt-3 border-t">
                                <div className="h-10 flex-1 bg-slate-100 rounded" />
                                <div className="h-10 flex-1 bg-slate-100 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                        <Inbox className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-1">Failed to load</h3>
                    <p className="text-sm text-slate-500 mb-4">{error}</p>
                    <Button onClick={refresh} variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8 gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        🩺 Appointment Requests
                    </h1>
                    <p className="text-slate-500 mt-1 text-sm sm:text-base">
                        Review and manage incoming patient requests
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">
                        {requested.length} pending
                    </span>
                    <Button
                        onClick={refresh}
                        variant="outline"
                        size="sm"
                        className="h-8"
                    >
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Empty state */}
            {requested.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                        <Inbox className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-1">No Pending Requests</h3>
                    <p className="text-sm text-slate-500 max-w-[280px]">
                        You're all caught up! New appointment requests from patients will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {requested.map(appointment => (
                        <AppointmentRequestCard
                            key={appointment.id}
                            appointment={appointment}
                            onConfirm={confirm}
                            onReject={(id) => setRejectingId(id)}
                        />
                    ))}
                </div>
            )}

            {/* Reject Reason Modal */}
            <RejectReasonModal
                open={!!rejectingId}
                onClose={() => setRejectingId(null)}
                onConfirm={handleRejectConfirm}
                patientName={rejectingAppointment?.patient?.fullName || 'Unknown Patient'}
            />
        </div>
    );
}
