
import { Request, Response } from 'express';
import * as PatientService from '../services/patient.service';

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const patient = await PatientService.getPatientById(user.userId);
        if (!patient) {
            return res.status(404).json({ error: 'Patient profile not found' });
        }
        res.json(patient);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const updatedPatient = await PatientService.updatePatientProfile(user.userId, req.body);
        res.json(updatedPatient);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
