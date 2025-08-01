import express from 'express';
import {
  getCartCtrl,
  addToCartCtrl,
  updateCartItemCtrl,
  removeFromCartCtrl,
  clearCartCtrl
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getCartCtrl);
router.post('/add', addToCartCtrl);
router.put('/update', updateCartItemCtrl);
router.delete('/remove', removeFromCartCtrl);
router.delete('/clear', clearCartCtrl);

export default router;
