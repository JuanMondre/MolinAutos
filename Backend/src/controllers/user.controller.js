import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

// Función para obtener todos los usuarios
export async function getAllUsers(req, res) {
    try {
        const users = await User.find(); // Suponiendo que quieres obtener todos los usuarios
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Función para obtener un usuario por ID
export async function getUserById(req, res) {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

/*

export async function register(req, res) {
    const { username, password } = req.body;
    
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado con éxito', user });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
*/


// Función para eliminar un usuario
export async function deleteUser(req, res) {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Función para iniciar sesión
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.header('auth-token', token).json({ token, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error); 
        res.status(500).json({ message: 'Error en el servidor' });
    }
}


// Exporta todas las funciones
export default {
    getAllUsers,
    getUserById,
    //register,
    deleteUser,
    login,
};
