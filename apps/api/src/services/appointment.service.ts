
import { prisma } from '@mediconnect/database';
import { AppointmentInput } from '@mediconnect/shared-types';

export const createAppointment = async (data: AppointmentInput & { userId: string }) => {
    const patient = await prisma.patient.findUnique({
        where: { userId: data.userId }
    });

    if (!patient) {
        throw new Error('Patient profile not found. Please complete your profile.');
    }

    return prisma.appointment.create({
        data: {
            patientId: patient.id,
            doctorId: data.doctorId,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
            status: 'REQUESTED',
            reason: data.reason
        },
        include: {
            doctor: {
                include: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            },
            patient: {
                include: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            }
        }
    });
};

export const getAppointmentsForPatient = async (userId: string) => {
    return prisma.appointment.findMany({
        where: {
            patient: {
                userId: userId
            }
        },
        include: {
            doctor: {
                include: {
                    user: {
                        select: { email: true }
                    }
                }
            }
        },
        orderBy: { startTime: 'desc' }
    });
};

export const getAppointmentsForDoctor = async (userId: string) => {
    return prisma.appointment.findMany({
        where: {
            doctor: {
                userId: userId
            }
        },
        include: {
            patient: {
                include: {
                    user: {
                        select: { email: true }
                    }
                }
            }
        },
        orderBy: { startTime: 'desc' }
    });
};

export const updateAppointmentStatus = async (appointmentId: string, status: 'CONFIRMED' | 'CANCELLED', userId: string, role: string) => {
    console.log(`[Service] updateAppointmentStatus: ID=${appointmentId}, Status=${status}, User=${userId}, Role=${role}`);

    const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: {
            doctor: true,
            patient: true
        }
    });

    if (!appointment) {
        throw new Error('Appointment not found');
    }

    // Authorization Logic
    if (role === 'DOCTOR') {
        console.log('[Service] Processing as DOCTOR');
        if (!appointment.doctor) {
            console.error('[Service] Error: Doctor profile missing in appointment');
            throw new Error('Appointment data corrupted: Doctor profile missing');
        }
        // Verify the doctor owns this appointment
        // appointment.doctor.userId is the User ID associated with the doctor profile
        if (appointment.doctor.userId !== userId) {
            console.error(`[Service] Unauthorized: Doctor ${appointment.doctor.userId} !== User ${userId}`);
            throw new Error('Unauthorized: You can only update your own appointments');
        }
        // Doctors can Confirm or Cancel
    } else if (role === 'PATIENT') {
        console.log('[Service] Processing as PATIENT');
        if (!appointment.patient) {
            throw new Error('Appointment data corrupted: Patient profile missing');
        }
        if (appointment.patient.userId !== userId) {
            throw new Error('Unauthorized: You can only update your own appointments');
        }
        if (status !== 'CANCELLED') {
            throw new Error('Patients can only cancel appointments');
        }
    } else {
        console.error(`[Service] Unauthorized role: ${role}`);
        throw new Error('Unauthorized role');
    }

    return prisma.appointment.update({
        where: { id: appointmentId },
        data: { status }
    });
};
