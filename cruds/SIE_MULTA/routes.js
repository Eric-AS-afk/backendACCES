import { Router } from 'express';
import * as controller from './controller.js';

const multaRoutes = Router();

multaRoutes.get('/', controller.listAllMulta);
multaRoutes.get('/check-codigo', controller.checkCodigoMulta);
multaRoutes.get('/:id', controller.getMulta);
multaRoutes.post('/', controller.createMulta);
multaRoutes.put('/:id', controller.updateMulta);
multaRoutes.delete('/:id', controller.deleteMulta);

export default multaRoutes;
