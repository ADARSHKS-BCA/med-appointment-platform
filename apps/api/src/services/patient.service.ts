
import { prisma } from '@mediconnect/database';

export const getPatientById = async (id: string) => {
    return prisma.patient.findUnique({
        where: { userId: id },
        include: {
            user: {
                select: {
                    email: true,
                },
            },
        },
    });
};

export const updatePatientProfile = async (userId: string, data: any) => {
    return prisma.patient.update({
        where: { userId },
        data: {
            fullName: data.fullName,
            phone: data.phone,
            dob: data.dob ? new Date(data.dob) : undefined,
            gender: data.gender,
        }
    });
};
