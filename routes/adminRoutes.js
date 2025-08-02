import express from 'express';
import {
  getAllOrdersCtrl,
  getAllUsersCtrl,
  getAllProductsCtrl,
  deleteUserCtrl,
  updateProductCtrl,deleteProductCtrl
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/orders', getAllOrdersCtrl);
router.get('/users', getAllUsersCtrl);
router.get('/products', getAllProductsCtrl);
router.delete('/users/:id', deleteUserCtrl);
router.put('/products/:id', updateProductCtrl);
router.delete('/products/:id', deleteProductCtrl);

export default router;
