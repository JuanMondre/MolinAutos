import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Buscar en 'Authorization: Bearer token'
    
    if (!token) {
        console.log('Encabezados recibidos:', req.headers); // Depuración
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET); // Verifica el token
        req.usuario = verified; // Guarda la info del usuario en req
        next(); // Continúa con la solicitud
    } catch (err) {
        console.error('Error al verificar el token:', err.message);
        res.status(400).json({ message: 'Token no válido.' });
    }
}
