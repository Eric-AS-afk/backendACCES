import { Router } from 'express';
import * as controller from './controller.js';
import upload from './upload.js';

const pagoMultaRoutes = Router();

pagoMultaRoutes.get('/', controller.listAllPagoMulta);
pagoMultaRoutes.get('/check-boleta', controller.checkBoletaPagoMulta);
pagoMultaRoutes.get('/:id', controller.getPagoMulta);
pagoMultaRoutes.post('/', controller.createPagoMulta);
pagoMultaRoutes.put('/:id', controller.updatePagoMulta);
pagoMultaRoutes.delete('/:id', controller.deletePagoMulta);

// Endpoint para subir evidencia (multipart/form-data) y guardar filename en PAM_EVIDENCIA
pagoMultaRoutes.post('/evidencia/:id', upload.single('evidencia'), controller.uploadEvidenciaPagoMulta);

export default pagoMultaRoutes;
