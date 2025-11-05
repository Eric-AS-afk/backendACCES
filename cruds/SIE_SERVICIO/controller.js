// Controlador para SIE_SERVICIO
import * as servicioService from './service.js';

export const getAllServicios = async (req, res) => {
  try {
    const servicios = await servicioService.getAllServicios();
    res.json(servicios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getServicioById = async (req, res) => {
  try {
    const servicio = await servicioService.getServicioById(req.params.id);
    if (!servicio) return res.status(404).json({ error: 'No encontrado' });
    res.json(servicio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createServicio = async (req, res) => {
  try {
    const id = await servicioService.createServicio(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateServicio = async (req, res) => {
  try {
    await servicioService.updateServicio(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteServicio = async (req, res) => {
  try {
    await servicioService.deleteServicio(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
