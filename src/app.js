import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import errorHandler from './middlewares/errorHandler.js';
import logger from './utils/logger.js'; // Asegúrate de que este logger esté bien configurado

import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de manejo de errores
app.use(errorHandler);

// Rutas de usuarios
import userRouter from './routers/user.router.js';
app.use('/users', userRouter);

// Rutas de productos
import productRouter from './routers/product.router.js';
app.use('/products', productRouter);

// Carpeta public
app.use(express.static('public'));

//conexion a la base de datos
connectDB();

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en el puerto ${PORT}`); // Cambiado a console.log para pruebas
});
