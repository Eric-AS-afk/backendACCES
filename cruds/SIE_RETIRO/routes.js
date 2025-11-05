import express from 'express';
import { getAllRetiros, getRetiroById, createRetiro, updateRetiro, deleteRetiro } from './controller.js';
const router = express.Router();

router.get('/', getAllRetiros);
router.get('/:id', getRetiroById);
router.post('/', createRetiro);
router.put('/:id', updateRetiro);
router.delete('/:id', deleteRetiro);

export default router;
