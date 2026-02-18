import { Router } from 'express';
import * as controller from './controller.js';

const excesoRoutes = Router();

excesoRoutes.get('/', controller.listAllExceso);
excesoRoutes.get('/:id', controller.getExceso);
excesoRoutes.post('/', controller.createExceso);
excesoRoutes.post('/marcar-pagados', controller.marcarExcesosPagados);
excesoRoutes.put('/:id', controller.updateExceso);
excesoRoutes.delete('/:id', controller.deleteExceso);

export default excesoRoutes;
