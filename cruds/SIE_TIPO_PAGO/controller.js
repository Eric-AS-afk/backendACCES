// Controlador para SIE_TIPO_PAGO
import * as tipoService from './service.js';

export const getAllTipos = async (req, res) => {
  try {
    const tipos = await tipoService.getAllTipos();
    res.json(tipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTipoById = async (req, res) => {
  try {
    const tipo = await tipoService.getTipoById(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'No encontrado' });
    res.json(tipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTipo = async (req, res) => {
  try {
    const id = await tipoService.createTipo(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTipo = async (req, res) => {
  try {
    await tipoService.updateTipo(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTipo = async (req, res) => {
  try {
    await tipoService.deleteTipo(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
