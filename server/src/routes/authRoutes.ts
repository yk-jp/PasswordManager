import { Router } from 'express';
import * as authControllers from '../controllers/authControllers';

const router: Router = Router();


// home page
router.get('/', () => { });

// mypage
router.get('/mypage', () => { });
router.post('/mypage', () => { });

// signup
router.post('/signup', authControllers.signUp_post);

export default router;