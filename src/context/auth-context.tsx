import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, User, LoginData, RegisterData } from "@/lib/services/auth";

interface AuthContextType {
    user: User | null;
    login: (data: LoginData) => Promise<User>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const userData = await authService.getProfile();
                    setUser(userData);
                } catch (err) {
                    console.error("Failed to load user profile", err);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = async (data: LoginData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login(data);
            localStorage.setItem('access_token', response.tokens.access);
            localStorage.setItem('refresh_token', response.tokens.refresh);
            setUser(response.user);
            return response.user;
        } catch (err: any) {
            console.error("Login failed", err);
            setError(err.response?.data?.error || "Login failed. Please check your credentials.");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.register(data);
            localStorage.setItem('access_token', response.tokens.access);
            localStorage.setItem('refresh_token', response.tokens.refresh);
            setUser(response.user);
        } catch (err: any) {
            console.error("Registration failed", err);
            let errorMessage = "Registration failed. Please try again.";

            if (err.response?.data) {
                // If backend returns { error: "message" }
                if (err.response.data.error) {
                    errorMessage = err.response.data.error;
                }
                // If backend returns DRF field errors { field: ["error"] }
                else if (typeof err.response.data === 'object') {
                    const messages = Object.entries(err.response.data)
                        .map(([field, msgs]) => {
                            if (Array.isArray(msgs)) {
                                return `${field}: ${msgs.join(' ')}`;
                            }
                            return `${field}: ${msgs}`;
                        })
                        .join('\n');
                    if (messages) errorMessage = messages;
                }
            }

            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await authService.logout(refreshToken);
            }
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
