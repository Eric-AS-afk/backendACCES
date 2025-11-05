
import express from 'express';
import * as extraController from './controller.js';
import upload from './upload.js';

const router = express.Router();

router.get('/', extraController.getAllExtras);
router.get('/:id', extraController.getExtraById);
router.post('/', extraController.createExtra);
router.post('/upload', upload.single('evidencia'), (req, res) => {
	if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
	res.json({ filename: req.file.filename });
});
router.put('/:id', extraController.updateExtra);
router.delete('/:id', extraController.deleteExtra);

export default router;
