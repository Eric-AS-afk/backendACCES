// Controlador para SIE_MULTA
import * as service from './service.js';

export const listAllMulta = async (req, res) => {
  try {
    const rows = await service.listAllMulta();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getMulta = async (req, res) => {
  try {
    const item = await service.getMultaById(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const createMulta = async (req, res) => {
  try {
    const id = await service.createMulta(req.body || {});
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const updateMulta = async (req, res) => {
  try {
    await service.updateMulta(req.params.id, req.body || {});
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteMulta = async (req, res) => {
  try {
    await service.deleteMulta(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const checkCodigoMulta = async (req, res) => {
  try {
    const codigo = req.query.codigo;
    if (!codigo) return res.json({ exists: false });
    const found = await service.getMultaByCodigo(codigo);
    res.json({ exists: !!found, multa: found || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
