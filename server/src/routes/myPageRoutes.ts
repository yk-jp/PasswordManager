import { Router } from 'express';
import { protectAuth } from '../middleware/authMiddleware';
import { mypage_get } from '../controllers/routes/myPageControllers';
const router: Router = Router();

router.get('/', protectAuth, mypage_get);
router.post('/', protectAuth, () => { });

export default router;