// Controlador para SIE_TIPO_USUARIO
import * as tipoUsuarioService from './service.js';

export const getAllTiposUsuario = async (req, res) => {
  try {
    const tipos = await tipoUsuarioService.getAllTiposUsuario();
    res.json(tipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTipoUsuarioById = async (req, res) => {
  try {
    const tipo = await tipoUsuarioService.getTipoUsuarioById(req.params.id);
    if (!tipo) return res.status(404).json({ error: 'No encontrado' });
    res.json(tipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTipoUsuario = async (req, res) => {
  try {
    const id = await tipoUsuarioService.createTipoUsuario(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTipoUsuario = async (req, res) => {
  try {
    await tipoUsuarioService.updateTipoUsuario(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTipoUsuario = async (req, res) => {
  try {
    await tipoUsuarioService.deleteTipoUsuario(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
