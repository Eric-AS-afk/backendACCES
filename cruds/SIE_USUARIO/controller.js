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

import { sendResetPasswordEmail } from '../../utils/mailer.js';
import crypto from 'crypto';
import { FRONTEND_URL } from '../../config.js';

export const forgotPassword = async (req, res) => {
  const { identifier } = req.body;
  if (!identifier) return res.status(400).json({ error: 'identifier required' });
  try {
    const usuario = await usuarioService.getUsuarioByIdentifier(identifier);
    if (!usuario || !usuario.US_CORREO) {
      // Do not reveal whether user exists
      return res.json({ ok: true });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    await usuarioService.setResetToken(usuario.US_USUARIO, token, expires);

    // try to send email; sendResetPasswordEmail returns {ok, info}
    const result = await sendResetPasswordEmail(usuario.US_CORREO, usuario.US_NOMBRE, token);
    if (result.ok) {
      return res.json({ ok: true });
    }
    // If mailer not configured, still return ok but include info for debugging
    return res.json({ ok: true, info: result.info });
  } catch (err) {
    console.error('forgotPassword error:', err);
    res.status(500).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return res.status(400).json({ error: 'token and newPassword required' });
  try {
    const usuario = await usuarioService.getUsuarioByResetToken(token);
    if (!usuario || !usuario.US_RESET_EXPIRES) return res.status(400).json({ error: 'invalid token' });
    const expires = new Date(usuario.US_RESET_EXPIRES);
    if (expires < new Date()) return res.status(400).json({ error: 'token expired' });

    await usuarioService.updatePasswordByUserId(usuario.US_USUARIO, newPassword);
    await usuarioService.clearResetToken(usuario.US_USUARIO);
    res.json({ ok: true });
  } catch (err) {
    console.error('resetPassword error:', err);
    res.status(500).json({ error: err.message });
  }
};