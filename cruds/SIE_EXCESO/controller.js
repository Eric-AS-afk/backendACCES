// Controlador para SIE_EXCESO
import * as service from './service.js';

export const listAllExceso = async (req, res) => {
  try {
    const rows = await service.listAllExceso();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getExceso = async (req, res) => {
  try {
    const item = await service.getExcesoById(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const createExceso = async (req, res) => {
  try {
    const id = await service.createExceso(req.body || {});
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateExceso = async (req, res) => {
  try {
    await service.updateExceso(req.params.id, req.body || {});
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteExceso = async (req, res) => {
  try {
    await service.deleteExceso(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
