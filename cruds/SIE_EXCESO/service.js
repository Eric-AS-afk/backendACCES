// Servicio para SIE_EXCESO
import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const listAllExceso = async () => {
  const [rows] = await pool.query('SELECT * FROM sie_exceso ORDER BY EXC_EXCESO DESC');
  return rows;
};

export const getExcesoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM sie_exceso WHERE EXC_EXCESO = ?', [id]);
  return rows[0];
};

export const createExceso = async (data) => {
  const { EXC_DESC, US_USUARIO, EXC_VALOR } = data;
  const [result] = await pool.query(
    'INSERT INTO sie_exceso (EXC_DESC, US_USUARIO, EXC_VALOR) VALUES (?, ?, ?)',
    [EXC_DESC, US_USUARIO, EXC_VALOR]
  );
  return result.insertId;
};

export const updateExceso = async (id, data) => {
  const { EXC_DESC, US_USUARIO, EXC_VALOR } = data;
  await pool.query(
    'UPDATE sie_exceso SET EXC_DESC = ?, US_USUARIO = ?, EXC_VALOR = ? WHERE EXC_EXCESO = ?',
    [EXC_DESC, US_USUARIO, EXC_VALOR, id]
  );
};

export const deleteExceso = async (id) => {
  await pool.query('DELETE FROM sie_exceso WHERE EXC_EXCESO = ?', [id]);
};
