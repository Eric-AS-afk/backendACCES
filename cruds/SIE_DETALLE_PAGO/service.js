// ...existing code...
// Servicio para SIE_DETALLE_PAGO
import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const getAllDetalles = async () => {
  const [rows] = await pool.query('SELECT * FROM sie_detalle_pago');
  return rows;
};

export const getDetalleById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM sie_detalle_pago WHERE DET_DETALLE = ?', [id]);
  return rows[0];
};

export const createDetalle = async (data) => {
  const { PAG_PAGO, SER_SERVICIO, DET_FECHA_PAGO } = data;
  const [result] = await pool.query(
    'INSERT INTO sie_detalle_pago (PAG_PAGO, SER_SERVICIO, DET_FECHA_PAGO) VALUES (?, ?, ?)',
    [PAG_PAGO, SER_SERVICIO, DET_FECHA_PAGO]
  );
  return result.insertId;
};

export const updateDetalle = async (id, data) => {
  const { PAG_PAGO, SER_SERVICIO, DET_FECHA_PAGO } = data;
  await pool.query(
    'UPDATE sie_detalle_pago SET PAG_PAGO=?, SER_SERVICIO=?, DET_FECHA_PAGO=? WHERE DET_DETALLE=?',
    [PAG_PAGO, SER_SERVICIO, DET_FECHA_PAGO, id]
  );
};

export const deleteDetalle = async (id) => {
  await pool.query('DELETE FROM sie_detalle_pago WHERE DET_DETALLE = ?', [id]);
};
