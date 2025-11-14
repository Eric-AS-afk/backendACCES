import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const getAllTiposExtra = async () => {
  const [rows] = await pool.query('SELECT * FROM sie_tipo_extra');
  return rows;
};

export const getTipoExtraById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM sie_tipo_extra WHERE TIE_TIPO = ?', [id]);
  return rows[0];
};
