// Rutas para SIE_CUENTA_BANCARIA
import { Router } from 'express';
import * as cuentaController from './controller.js';

const router = Router();

router.get('/', cuentaController.getAllCuentas);
router.get('/:id', cuentaController.getCuentaById);
router.post('/', cuentaController.createCuenta);
router.put('/:id', cuentaController.updateCuenta);
router.delete('/:id', cuentaController.deleteCuenta);

export default router;
