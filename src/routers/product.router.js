import express from 'express'; 
import productController from '../controllers/product.controller.js';
import authenticate from '../middlewares/authMiddleware.js'; // Importa el middleware

const router = express.Router();

// Rutas de productos
router.get('/', authenticate, productController.getAllProducts);
router.get('/:productId', authenticate, productController.getProductById);
router.post('/', authenticate, productController.createProduct);
router.delete('/:productId', authenticate, productController.deleteProduct);

// Ruta de administración
router.get('/admin', authenticate, (req, res) => {
    res.send('Área de administración');
});

export default router;
