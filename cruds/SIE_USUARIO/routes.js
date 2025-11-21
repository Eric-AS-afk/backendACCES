// Rutas para SIE_USUARIO
import { Router } from 'express';
import * as usuarioController from './controller.js';

const router = Router();

router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);
router.post('/login', usuarioController.loginUsuario);
router.post('/forgot-password', usuarioController.forgotPassword);
router.post('/reset-password', usuarioController.resetPassword);

export default router;
