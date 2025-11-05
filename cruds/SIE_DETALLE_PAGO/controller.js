
import * as detalleService from './service.js';
import * as pagoService from '../SIE_PAGO/service.js';

// Devuelve los detalles/servicios de un pago específico, asegurando existencia
export const getDetallesPorPago = async (req, res) => {
  try {
    const pagoId = req.params.pagoId;
    // Buscar el pago para obtener usuario y mes
    const pago = await pagoService.getPagoById(pagoId);
    if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
    // Ejecutar getOrCreatePagoMensual para asegurar existencia
    await pagoService.getOrCreatePagoMensual(pago.US_USUARIO, pago.PAG_MES);
    // Ahora sí, devolver los detalles
    const detalles = await detalleService.getDetallesPorPago(pagoId);
    res.json(detalles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllDetalles = async (req, res) => {
  try {
    const detalles = await detalleService.getAllDetalles();
    res.json(detalles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDetalleById = async (req, res) => {
  try {
    const detalle = await detalleService.getDetalleById(req.params.id);
    if (!detalle) return res.status(404).json({ error: 'No encontrado' });
    res.json(detalle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createDetalle = async (req, res) => {
  try {
    const id = await detalleService.createDetalle(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateDetalle = async (req, res) => {
  try {
    await detalleService.updateDetalle(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteDetalle = async (req, res) => {
  try {
    await detalleService.deleteDetalle(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
