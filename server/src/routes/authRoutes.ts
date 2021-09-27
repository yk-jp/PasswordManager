import { Router } from 'express';
import * as authControllers from '../controllers/routes/authControllers';

const router: Router = Router();

// home page
router.get('/', () => { });
router.post('/', authControllers.signIn_post);

// signup
router.post('/signup', authControllers.signUp_post);

export default router;