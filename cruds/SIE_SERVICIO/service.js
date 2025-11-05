// Servicio para SIE_SERVICIO
import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const getAllServicios = async () => {
  const [rows] = await pool.query('SELECT * FROM SIE_SERVICIO');
  return rows;
};

export const getServicioById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM SIE_SERVICIO WHERE SER_SERVICIO = ?', [id]);
  return rows[0];
};

export const createServicio = async (data) => {
  const { SER_SERVICIO, SER_NOMBRE, SER_DESCRIPCION, SER_COSTO } = data;
  const [result] = await pool.query(
    'INSERT INTO SIE_SERVICIO (SER_SERVICIO, SER_NOMBRE, SER_DESCRIPCION, SER_COSTO) VALUES (?, ?, ?, ?)',
    [SER_SERVICIO, SER_NOMBRE, SER_DESCRIPCION, SER_COSTO]
  );
  return result.insertId;
};

export const updateServicio = async (id, data) => {
  const { SER_NOMBRE, SER_DESCRIPCION, SER_COSTO } = data;
  await pool.query(
    'UPDATE SIE_SERVICIO SET SER_NOMBRE=?, SER_DESCRIPCION=?, SER_COSTO=? WHERE SER_SERVICIO=?',
    [SER_NOMBRE, SER_DESCRIPCION, SER_COSTO, id]
  );
};

export const deleteServicio = async (id) => {
  await pool.query('DELETE FROM SIE_SERVICIO WHERE SER_SERVICIO = ?', [id]);
};
