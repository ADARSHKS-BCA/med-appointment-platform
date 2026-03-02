'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface RejectReasonModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (reason: string) => void;
    patientName: string;
}

export function RejectReasonModal({ open, onClose, onConfirm, patientName }: RejectReasonModalProps) {
    const [reason, setReason] = useState('');

    if (!open) return null;

    const handleConfirm = () => {
        onConfirm(reason);
        setReason('');
    };

    const handleClose = () => {
        setReason('');
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] animate-in fade-in duration-200"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 fade-in duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                            Reject Appointment
                        </h3>
                        <p className="text-sm text-slate-500 mb-4">
                            You are rejecting the appointment request from <span className="font-medium text-slate-700">{patientName}</span>.
                            Optionally provide a reason.
                        </p>

                        <Textarea
                            placeholder="e.g., Schedule conflict, patient should see a specialist..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            rows={3}
                            className="resize-none mb-4"
                        />

                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="outline"
                                onClick={handleClose}
                                className="px-4"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleConfirm}
                                className="px-4 bg-red-600 hover:bg-red-700"
                            >
                                Reject Appointment
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
