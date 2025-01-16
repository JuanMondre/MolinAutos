import express from 'express';
import productController from '../controllers/product.controller.js';

const router = express.Router();

// Rutas de productos
router.get('/', productController.getAllProducts);
router.get('/:productId', productController.getProductById);
router.post('/', productController.createProduct);
router.delete('/:productId', productController.deleteProduct);

export default router;
