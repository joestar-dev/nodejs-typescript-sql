import { Router } from 'express'
import { createAppointment } from '../controllers/appointments';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.post('/', verifyToken, createAppointment)

export default router;