import api from '@/lib/api';

export interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: 'PATIENT' | 'DOCTOR';
    phone?: string;
    profile_picture?: string;
}

export interface AuthResponse {
    user: User;
    tokens: {
        access: string;
        refresh: string;
    };
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name: string;
    last_name: string;
    role: 'PATIENT' | 'DOCTOR';
}

export interface LoginData {
    username: string;
    password: string;
}

export const authService = {
    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register/', data);
        return response.data;
    },

    async login(data: LoginData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login/', data);
        return response.data;
    },

    async logout(refreshToken: string): Promise<void> {
        await api.post('/auth/logout/', { refresh_token: refreshToken });
    },

    async getProfile(): Promise<User> {
        const response = await api.get<User>('/auth/profile/');
        return response.data;
    },
};
