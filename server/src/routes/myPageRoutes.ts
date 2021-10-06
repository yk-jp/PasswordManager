import { Router } from 'express';
import { protectAuth } from '../middleware/authMiddleware';
import { mypage_get, logout_delete, account_delete } from '../controllers/routes/myPageControllers';

const router: Router = Router();

router.get('/', protectAuth, mypage_get);
router.post('/', protectAuth, () => { });
// logout
router.delete('/logout', protectAuth, logout_delete);

// delete my account
router.delete('/account', protectAuth, account_delete);

export default router;