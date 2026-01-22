

import React, { createContext, useContext, useState, useEffect } from "react";

type UserRole = "patient" | "doctor" | "admin";

interface User {
    id: string;
    name: string;
    role: UserRole;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (role: UserRole) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate checking local storage or session
        const storedUser = localStorage.getItem("clinic_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (role: UserRole) => {
        // Mock login based on role
        const mockUser: User = {
            id: "123",
            name: role === "doctor" ? "Dr. Smith" : role === "admin" ? "Admin User" : "John Doe",
            role: role,
            email: `${role}@clinic.com`,
        };
        setUser(mockUser);
        localStorage.setItem("clinic_user", JSON.stringify(mockUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("clinic_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
