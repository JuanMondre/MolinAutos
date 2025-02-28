// config/multerConfig.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrige __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar el almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/img'); // Asegúrate de que esta carpeta exista
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage, limits: {fileSize: 5 * 1024 * 1024 }, });


// Configuración para subir múltiples imágenes
export const uploadMultiple = upload.array("imagenes", 2); // Permitir hasta 5 imágenes

export default upload;
