'use client';

import { useEffect, useCallback } from 'react';
import { X, AlertTriangle, AlertCircle, Info, Clock, User, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AppointmentData } from '@/lib/doctor-api';

interface AlertItem {
    id: string;
    priority: 'high' | 'medium' | 'low';
    patientName: string;
    issueType: string;
    time: string;
    appointmentId: string;
}

interface AlertsDrawerProps {
    open: boolean;
    onClose: () => void;
    appointments: AppointmentData[];
}

function generateAlerts(appointments: AppointmentData[]): AlertItem[] {
    const alerts: AlertItem[] = [];
    const now = new Date();

    appointments.forEach((appt) => {
        const startTime = new Date(appt.startTime);
        const diffMs = startTime.getTime() - now.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        // High priority: Requested appointments starting in less than 1 hour
        if (appt.status === 'REQUESTED' && diffMins > 0 && diffMins <= 60) {
            alerts.push({
                id: `urgent-${appt.id}`,
                priority: 'high',
                patientName: appt.patient?.fullName || 'Unknown',
                issueType: `Unconfirmed — starts in ${diffMins}min`,
                time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                appointmentId: appt.id,
            });
        }

        // Medium priority: Requested appointments today
        if (
            appt.status === 'REQUESTED' &&
            startTime.toDateString() === now.toDateString() &&
            diffMins > 60
        ) {
            alerts.push({
                id: `pending-${appt.id}`,
                priority: 'medium',
                patientName: appt.patient?.fullName || 'Unknown',
                issueType: `Pending request for today`,
                time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                appointmentId: appt.id,
            });
        }

        // Low priority: Upcoming confirmed appointments
        if (
            appt.status === 'CONFIRMED' &&
            startTime.toDateString() === now.toDateString() &&
            diffMins > 0 &&
            diffMins <= 30
        ) {
            alerts.push({
                id: `upcoming-${appt.id}`,
                priority: 'low',
                patientName: appt.patient?.fullName || 'Unknown',
                issueType: `Starts in ${diffMins}min`,
                time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                appointmentId: appt.id,
            });
        }
    });

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    alerts.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return alerts;
}

const priorityConfig = {
    high: {
        icon: AlertTriangle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        iconColor: 'text-red-600',
        badgeBg: 'bg-red-100 text-red-700',
        label: 'High',
    },
    medium: {
        icon: AlertCircle,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        iconColor: 'text-amber-600',
        badgeBg: 'bg-amber-100 text-amber-700',
        label: 'Medium',
    },
    low: {
        icon: Info,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-600',
        badgeBg: 'bg-blue-100 text-blue-700',
        label: 'Low',
    },
};

export function AlertsDrawer({ open, onClose, appointments }: AlertsDrawerProps) {
    const alerts = generateAlerts(appointments);

    // ESC key handler
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                onClose();
            }
        },
        [open, onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Prevent body scroll when open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-[70] bg-white shadow-2xl
                    transition-transform duration-300 ease-in-out
                    w-full sm:w-96
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Today's Alerts</h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            {alerts.length} alert{alerts.length !== 1 ? 's' : ''} requiring attention
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full hover:bg-slate-100"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Alert List */}
                <div className="overflow-y-auto h-[calc(100%-80px)] p-4 sm:p-6 space-y-3">
                    {alerts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                                <Info className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-sm font-semibold text-slate-700 mb-1">All Clear!</h3>
                            <p className="text-xs text-slate-500 max-w-[200px]">
                                No alerts right now. Everything is on track for today.
                            </p>
                        </div>
                    ) : (
                        alerts.map((alert) => {
                            const config = priorityConfig[alert.priority];
                            const IconComponent = config.icon;

                            return (
                                <div
                                    key={alert.id}
                                    className={`
                                        ${config.bgColor} ${config.borderColor}
                                        border rounded-xl p-4
                                        cursor-pointer hover:shadow-md transition-all duration-200
                                        group
                                    `}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-0.5 ${config.iconColor}`}>
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge
                                                    variant="secondary"
                                                    className={`text-[10px] px-1.5 py-0 h-4 ${config.badgeBg} border-0`}
                                                >
                                                    {config.label}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-1 mb-1">
                                                <User className="w-3 h-3 text-slate-400" />
                                                <p className="text-sm font-semibold text-slate-800 truncate">
                                                    {alert.patientName}
                                                </p>
                                            </div>
                                            <p className="text-xs text-slate-600 mb-2">
                                                {alert.issueType}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-slate-400">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-[11px]">{alert.time}</span>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </aside>
        </>
    );
}
