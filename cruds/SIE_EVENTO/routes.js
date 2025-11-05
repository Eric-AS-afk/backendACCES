import express from 'express';
import { getAllEventos, getEventoById, createEvento, deleteEvento } from './controller.js';
const router = express.Router();

router.get('/', getAllEventos);
router.get('/:id', getEventoById);
router.post('/', createEvento);
router.delete('/:id', deleteEvento);

export default router;
