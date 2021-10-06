import { Router } from 'express';
import { protectAuth } from '../middleware/authMiddleware';
import { mypage_get } from '../controllers/routes/myPageControllers';
import { logout_delete } from '../controllers/routes/logoutControllers';
const router: Router = Router();

router.get('/', protectAuth, mypage_get);
router.post('/', protectAuth, () => { });
// logout
router.delete('/logout', logout_delete);

export default router;