'use client';

import { useAppointments } from '@/lib/use-appointments';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Dashboard components
import { QuickStatsGrid } from '@/components/doctor-dashboard/QuickStatsGrid';
import { AppointmentsTimeline } from '@/components/doctor-dashboard/AppointmentsTimeline';
import { RecentActivityCharts } from '@/components/doctor-dashboard/RecentActivityCharts';
import { PatientQuickAccessDrawer } from '@/components/doctor-dashboard/PatientQuickAccessDrawer';
import { ConsultationModeModal } from '@/components/doctor-dashboard/ConsultationModeModal';

export default function DoctorDashboard() {
    const [authChecked, setAuthChecked] = useState(false);
    const {
        appointments,
        loading,
        todayAppointments,
        todayConfirmed,
        todayCompleted,
        todayCancelled,
        todayRejected,
        requested,
    } = useAppointments();

    // Modal states
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [consultationOpen, setConsultationOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState<string>('');

    useEffect(() => {
        const userCookie = getCookie('user');
        if (userCookie) {
            try {
                const user = JSON.parse(userCookie as string);
                if (user.role !== 'DOCTOR') {
                    toast.error('Access Denied: You are logged in as a Patient.');
                    window.location.href = '/patient/dashboard';
                    return;
                }
            } catch (e) {
                // Ignore
            }
        }
        setAuthChecked(true);
    }, []);

    const handleAppointmentAction = (action: string, appointmentId: string) => {
        const appt = todayAppointments.find(a => a.id === appointmentId);
        setSelectedPatient(appt?.patient?.fullName || 'Patient');

        if (action === 'start') {
            setConsultationOpen(true);
        } else if (action === 'view_patient') {
            setDrawerOpen(true);
        }
    };

    // Compute real stats
    const stats = {
        totalAppointments: todayAppointments.length,
        patientsWaiting: requested.filter(a => {
            const today = new Date();
            const d = new Date(a.startTime);
            return d.toDateString() === today.toDateString();
        }).length,
        completedToday: todayCompleted.length,
        noShows: todayCancelled.length,
        revenueToday: todayCompleted.length * 500, // Placeholder: calculate from doctor fee
        avgConsultationTime: todayCompleted.length > 0 ? '14 mins' : 'N/A',
    };

    if (!authChecked || loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Map real appointments to the format AppointmentsTimeline expects
    const timelineAppointments = todayAppointments
        .filter(a => ['CONFIRMED', 'REQUESTED'].includes(a.status))
        .map(a => ({
            id: a.id,
            patientName: a.patient?.fullName || 'Unknown',
            age: a.patient?.dob
                ? Math.floor((Date.now() - new Date(a.patient.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
                : 0,
            gender: a.patient?.gender === 'MALE' ? 'M' : a.patient?.gender === 'FEMALE' ? 'F' : 'O',
            type: 'Consultation' as const,
            status: a.status === 'CONFIRMED' ? 'Scheduled' as const
                : a.status === 'REQUESTED' ? 'Waiting' as const
                    : 'Scheduled' as const,
            startTime: new Date(a.startTime),
            endTime: new Date(a.endTime),
        }));

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
            {/* Overview Section */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
                        <p className="text-slate-500 mt-1 text-sm sm:text-base">
                            {format(new Date(), 'EEEE, MMMM d, yyyy')} — Here's what's happening today.
                        </p>
                    </div>
                </div>

                <QuickStatsGrid stats={stats} loading={loading} />
            </section>

            {/* Today's Schedule Section */}
            <section>
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-slate-900">Today's Schedule</h2>
                    <p className="text-sm text-slate-500">
                        {timelineAppointments.length > 0
                            ? `${timelineAppointments.length} appointment${timelineAppointments.length > 1 ? 's' : ''} scheduled`
                            : 'No appointments scheduled for today'
                        }
                    </p>
                </div>

                {timelineAppointments.length > 0 ? (
                    <div className="h-[500px] lg:h-[600px]">
                        <AppointmentsTimeline
                            appointments={timelineAppointments}
                            onAction={handleAppointmentAction}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl">📅</span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-1">No Appointments Today</h3>
                        <p className="text-xs text-slate-500">Your schedule is clear for today.</p>
                    </div>
                )}
            </section>

            {/* Analytics & Insights Section */}
            <section className="pt-6 border-t border-slate-100">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Analytics & Insights</h2>
                    <p className="text-sm text-slate-500">Your practice performance for the current week.</p>
                </div>
                <RecentActivityCharts />
            </section>

            {/* Modals & Drawers */}
            <PatientQuickAccessDrawer
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                patientId="mock-id"
            />

            <ConsultationModeModal
                open={consultationOpen}
                onOpenChange={setConsultationOpen}
                patientName={selectedPatient}
            />
        </div>
    );
}
