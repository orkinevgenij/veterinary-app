import express from 'express';
import {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  removeCategoryController,
} from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-category', protect, createCategoryController);
router.get('/get-category', getAllCategoryController);
router.put('/update-category/:cid', protect, updateCategoryController);
router.delete('/remove-category/:cid', protect, removeCategoryController);

export default router;
