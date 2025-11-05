import multer from 'multer';
import path from 'path';
import fs from 'fs';

const evidenciaDir = path.join(process.cwd(), 'uploads', 'evidencias');
if (!fs.existsSync(evidenciaDir)) {
  fs.mkdirSync(evidenciaDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, evidenciaDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

export default upload;
