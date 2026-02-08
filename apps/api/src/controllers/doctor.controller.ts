
import { Request, Response } from 'express';
import * as DoctorService from '../services/doctor.service';

export const listDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await DoctorService.getAllDoctors();
        res.json(doctors);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getDoctor = async (req: Request, res: Response) => {
    try {
        const doctor = await DoctorService.getDoctorById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const updatedDoctor = await DoctorService.updateDoctorProfile(user.userId, req.body);
        res.json(updatedDoctor);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const doctor = await DoctorService.getDoctorById(user.userId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor profile not found' });
        }
        res.json(doctor);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const setAvailability = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const availabilities = await DoctorService.setDoctorAvailability(user.userId, req.body);
        res.json(availabilities);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
