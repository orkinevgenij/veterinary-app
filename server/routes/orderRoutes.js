import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createOrderController,
  getAllUserOrderController,
  getUserOrderController,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/create-order', protect, createOrderController);
router.get('/get-orders', protect, getUserOrderController);
router.get('/get-allorders', protect, getAllUserOrderController);

export default router;
