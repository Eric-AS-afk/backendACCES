// Controlador para SIE_CUENTA_BANCARIA
import * as cuentaService from './service.js';

export const getAllCuentas = async (req, res) => {
  try {
    const cuentas = await cuentaService.getAllCuentas();
    res.json(cuentas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCuentaById = async (req, res) => {
  try {
    const cuenta = await cuentaService.getCuentaById(req.params.id);
    if (!cuenta) return res.status(404).json({ error: 'No encontrado' });
    res.json(cuenta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCuenta = async (req, res) => {
  try {
    const id = await cuentaService.createCuenta(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCuenta = async (req, res) => {
  try {
    await cuentaService.updateCuenta(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCuenta = async (req, res) => {
  try {
    await cuentaService.deleteCuenta(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
