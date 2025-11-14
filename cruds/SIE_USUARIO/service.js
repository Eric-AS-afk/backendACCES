export const getUsuarioByNombreYContrasena = async (nombre, contrasena) => {
  const [rows] = await pool.query(
    `SELECT u.*, t.TIP_NOMBRE as TIP_NOMBRE, t.TIP_DESCRIPCION as TIP_DESCRIPCION
     FROM sie_usuario u
     JOIN sie_tipo_usuario t ON u.TIP_TIPO_USUARIO = t.TIP_TIPO_USUARIO
     WHERE u.US_NOMBRE = ? AND u.US_CONTRASEÑA = ?`,
    [nombre, contrasena]
  );
  return rows[0];
};
// Servicio para SIE_USUARIO
import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const getAllUsuarios = async () => {
  const [rows] = await pool.query('SELECT * FROM sie_usuario');
  return rows;
};

export const getUsuarioById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM sie_usuario WHERE US_USUARIO = ?', [id]);
  return rows[0];
};

export const createUsuario = async (data) => {
  const { US_USUARIO, US_NOMBRE, US_CONTRASEÑA, TIP_TIPO_USUARIO, CAS_CASA, US_TELEFONO, US_CORREO } = data;
  const [result] = await pool.query(
    'INSERT INTO sie_usuario (US_USUARIO, US_NOMBRE, US_CONTRASEÑA, TIP_TIPO_USUARIO, CAS_CASA, US_TELEFONO, US_CORREO) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [US_USUARIO, US_NOMBRE, US_CONTRASEÑA, TIP_TIPO_USUARIO, CAS_CASA, US_TELEFONO, US_CORREO]
  );
  return result.insertId;
};

export const updateUsuario = async (id, data) => {
  const { US_NOMBRE, US_CONTRASEÑA, TIP_TIPO_USUARIO, CAS_CASA, US_TELEFONO, US_CORREO } = data;
  await pool.query(
    'UPDATE sie_usuario SET US_NOMBRE=?, US_CONTRASEÑA=?, TIP_TIPO_USUARIO=?, CAS_CASA=?, US_TELEFONO=?, US_CORREO=? WHERE US_USUARIO=?',
    [US_NOMBRE, US_CONTRASEÑA, TIP_TIPO_USUARIO, CAS_CASA, US_TELEFONO, US_CORREO, id]
  );
};

export const deleteUsuario = async (id) => {
  await pool.query('DELETE FROM sie_usuario WHERE US_USUARIO = ?', [id]);
};
