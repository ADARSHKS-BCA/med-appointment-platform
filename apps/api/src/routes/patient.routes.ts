
import { Router } from 'express';
import * as PatientController from '../controllers/patient.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/me', PatientController.getMe);
router.patch('/me', PatientController.updateProfile);

export default router;
