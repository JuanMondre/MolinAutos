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

const upload = multer({ storage });

// Exportación corregida
export default upload;