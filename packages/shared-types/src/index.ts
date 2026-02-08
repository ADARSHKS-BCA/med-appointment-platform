import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["PATIENT", "DOCTOR"]),
    fullName: z.string().min(2),
});

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const DoctorProfileSchema = z.object({
    specialization: z.string(),
    experienceYears: z.number().min(0),
    consultationFee: z.number().min(0),
    bio: z.string().optional(),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type DoctorProfileInput = z.infer<typeof DoctorProfileSchema>;

export const AppointmentSchema = z.object({
    doctorId: z.string(),
    startTime: z.string(), // ISO string
    endTime: z.string(),   // ISO string
    reason: z.string(),
});

export type AppointmentInput = z.infer<typeof AppointmentSchema>;
