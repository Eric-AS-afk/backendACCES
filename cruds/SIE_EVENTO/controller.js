import { getAllEventos as svcGetAll, getEventosByExtra as svcGetByExtra, getEventoById as svcGetById, createEvento as svcCreate, deleteEvento as svcDelete } from './service.js';

export const getAllEventos = async (req, res) => {
  try {
    const { extId } = req.query;
    if (extId) {
      const rows = await svcGetByExtra(extId);
      return res.json(rows);
    }
    const rows = await svcGetAll();
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener eventos:', err);
    res.status(500).json({ error: 'Error al obtener eventos' });
  }
};

export const getEventoById = async (req, res) => {
  try {
    const row = await svcGetById(req.params.id);
    if (!row) return res.status(404).json({ error: 'No encontrado' });
    res.json(row);
  } catch (err) {
    console.error('Error al obtener evento:', err);
    res.status(500).json({ error: 'Error al obtener evento' });
  }
};

export const createEvento = async (req, res) => {
  try {
    const id = await svcCreate(req.body);
    res.status(201).json({ EVE_EVENTO: id });
  } catch (err) {
    console.error('Error al crear evento:', err);
    res.status(500).json({ error: 'Error al crear evento' });
  }
};

export const deleteEvento = async (req, res) => {
  try {
    await svcDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al eliminar evento:', err);
    res.status(500).json({ error: 'Error al eliminar evento' });
  }
};
