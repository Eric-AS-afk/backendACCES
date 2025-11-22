import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Carpeta donde se guardarán las evidencias
const evidenciaDir = path.resolve('uploads/evidencias');
if (!fs.existsSync(evidenciaDir)) {
  fs.mkdirSync(evidenciaDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, evidenciaDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

export default upload;
