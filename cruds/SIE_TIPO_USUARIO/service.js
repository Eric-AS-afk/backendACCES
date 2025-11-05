// Servicio para SIE_TIPO_USUARIO
import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const getAllTiposUsuario = async () => {
  const [rows] = await pool.query('SELECT * FROM SIE_TIPO_USUARIO');
  return rows;
};

export const getTipoUsuarioById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM SIE_TIPO_USUARIO WHERE TIP_TIPO_USUARIO = ?', [id]);
  return rows[0];
};

export const createTipoUsuario = async (data) => {
  const { TIP_TIPO_USUARIO, TIP_NOMBRE, TIP_DESCRIPCION } = data;
  const [result] = await pool.query(
    'INSERT INTO SIE_TIPO_USUARIO (TIP_TIPO_USUARIO, TIP_NOMBRE, TIP_DESCRIPCION) VALUES (?, ?, ?)',
    [TIP_TIPO_USUARIO, TIP_NOMBRE, TIP_DESCRIPCION]
  );
  return result.insertId;
};

export const updateTipoUsuario = async (id, data) => {
  const { TIP_NOMBRE, TIP_DESCRIPCION } = data;
  await pool.query(
    'UPDATE SIE_TIPO_USUARIO SET TIP_NOMBRE=?, TIP_DESCRIPCION=? WHERE TIP_TIPO_USUARIO=?',
    [TIP_NOMBRE, TIP_DESCRIPCION, id]
  );
};

export const deleteTipoUsuario = async (id) => {
  await pool.query('DELETE FROM SIE_TIPO_USUARIO WHERE TIP_TIPO_USUARIO = ?', [id]);
};
