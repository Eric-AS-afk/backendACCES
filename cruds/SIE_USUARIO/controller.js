// Controlador para SIE_USUARIO
import * as usuarioService from './service.js';

export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'No encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const id = await usuarioService.createUsuario(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    await usuarioService.updateUsuario(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    await usuarioService.deleteUsuario(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUsuario = async (req, res) => {
  const { US_NOMBRE, US_CONTRASEÑA } = req.body;
  try {
    const usuario = await usuarioService.getUsuarioByNombreYContrasena(US_NOMBRE, US_CONTRASEÑA);
    if (usuario) {
      res.json({ success: true, usuario });
    } else {
      res.json({ success: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
