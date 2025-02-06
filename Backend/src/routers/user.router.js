import express from 'express';
import { param } from 'express-validator';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// Rutas de usuarios
router.get('/', userController.getAllUsers); // Obtener todos los usuarios
router.get('/:userId', param('userId').isMongoId(), userController.getUserById); // Obtener un usuario por ID
router.delete('/:userId', param('userId').isMongoId(), userController.deleteUser); // Eliminar un usuario por ID
router.post('/login', userController.login); // Iniciar sesión
//router.post('/register', userController.register);

export default router;
