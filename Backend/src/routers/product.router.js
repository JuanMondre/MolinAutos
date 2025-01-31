import express from 'express'; 
import productController from '../controllers/product.controller.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

// CRUD solo accesible para el admin autenticado
router.get('/', authenticate, productController.getAllProducts);
router.get('/:productId', authenticate, productController.getProductById);
router.post('/', authenticate, productController.createProduct);
router.put('/:productId', authenticate, productController.updateProduct); // Aquí podría estar el problema
router.delete('/:productId', authenticate, productController.deleteProduct);

// Dashboard admin (protegido)
router.get('/admin', authenticate, (req, res) => {
    res.send('Área de administración');
});

export default router;
