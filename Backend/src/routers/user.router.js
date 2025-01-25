import express from 'express';
import { param } from 'express-validator';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:userId', param('userId').isMongoId(), userController.getUserById);
router.delete('/:userId', param('userId').isMongoId(), userController.deleteUser);
router.post('/login', userController.login);


export default router;
