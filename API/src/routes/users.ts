import { Router } from 'express'
import { getUsers, signIn, signUp } from '../Controllers/users';

const router = Router();

router.get('/', getUsers);
router.post('/signin', signIn)
router.post('/signup', signUp)

export default router;