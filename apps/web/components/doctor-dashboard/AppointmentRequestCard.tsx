'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    User, Calendar, Clock, Phone, Mail,
    FileText, CheckCircle, XCircle, Loader2
} from 'lucide-react';
import { AppointmentData } from '@/lib/doctor-api';

interface AppointmentRequestCardProps {
    appointment: AppointmentData;
    onConfirm: (id: string) => Promise<void>;
    onReject: (id: string) => void; // opens modal
}

export function AppointmentRequestCard({ appointment, onConfirm, onReject }: AppointmentRequestCardProps) {
    const [confirming, setConfirming] = useState(false);

    const patient = appointment.patient;
    const startTime = new Date(appointment.startTime);
    const endTime = new Date(appointment.endTime);

    // Calculate age from DOB
    const age = patient?.dob
        ? Math.floor((Date.now() - new Date(patient.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
        : null;

    const genderLabel = patient?.gender
        ? patient.gender.charAt(0) + patient.gender.slice(1).toLowerCase()
        : null;

    const handleConfirm = async () => {
        setConfirming(true);
        try {
            await onConfirm(appointment.id);
        } finally {
            setConfirming(false);
        }
    };

    // Animated card - transitions when status changes
    if (appointment.status !== 'REQUESTED') {
        return (
            <Card className={`
                shadow-sm border transition-all duration-500 opacity-60
                ${appointment.status === 'CONFIRMED' ? 'border-emerald-200 bg-emerald-50/50' : ''}
                ${appointment.status === 'REJECTED' ? 'border-red-200 bg-red-50/50' : ''}
            `}>
                <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center
                                ${appointment.status === 'CONFIRMED' ? 'bg-emerald-100' : 'bg-red-100'}
                            `}>
                                {appointment.status === 'CONFIRMED'
                                    ? <CheckCircle className="w-5 h-5 text-emerald-600" />
                                    : <XCircle className="w-5 h-5 text-red-600" />
                                }
                            </div>
                            <div>
                                <p className="font-medium text-slate-700">{patient?.fullName || 'Unknown Patient'}</p>
                                <p className="text-xs text-slate-500">
                                    {appointment.status === 'CONFIRMED' ? 'Appointment Confirmed' : 'Appointment Rejected'}
                                </p>
                            </div>
                        </div>
                        <Badge
                            variant="secondary"
                            className={`
                                ${appointment.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : ''}
                                ${appointment.status === 'REJECTED' ? 'bg-red-100 text-red-700' : ''}
                            `}
                        >
                            {appointment.status}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm border-slate-200 hover:shadow-lg transition-all duration-300 hover:border-blue-200 group">
            <CardContent className="p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {patient?.fullName?.charAt(0) || '?'}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                                {patient?.fullName || 'Unknown Patient'}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                {age !== null && (
                                    <span className="text-xs text-slate-500">{age} yrs</span>
                                )}
                                {age !== null && genderLabel && <span className="text-slate-300">•</span>}
                                {genderLabel && (
                                    <span className="text-xs text-slate-500">{genderLabel}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-0 text-xs">
                        Pending
                    </Badge>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {/* Reason */}
                    {appointment.reason && (
                        <div className="sm:col-span-2 flex items-start gap-2 bg-slate-50 rounded-lg p-3">
                            <FileText className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                                    Symptoms / Reason
                                </p>
                                <p className="text-sm text-slate-700">{appointment.reason}</p>
                            </div>
                        </div>
                    )}

                    {/* Date & Time */}
                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3">
                        <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                                Date
                            </p>
                            <p className="text-sm font-medium text-slate-700">
                                {format(startTime, 'EEE, MMM d, yyyy')}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3">
                        <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                        <div>
                            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                                Time
                            </p>
                            <p className="text-sm font-medium text-slate-700">
                                {format(startTime, 'h:mm a')} – {format(endTime, 'h:mm a')}
                            </p>
                        </div>
                    </div>

                    {/* Contact */}
                    {patient?.phone && (
                        <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3">
                            <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                                    Phone
                                </p>
                                <p className="text-sm text-slate-700">{patient.phone}</p>
                            </div>
                        </div>
                    )}

                    {patient?.user?.email && (
                        <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3">
                            <Mail className="w-4 h-4 text-purple-500 shrink-0" />
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
                                    Email
                                </p>
                                <p className="text-sm text-slate-700 truncate">{patient.user.email}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-3 border-t border-slate-100">
                    <Button
                        onClick={handleConfirm}
                        disabled={confirming}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm h-10 sm:h-11"
                    >
                        {confirming ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                            <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        Confirm
                    </Button>
                    <Button
                        onClick={() => onReject(appointment.id)}
                        variant="outline"
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 h-10 sm:h-11"
                    >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
