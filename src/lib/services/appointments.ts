import api from '@/lib/api';

export interface Doctor {
    user: {
        first_name: string;
        last_name: string;
    }
}

export interface Patient {
    first_name: string;
    last_name: string;
}

export interface Appointment {
    id: number;
    patient: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    };
    doctor: {
        id: number;
        user: {
            first_name: string;
            last_name: string;
        };
        specialization: {
            name: string;
        };
    };
    appointment_datetime: string;
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    reason: string;
    notes?: string;
}

export const appointmentService = {
    async getMyAppointments(): Promise<Appointment[]> {
        const response = await api.get<Appointment[]>('/appointments/');
        return response.data;
    },

    async updateStatus(id: number, status: string): Promise<Appointment> {
        const response = await api.patch<Appointment>(`/appointments/${id}/update_status/`, { status });
        return response.data;
    }
};
