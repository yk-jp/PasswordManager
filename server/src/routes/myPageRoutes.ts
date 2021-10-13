import { Router } from 'express';
import { protectAuth } from '../middleware/authMiddleware';
import { mypage_get, logout_delete, account_delete, item_post, item_get } from '../controllers/routes/myPageControllers';

const router: Router = Router();

// get all item
router.get('/', protectAuth, mypage_get);

router.post('/', protectAuth, () => { });
// logout
router.delete('/logout', protectAuth, logout_delete);

// delete my account
router.delete('/account', protectAuth, account_delete);

// add new item
router.post('/account', protectAuth, item_post);

// get a particular item that user added.
router.get('/account/:id', protectAuth, item_get);


export default router;