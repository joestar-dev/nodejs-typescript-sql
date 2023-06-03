import { Router } from 'express'
import { createAppointment } from '../Controllers/appointments';

const router = Router();

router.post('/', createAppointment)

export default router;