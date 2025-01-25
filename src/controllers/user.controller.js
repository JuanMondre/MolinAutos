import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';


export async function login(req, res) {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
          return res.status(400).json({ message: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

      // Enviar token al cliente
      res.header('auth-token', token).json({ token, message: 'Inicio de sesión exitoso' });
  } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error en el servidor' });
  }
}


export async function getAllUsers(req, res) {
  try {
    const users = await User.find({}, '-password'); // Excluir contraseñas
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.userId, '-password'); // Excluir contraseñas
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
}

export default {
  getAllUsers,
  getUserById,
  deleteUser,
  login,
};
