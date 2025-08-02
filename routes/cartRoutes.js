import express from 'express';
import { 
    getCartCtrl,
    addToCartCtrl,
    updateCartItemCtrl,
    removeFromCartCtrl,
    clearCartCtrl
} from '../controllers/cartController.js';
// import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
// router.use(authenticate);

router.get('/', getCartCtrl);
router.post('/add', addToCartCtrl);
router.put('/update', updateCartItemCtrl);
router.delete('/remove', removeFromCartCtrl);
router.delete('/clear', clearCartCtrl);

export default router;