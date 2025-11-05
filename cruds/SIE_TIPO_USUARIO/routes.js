// Rutas para SIE_TIPO_USUARIO
import { Router } from 'express';
import * as tipoUsuarioController from './controller.js';

const router = Router();

router.get('/', tipoUsuarioController.getAllTiposUsuario);
router.get('/:id', tipoUsuarioController.getTipoUsuarioById);
router.post('/', tipoUsuarioController.createTipoUsuario);
router.put('/:id', tipoUsuarioController.updateTipoUsuario);
router.delete('/:id', tipoUsuarioController.deleteTipoUsuario);

export default router;
