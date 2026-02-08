import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma, User, Role } from '@mediconnect/database';
import { RegisterInput, LoginInput } from '@mediconnect/shared-types';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const registerUser = async (input: RegisterInput) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
    });

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: {
            email: input.email,
            passwordHash: hashedPassword,
            role: input.role as Role,
            // Create associated profile based on role
            patientProfile: input.role === 'PATIENT' ? {
                create: { fullName: input.fullName }
            } : undefined,
            doctorProfile: input.role === 'DOCTOR' ? {
                create: {
                    fullName: input.fullName,
                    specialization: 'General', // Default, updated later
                    licenseNumber: 'PENDING-' + Date.now(), // Placeholder
                }
            } : undefined,
        },
    });

    return { id: user.id, email: user.email, role: user.role };
};

export const loginUser = async (input: LoginInput) => {
    const user = await prisma.user.findUnique({
        where: { email: input.email },
    });

    if (!user || !user.isActive) {
        throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(input.password, user.passwordHash);
    if (!validPassword) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { sub: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { sub: user.id },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    return { user: { id: user.id, email: user.email, role: user.role }, token, refreshToken };
};
