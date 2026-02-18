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

export const marcarExcesosPagados = async (req, res) => {
  try {
    const usuarioId = parseInt(req.body?.US_USUARIO, 10);
    const estado = (req.body?.EXC_ESTADO || 'Pagado').toString().trim() || 'Pagado';
    const idsRaw = Array.isArray(req.body?.EXC_IDS) ? req.body.EXC_IDS : [];
    const excesoIds = idsRaw
      .map((id) => parseInt(id, 10))
      .filter((id) => Number.isInteger(id) && id > 0);

    if (!Number.isInteger(usuarioId) || usuarioId <= 0) {
      return res.status(400).json({ error: 'US_USUARIO es obligatorio y debe ser numérico' });
    }

    if (excesoIds.length === 0) {
      return res.status(400).json({ error: 'EXC_IDS debe contener al menos un ID válido' });
    }

    const updated = await service.markExcesosPagados({
      US_USUARIO: usuarioId,
      EXC_IDS: excesoIds,
      EXC_ESTADO: estado,
    });

    res.json({ success: true, updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
