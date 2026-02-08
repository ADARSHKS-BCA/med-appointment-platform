
import { Router } from 'express';
import * as AppointmentController from '../controllers/appointment.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken); // Protect all routes

router.post('/', AppointmentController.createAppointment);
router.get('/', AppointmentController.getAppointments);
router.patch('/:id/status', AppointmentController.updateStatus);

export default router;
