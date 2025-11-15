
// Rutas para SIE_PAGO

import { Router } from 'express';
import * as pagoController from './controller.js';
import upload from './upload.js';

const router = Router();

router.get('/', pagoController.getAllPagos);
router.get('/check-status', pagoController.checkPagoStatus);
router.get('/check-codigo', pagoController.checkPagoCodigo);
router.get('/por-usuario', pagoController.getPagosByUsuario);
router.get('/todos-con-usuario', pagoController.getAllPagosConUsuario);
router.get('/:id', pagoController.getPagoById);
router.post('/', pagoController.createPago);
router.put('/:id', pagoController.updatePago);

router.get('/mensual', pagoController.getOrCreatePagoMensual);

// Endpoint para subir evidencia de pago (archivo)
router.post('/evidencia/:id', upload.single('evidencia'), pagoController.uploadEvidenciaPago);
router.delete('/:id', pagoController.deletePago);

export default router;
