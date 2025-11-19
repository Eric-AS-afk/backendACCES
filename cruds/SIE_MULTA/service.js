// Servicio para SIE_MULTA
import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const listAllMulta = async () => {
  const [rows] = await pool.query('SELECT * FROM sie_multa ORDER BY MUL_NOMBRE');
  return rows;
};

export const getMultaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM sie_multa WHERE MUL_MULTA = ?', [id]);
  return rows[0];
};

export const createMulta = async (data) => {
  const { MUL_CODIGO, MUL_NOMBRE, MUL_DESCRIPCION } = data;
  const [result] = await pool.query(
    'INSERT INTO sie_multa (MUL_CODIGO, MUL_NOMBRE, MUL_DESCRIPCION) VALUES (?, ?, ?)',
    [MUL_CODIGO, MUL_NOMBRE, MUL_DESCRIPCION]
  );
  return result.insertId;
};

export const updateMulta = async (id, data) => {
  const { MUL_CODIGO, MUL_NOMBRE, MUL_DESCRIPCION } = data;
  await pool.query(
    'UPDATE sie_multa SET MUL_CODIGO = ?, MUL_NOMBRE = ?, MUL_DESCRIPCION = ? WHERE MUL_MULTA = ?',
    [MUL_CODIGO, MUL_NOMBRE, MUL_DESCRIPCION, id]
  );
};

export const deleteMulta = async (id) => {
  await pool.query('DELETE FROM sie_multa WHERE MUL_MULTA = ?', [id]);
};

export const getMultaByCodigo = async (codigo) => {
  const [rows] = await pool.query('SELECT * FROM sie_multa WHERE MUL_CODIGO = ?', [codigo]);
  return rows[0];
};
