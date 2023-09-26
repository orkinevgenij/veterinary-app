import express from 'express';
import {
  getProductController,
  createProductController,
  getProductsByCategoryController,
  getProductDetailsController,
  updateProductController,
  deleteProductsController,
  productFilterController,
  searchProductController,
  relatedProductController,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createProductController);
router.get('/', getProductController);
router.get('/product-details/:slug', getProductDetailsController);
router.get('/products-category/:slug', getProductsByCategoryController);
router.put('/product-update/:pid', protect, updateProductController);
router.delete('/product-delete/:pid', protect, deleteProductsController);
router.post('/product-filters', productFilterController);
router.get('/search-products/:keyword', searchProductController);
router.get('/related-product/:pid/:cid', relatedProductController);

export default router;
