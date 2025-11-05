// Controlador para SIE_CASA
import * as casaService from './service.js';

export const getAllCasas = async (req, res) => {
  try {
    const casas = await casaService.getAllCasas();
    res.json(casas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCasaById = async (req, res) => {
  try {
    console.log("getCasaById called with ID:", req.params.id);
    const casa = await casaService.getCasaById(req.params.id);
    console.log("Casa found:", casa);
    if (!casa) return res.status(404).json({ error: 'No encontrado' });
    res.json(casa);
  } catch (err) {
    console.error("Error in getCasaById:", err);
    res.status(500).json({ error: err.message });
  }
};

export const createCasa = async (req, res) => {
  try {
    const id = await casaService.createCasa(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCasa = async (req, res) => {
  try {
    await casaService.updateCasa(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCasa = async (req, res) => {
  try {
    await casaService.deleteCasa(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
