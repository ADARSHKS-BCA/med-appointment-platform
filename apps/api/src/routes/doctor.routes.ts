
import { Router } from 'express';
import * as DoctorController from '../controllers/doctor.controller';

const router = Router();

router.get('/', DoctorController.listDoctors);
router.get('/me', DoctorController.getMe); // Must be before /:id
router.get('/:id', DoctorController.getDoctor);
router.patch('/me', DoctorController.updateProfile);
router.post('/availability', DoctorController.setAvailability);

export default router;
