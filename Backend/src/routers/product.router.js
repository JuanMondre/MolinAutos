import express from 'express'; 
import {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
} from '../controllers/product.controller.js';
import authenticate from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rutas públicas para obtener productos
router.get('/', getAllProducts); // Acceso público
router.get('/:productId', getProductById); // Acceso público

// Rutas protegidas para CRUD de productos (solo admin)
router.post('/', authenticate, createProduct);
router.put('/:productId', authenticate, updateProduct);
router.delete('/:productId', authenticate, deleteProduct);

// Dashboard admin (protegido)
router.get('/admin', authenticate, (req, res) => {
    res.send('Área de administración');
});

export default router;
