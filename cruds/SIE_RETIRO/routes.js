import express from 'express';
import { getAllRetiros, getRetiroById, createRetiro, updateRetiro, deleteRetiro, uploadEvidenciaRetiro } from './controller.js';
import upload from './upload.js';
const router = express.Router();

router.get('/', getAllRetiros);
router.get('/:id', getRetiroById);
router.post('/', createRetiro);
router.put('/:id', updateRetiro);
router.delete('/:id', deleteRetiro);

// Upload evidencia for a retiro (multipart form-data, field name 'evidencia')
router.post('/evidencia/:id', upload.single('evidencia'), uploadEvidenciaRetiro);

export default router;
