import { Router } from 'express';
import * as authControllers from '../controllers/routes/authControllers';
import { protectAuthForRefresh } from '../middleware/authMiddleware';
const router: Router = Router();

// home page login
router.post('/', authControllers.signIn_post);

// signup
router.post('/signup', authControllers.signUp_post);

// refresh token 
router.post('/token', protectAuthForRefresh, authControllers.token_post);

export default router;