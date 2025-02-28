// middlewares/convertHEICtoJPG.js

/*
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrige __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const convertHEICtoJPG = async (req, res, next) => {
  if (req.files) {
    await Promise.all(req.files.map(async (file) => {
      if (file.mimetype === 'image/heic') {
        const outputFileName = `${Date.now()}-${file.originalname.replace(/\.heic$/, '.jpg')}`;
        const outputPath = path.join(__dirname, '../public/img', outputFileName);

        await sharp(file.buffer)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(outputPath);
        // Reemplazar el archivo original con la ruta del nuevo archivo JPG
        file.path = outputPath;
        file.filename = outputFileName;
      } else {
        // Guardar el archivo original en la ruta deseada
        const outputPath = path.join(__dirname, '../public/img', Date.now() + '-' + file.originalname);
        await sharp(file.buffer)
          .toFile(outputPath);
        file.path = outputPath;
      }
    }));
  }
  next();
};

export default convertHEICtoJPG;

*/