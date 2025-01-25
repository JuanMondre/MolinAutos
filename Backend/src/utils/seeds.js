import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model.js'; // Asegúrate de que la ruta sea correcta
import bcrypt from 'bcrypt';

dotenv.config();

// Conexión a la base de datos
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    seedUsers();
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  });

async function seedUsers() {
  try {
    // Usuarios iniciales
    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
      },
      {
        name: 'Test User 1',
        email: 'test1@example.com',
        password: await bcrypt.hash('test123', 10),
      },
      {
        name: 'Test User 2',
        email: 'test2@example.com',
        password: await bcrypt.hash('test123', 10),
      },
    ];

    // Limpiar la colección de usuarios
    await User.deleteMany();
    console.log('Colección de usuarios limpiada');

    // Insertar usuarios iniciales
    const createdUsers = await User.insertMany(users);
    console.log('Usuarios iniciales creados:', createdUsers);

    // Cerrar la conexión
    process.exit(0);
  } catch (error) {
    console.error('Error al cargar usuarios iniciales:', error);
    process.exit(1);
  }
}
