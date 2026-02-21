import { Router } from 'express';
import * as DoctorController from '../controllers/doctor.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/', DoctorController.listDoctors);
router.get('/me', authenticateToken, DoctorController.getMe); // Must be before /:id
router.get('/:id', DoctorController.getDoctor);
router.patch('/me', authenticateToken, DoctorController.updateProfile);
router.post('/availability', authenticateToken, DoctorController.setAvailability);

export default router;
