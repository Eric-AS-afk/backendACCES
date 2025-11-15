import * as extraService from './service.js';

export const createExtra = async (req, res) => {
  try {
    const id = await extraService.createExtra(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllExtras = async (req, res) => {
  try {
    const usuarioId = req.query.usuarioId;
    let extras;
    if (usuarioId) {
      // Filtrar por usuario si se proporciona el parámetro
      extras = await extraService.getAllExtras();
      extras = extras.filter(e => e.US_USUARIO == usuarioId);
    } else {
      extras = await extraService.getAllExtras();
    }
    res.json(extras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getExtraById = async (req, res) => {
  try {
    const extra = await extraService.getExtraById(req.params.id);
    if (!extra) return res.status(404).json({ error: 'No encontrado' });
    res.json(extra);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateExtra = async (req, res) => {
  try {
    await extraService.updateExtra(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteExtra = async (req, res) => {
  try {
    await extraService.deleteExtra(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verifica si un número de boleta (EXT_CODIGO) ya fue registrado
export const checkExtraCodigo = async (req, res) => {
  const { codigo } = req.query;
  if (!codigo) return res.status(400).json({ error: 'codigo es requerido' });
  try {
    const extra = await extraService.checkExtraByCodigo(codigo);
    res.json({ exists: !!extra, extra });
  } catch (err) {
    console.error('checkExtraCodigo - Error:', err);
    res.status(500).json({ error: err.message });
  }
};