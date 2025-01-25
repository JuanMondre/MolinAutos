import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next) {
    const token = req.header('auth-token'); // Obtén el token del encabezado
    if (!token) {
        console.log('Encabezados recibidos:', req.headers); // Depurar encabezados
        return res.status(401).send('Acceso denegado. Token no proporcionado.');
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET); // Verifica la validez del token
        req.usuario = verified; // Agrega la información del token al objeto `req`
        next(); // Continúa con el siguiente middleware o ruta
    } catch (err) {
        console.error('Error al verificar el token:', err.message); // Depurar errores
        res.status(400).send('Token no válido.');
    }
}
