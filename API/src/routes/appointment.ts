import { Router } from 'express'
import { createAppointment } from '../controllers/appointments';

const router = Router();

router.post('/', createAppointment)

export default router;