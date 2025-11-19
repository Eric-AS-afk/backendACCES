// Controlador para SIE_PAGO_MULTA
import * as service from './service.js';

export const listAllPagoMulta = async (req, res) => {
  try {
    const rows = await service.listAllPagoMulta();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getPagoMulta = async (req, res) => {
  try {
    const item = await service.getPagoMultaById(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const createPagoMulta = async (req, res) => {
  try {
    const id = await service.createPagoMulta(req.body || {});
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const updatePagoMulta = async (req, res) => {
  try {
    await service.updatePagoMulta(req.params.id, req.body || {});
    res.json({ success: true });
  } catch (err) {
    console.error('Error in updatePagoMulta. id=', req.params.id, 'body=', req.body, 'err=', err);
    res.status(500).json({ error: err.message });
  }
};

export const deletePagoMulta = async (req, res) => {
  try {
    await service.deletePagoMulta(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const checkBoletaPagoMulta = async (req, res) => {
  try {
    const boleta = req.query.boleta;
    if (!boleta) return res.json({ exists: false });
    const found = await service.getPagoMultaByBoleta(boleta);
    res.json({ exists: !!found, pago: found || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const uploadEvidenciaPagoMulta = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const filename = req.file.filename;
    await service.updatePagoMultaEvidencia(id, filename);
    res.json({ success: true, filename });
  } catch (err) {
    console.error('Error uploading evidencia for pago-multa:', err);
    res.status(500).json({ error: err.message });
  }
};
