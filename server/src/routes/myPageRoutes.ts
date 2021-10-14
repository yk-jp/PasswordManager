import { Router } from 'express';
import { protectAuth } from '../middleware/authMiddleware';
import { mypage_get, logout_delete, account_delete, item_post, item_get, item_delete, item_put } from '../controllers/routes/myPageControllers';

const router: Router = Router();

// get all item
router.get('/', protectAuth, mypage_get);

// logout
router.delete('/logout', protectAuth, logout_delete);

// delete user
router.delete('/user', protectAuth, account_delete);

// add new item
router.post('/account', protectAuth, item_post);

// delete an item
router.delete('/account/:id', protectAuth, item_delete);

// get a particular item that user added.
router.get('/account/:id', protectAuth, item_get);

// update a particular item
router.put('/account/:id', protectAuth, item_put);


export default router;