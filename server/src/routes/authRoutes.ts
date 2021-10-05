import { Router } from 'express';
import { login_post, login_get } from '../controllers/routes/LoginControllers';
import { signUp_post } from '../controllers/routes/signUpControllers';
import { token_get } from '../controllers/routes/tokenControllers';
import { protectAuth, protectAuthForRefresh } from '../middleware/authMiddleware';
const router: Router = Router();

// home page login
router.post('/', login_post);
router.get('/', protectAuth, login_get);

// signup
router.post('/signup', signUp_post);

// refresh token 
router.get('/token', protectAuthForRefresh, token_get);

export default router;