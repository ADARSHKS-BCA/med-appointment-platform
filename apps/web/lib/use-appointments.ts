'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { doctorApi, AppointmentData } from './doctor-api';
import { toast } from 'sonner';

const POLL_INTERVAL = 10000; // 10 seconds

export function useAppointments() {
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const fetchAppointments = useCallback(async (showLoading = false) => {
        try {
            if (showLoading) setLoading(true);
            const data = await doctorApi.getAppointments();
            setAppointments(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch appointments');
            console.error('Failed to fetch appointments:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial fetch + polling
    useEffect(() => {
        fetchAppointments(true);

        intervalRef.current = setInterval(() => {
            fetchAppointments(false);
        }, POLL_INTERVAL);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [fetchAppointments]);

    const confirm = useCallback(async (id: string) => {
        // Optimistic update
        setAppointments(prev =>
            prev.map(a => a.id === id ? { ...a, status: 'CONFIRMED' as const } : a)
        );

        try {
            await doctorApi.confirmAppointment(id);
            toast.success('Appointment confirmed');
        } catch (err: any) {
            // Revert on failure
            toast.error(err.message || 'Failed to confirm appointment');
            fetchAppointments(false);
        }
    }, [fetchAppointments]);

    const reject = useCallback(async (id: string, reason?: string) => {
        // Optimistic update
        setAppointments(prev =>
            prev.map(a => a.id === id ? { ...a, status: 'REJECTED' as const, rejectionReason: reason || null } : a)
        );

        try {
            await doctorApi.rejectAppointment(id, reason);
            toast.success('Appointment rejected');
        } catch (err: any) {
            toast.error(err.message || 'Failed to reject appointment');
            fetchAppointments(false);
        }
    }, [fetchAppointments]);

    const refresh = useCallback(() => {
        fetchAppointments(false);
    }, [fetchAppointments]);

    // Derived data
    const requested = appointments.filter(a => a.status === 'REQUESTED');
    const confirmed = appointments.filter(a => a.status === 'CONFIRMED');
    const todayAppointments = appointments.filter(a => {
        const today = new Date();
        const apptDate = new Date(a.startTime);
        return (
            apptDate.getFullYear() === today.getFullYear() &&
            apptDate.getMonth() === today.getMonth() &&
            apptDate.getDate() === today.getDate()
        );
    });
    const todayConfirmed = todayAppointments.filter(a => a.status === 'CONFIRMED');
    const todayCompleted = todayAppointments.filter(a => a.status === 'COMPLETED');
    const todayCancelled = todayAppointments.filter(a => a.status === 'CANCELLED');
    const todayRejected = todayAppointments.filter(a => a.status === 'REJECTED');

    return {
        appointments,
        loading,
        error,
        confirm,
        reject,
        refresh,
        requested,
        confirmed,
        todayAppointments,
        todayConfirmed,
        todayCompleted,
        todayCancelled,
        todayRejected,
    };
}
