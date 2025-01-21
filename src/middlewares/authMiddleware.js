import jwt from 'jsonwebtoken';

const tokenSecret = process.env.TOKEN_SECRET;

export default function authenticate(req, res, next) {
    const token = req.header('auth-token'); // Obtén el token del encabezado de la solicitud
    if (!token) {
        return res.status(401).send('Acceso denegado. Token no proporcionado.');
    }

    try {
        const verified = jwt.verify(token, tokenSecret); // Verifica la validez del token
        req.usuario = verified; // Agrega la información del token al objeto `req`
        next(); // Continúa con el siguiente middleware o ruta
    } catch (err) {
        res.status(400).send('Token no válido.');
    }
}
