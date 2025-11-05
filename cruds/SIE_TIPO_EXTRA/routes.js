import express from 'express';
import * as tipoExtraController from './controller.js';

const router = express.Router();

router.get('/', tipoExtraController.getAllTiposExtra);
router.get('/:id', tipoExtraController.getTipoExtraById);

export default router;
