
import { Request, Response } from 'express';
import * as AppointmentService from '../services/appointment.service';

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        if (user.role !== 'PATIENT') {
            return res.status(403).json({ error: `Access Denied: Only patients can book appointments. Your current role is '${user.role}'. Please register a new Patient account.` });
        }

        const appointment = await AppointmentService.createAppointment({
            ...req.body,
            userId: user.userId
        });
        res.status(201).json(appointment);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        let appointments;

        if (user.role === 'PATIENT') {
            appointments = await AppointmentService.getAppointmentsForPatient(user.userId);
        } else if (user.role === 'DOCTOR') {
            appointments = await AppointmentService.getAppointmentsForDoctor(user.userId);
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        res.json(appointments);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const user = (req as any).user;

        console.log(`[updateStatus] Request: ID=${id}, Status=${status}, User=${user.userId}, Role=${user.role}`);

        if (!['CONFIRMED', 'CANCELLED'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const updatedAppointment = await AppointmentService.updateAppointmentStatus(id, status, user.userId, user.role);
        console.log('[updateStatus] Success');
        res.json(updatedAppointment);
    } catch (error: any) {
        console.error('[updateStatus] Error:', error);
        res.status(400).json({ error: error.message });
    }
};
