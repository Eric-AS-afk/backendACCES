// Rutas para SIE_DETALLE_PAGO
import { Router } from 'express';
import * as detalleController from './controller.js';

const router = Router();

router.get('/', detalleController.getAllDetalles);
// Endpoint para obtener detalles/servicios de un pago
router.get('/por-pago/:pagoId', detalleController.getDetallesPorPago);
router.get('/:id', detalleController.getDetalleById);
router.post('/', detalleController.createDetalle);
router.put('/:id', detalleController.updateDetalle);
router.delete('/:id', detalleController.deleteDetalle);

export default router;
