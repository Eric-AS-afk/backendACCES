// Sube evidencia de pago y actualiza PAG_EVIDENCIA y DET_EVIDENCIA
export const uploadEvidenciaPago = async (req, res) => {
  const pagoId = req.params.id;
  if (!req.file) {
    return res.status(400).json({ error: 'Archivo de evidencia requerido' });
  }
  const evidenciaPath = req.file.filename; // Solo el nombre del archivo
  try {
    console.log('Actualizando evidencia para pago:', pagoId, 'Archivo:', evidenciaPath);
  // Actualizar PAG_EVIDENCIA en SIE_PAGO
  await pagoService.updatePagoEvidencia(pagoId, evidenciaPath);
  res.json({ success: true, evidencia: evidenciaPath });
  } catch (err) {
    console.error('Error al actualizar evidencia:', err);
    res.status(500).json({ error: err.message });
  }
};
export const getOrCreatePagoMensual = async (req, res) => {
  const { usuarioId, mes } = req.query;
  if (!usuarioId || !mes) {
    return res.status(400).json({ error: 'usuarioId y mes son requeridos' });
  }
  try {
    const result = await pagoService.getOrCreatePagoMensual(usuarioId, mes);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Controlador para SIE_PAGO
import * as pagoService from './service.js';

export const getAllPagos = async (req, res) => {
  try {
    const pagos = await pagoService.getAllPagos();
    res.json(pagos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPagoById = async (req, res) => {
  try {
    const pago = await pagoService.getPagoById(req.params.id);
    if (!pago) return res.status(404).json({ error: 'No encontrado' });
    res.json(pago);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPago = async (req, res) => {
  try {
    const id = await pagoService.createPago(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePago = async (req, res) => {
  try {
    await pagoService.updatePago(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePago = async (req, res) => {
  try {
    await pagoService.deletePago(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkPagoStatus = async (req, res) => {
  const { usuarioId, mes, anio } = req.query;
  console.log('checkPagoStatus - Params:', { usuarioId, mes, anio });
  if (!usuarioId || !mes || !anio) {
    return res.status(400).json({ error: 'usuarioId, mes y anio son requeridos' });
  }
  try {
    const pago = await pagoService.checkPagoByUsuarioMesAnio(usuarioId, mes, anio);
    console.log('checkPagoStatus - Resultado:', { exists: !!pago, pago });
    res.json({ exists: !!pago, pago });
  } catch (err) {
    console.error('checkPagoStatus - Error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getPagosByUsuario = async (req, res) => {
  const { usuarioId } = req.query;
  if (!usuarioId) return res.status(400).json({ error: 'usuarioId es requerido' });
  try {
    const pagos = await pagoService.getPagosByUsuario(usuarioId);
    res.json(pagos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPagosConUsuario = async (req, res) => {
  try {
    const pagos = await pagoService.getAllPagosConUsuario();
    res.json(pagos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
