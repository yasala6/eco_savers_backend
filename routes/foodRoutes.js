import express from 'express';
import { getSurplusFood } from '../controllers/foodController.js';

const router = express.Router();

router.get('/shop', getSurplusFood);

export default router;
