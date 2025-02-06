import express from 'express';
import session from 'express-session';
import passport from './config/passport-config.js';
import dotenv from 'dotenv';
dotenv.config();
import errorHandler from './middlewares/errorHandler.js';
import logger from './utils/logger.js'; // Asegúrate de que este logger esté bien configurado
import authenticate from './middlewares/authMiddleware.js';
import connectDB from './config/db.js';
import path from 'path'; 
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Uso en tu middleware
const sessionSecret = process.env.SESSION_SECRET;

//Configuracion del middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: sessionSecret, // Cambia esto por una cadena secreta segura
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto según el dominio del frontend
  credentials: true, // Permitir cookies o sesiones si usas passport
}));

// Middleware de manejo de errores
app.use(errorHandler);

// Rutas de usuarios
import userRouter from './routers/user.router.js';
app.use('/api/users', userRouter);


// Rutas de productos
import productRouter from './routers/product.router.js';
app.use('/api/products', productRouter);

// Carpeta public
app.use(express.static('public'));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html')); // Usa path.join para construir la ruta
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard', // Redirige al área de administración si el inicio de sesión es exitoso
  failureRedirect: '/', // Redirige al login si falla
}));


// Rutas protegidas
app.get('/admin', authenticate, (req, res) => {
  res.sendFile('./public/admin.html'); // Cambia esto por la ruta a tu archivo HTML de administración
});

//conexion a la base de datos
connectDB();

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en el puerto ${PORT}`); // Cambiado a console.log para pruebas
});
