import express from 'express';
import { createOrderCtrl } from '../controllers/orderController.js';

const router = express.Router();

// POST /api/orders
router.post('/', createOrderCtrl);

export default router;
