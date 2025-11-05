// Rutas para SIE_SERVICIO
import { Router } from 'express';
import * as servicioController from './controller.js';

const router = Router();

router.get('/', servicioController.getAllServicios);
router.get('/:id', servicioController.getServicioById);
router.post('/', servicioController.createServicio);
router.put('/:id', servicioController.updateServicio);
router.delete('/:id', servicioController.deleteServicio);

export default router;
