import api from '@/lib/api';


export interface Clinic {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    email: string;
}

export interface Doctor {
    id: number;
    user: {
        first_name: string;
        last_name: string;
        profile_picture?: string;
    };
    specialization: {
        name: string;
    };
    clinic: Clinic;
    consultation_fees: string;
    experience_years: number;
    rating?: number; // Added for frontend compatibility, though not in backend model yet
    location?: string; // Derived from clinic
}

export const doctorService = {
    async getAllDoctors(): Promise<Doctor[]> {
        const response = await api.get<any>('/doctors/');
        // Check if response has pagination (results array) or if it's a direct array
        if (response.data && Array.isArray(response.data.results)) {
            return response.data.results;
        } else if (Array.isArray(response.data)) {
            return response.data;
        }
        return [];
    },

    async getDoctorById(id: string): Promise<Doctor> {
        const response = await api.get<Doctor>(`/doctors/${id}/`);
        return response.data;
    }
};
