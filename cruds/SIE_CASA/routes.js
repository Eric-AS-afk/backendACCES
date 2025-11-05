// Rutas para SIE_CASA
import { Router } from 'express';
import * as casaController from './controller.js';

const router = Router();

router.get('/', casaController.getAllCasas);
router.get('/:id', casaController.getCasaById);
router.post('/', casaController.createCasa);
router.put('/:id', casaController.updateCasa);
router.delete('/:id', casaController.deleteCasa);

export default router;
