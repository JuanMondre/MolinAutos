import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import logger from '../utils/logger.js'

// URL de conexión a MongoDB
const DB_URI = process.env.MONGO_URI;

// Función para conectar a la base de datos
async function connectDB() {
  try {
    await mongoose.connect(DB_URI);
    logger.info('Conexión a la base de datos exitosa');
  } catch (error) {
    logger.error('Error al conectar a la base de datos:', error.message);
    process.exit(1); // Detener la aplicación si no puede conectar a la base de datos
  }
}

export default connectDB;
