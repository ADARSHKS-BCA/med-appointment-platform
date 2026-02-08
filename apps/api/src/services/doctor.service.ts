
import { prisma, Prisma } from '@mediconnect/database';

export const getAllDoctors = async () => {
    return prisma.doctor.findMany({
        include: {
            user: {
                select: {
                    email: true,
                },
            },
            availabilities: true,
        },
    });
};

export const getDoctorById = async (id: string) => {
    return prisma.doctor.findUnique({
        where: { userId: id },
        include: {
            user: {
                select: {
                    email: true,
                },
            },
            availabilities: true,
        },
    });
};

export const updateDoctorProfile = async (userId: string, data: any) => {
    return prisma.doctor.update({
        where: { userId },
        data: {
            fullName: data.fullName,
            specialization: data.specialization,
            bio: data.bio,
            experienceYears: Number(data.experienceYears),
            consultationFee: Number(data.consultationFee),
            phone: data.phone,
        }
    });
};

export const setDoctorAvailability = async (userId: string, availabilities: any[]) => {
    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) throw new Error('Doctor profile not found');

    // Transaction to replace all availabilities
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await tx.availability.deleteMany({
            where: { doctorId: doctor.id }
        });

        if (availabilities.length > 0) {
            await tx.availability.createMany({
                data: availabilities.map((a: any) => ({
                    doctorId: doctor.id,
                    dayOfWeek: a.dayOfWeek,
                    startTime: new Date(`1970-01-01T${a.startTime}:00Z`), // Store as time
                    endTime: new Date(`1970-01-01T${a.endTime}:00Z`),
                    slotDuration: 30 // Default 30 min
                }))
            });
        }

        return tx.availability.findMany({ where: { doctorId: doctor.id } });
    });
};
