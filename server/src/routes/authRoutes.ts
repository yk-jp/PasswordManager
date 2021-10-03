import { Router } from 'express';
import * as authControllers from '../controllers/routes/authControllers';

const router: Router = Router();

// home page login
router.post('/', authControllers.signIn_post);

// signup
router.post('/signup', authControllers.signUp_post);

// token
router.post('/token', authControllers.token_post);

export default router;