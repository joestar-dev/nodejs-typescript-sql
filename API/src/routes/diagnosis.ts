import { Router } from 'express'
import { createDiagnosis, getDiagnosisForUser, updateDiagnosis } from '../controllers/diagnosis';
import { verifyToken } from '../middlewares/verify-token';

const router = Router();

router.post('/', verifyToken, createDiagnosis);
router.put('/:id', verifyToken, updateDiagnosis);
router.post('/user', getDiagnosisForUser); 

export default router;