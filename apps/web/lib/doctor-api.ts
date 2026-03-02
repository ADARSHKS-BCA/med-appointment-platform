import { api } from './api';

// Types matching the Prisma schema with includes
export interface PatientInfo {
    id: string;
    fullName: string;
    phone: string | null;
    dob: string | null;
    gender: 'MALE' | 'FEMALE' | 'OTHER' | null;
    user: {
        email: string;
    };
}

export interface AppointmentData {
    id: string;
    patientId: string;
    doctorId: string;
    startTime: string;
    endTime: string;
    status: 'REQUESTED' | 'CONFIRMED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
    reason: string | null;
    rejectionReason: string | null;
    createdAt: string;
    updatedAt: string;
    patient: PatientInfo;
}

export const doctorApi = {
    getAppointments: (): Promise<AppointmentData[]> =>
        api.get('/appointments'),

    confirmAppointment: (id: string): Promise<AppointmentData> =>
        api.patch(`/appointments/${id}/status`, { status: 'CONFIRMED' }),

    rejectAppointment: (id: string, rejectionReason?: string): Promise<AppointmentData> =>
        api.patch(`/appointments/${id}/status`, { status: 'REJECTED', rejectionReason }),

    cancelAppointment: (id: string): Promise<AppointmentData> =>
        api.patch(`/appointments/${id}/status`, { status: 'CANCELLED' }),
};
