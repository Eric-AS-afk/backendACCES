// Rutas para SIE_TIPO_PAGO
import { Router } from 'express';
import * as tipoController from './controller.js';

const router = Router();

router.get('/', tipoController.getAllTipos);
router.get('/:id', tipoController.getTipoById);
router.post('/', tipoController.createTipo);
router.put('/:id', tipoController.updateTipo);
router.delete('/:id', tipoController.deleteTipo);

export default router;
