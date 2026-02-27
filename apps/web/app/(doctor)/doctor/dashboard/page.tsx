'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { getCookie } from 'cookies-next';
import { toast } from 'sonner';

// Import New Dashboard Components
import { AlertsBanner } from '@/components/doctor-dashboard/AlertsBanner';
import { QuickStatsGrid } from '@/components/doctor-dashboard/QuickStatsGrid';
import { AppointmentsTimeline } from '@/components/doctor-dashboard/AppointmentsTimeline';
import { CalendarQueue } from '@/components/doctor-dashboard/CalendarQueue';
import { RecentActivityCharts } from '@/components/doctor-dashboard/RecentActivityCharts';
import { PatientQuickAccessDrawer } from '@/components/doctor-dashboard/PatientQuickAccessDrawer';
import { ConsultationModeModal } from '@/components/doctor-dashboard/ConsultationModeModal';

interface AppointmentType {
    id: string;
    patientName: string;
    age: number;
    gender: string;
    type: 'Consultation' | 'Follow-up' | 'Emergency';
    status: 'Checked-in' | 'Waiting' | 'Completed' | 'No-show' | 'Scheduled';
    startTime: Date;
    endTime: Date;
}

export default function DoctorDashboard() {
    const [loading, setLoading] = useState(true);

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

        // Simulating data fetch for the new layout
        setTimeout(() => setLoading(false), 500);
    }, []);

    const handleAppointmentAction = (action: string, appointmentId: string) => {
        // Find appointment details here normally. Mocking for now:
        setSelectedPatient('Sarah Smith');

        if (action === 'start') {
            setConsultationOpen(true);
        } else if (action === 'view_patient') {
            setDrawerOpen(true);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
            {/* Top Section */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
                        <p className="text-slate-500 mt-1">Welcome back, Dr. Premium. Here's what's happening today.</p>
                    </div>
                </div>

                <AlertsBanner />
                <QuickStatsGrid />
            </section>

            {/* Main Section */}
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left Panel - Timeline */}
                <div className="xl:col-span-8 h-[600px]">
                    {/* Add onClick handle to show Patient drawer by default for the timeline */}
                    <div onClick={() => handleAppointmentAction('view_patient', '1')} className="h-full cursor-pointer">
                        <AppointmentsTimeline onAction={handleAppointmentAction} />
                    </div>
                </div>

                {/* Right Panel - Calendar & Queue */}
                <div className="xl:col-span-4 space-y-6">
                    <CalendarQueue />
                </div>
            </section>

            {/* Bottom Section */}
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
