// config/multerConfig.js
import multer from 'multer';
import path from 'path';
import fs from "fs";
import { fileURLToPath } from 'url';

// Corrige __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir la carpeta de destino
const uploadPath = path.join(__dirname, "../public/img");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configurar el almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: {fileSize: 5 * 1024 * 1024 }, }).array('imagenes', 8);


// Configuración para subir múltiples imágenes
export const uploadMultiple = upload.array("imagenes", 8); // Permitir hasta 8 imágenes
export default upload;
