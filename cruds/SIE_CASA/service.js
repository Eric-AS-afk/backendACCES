// Servicio para SIE_CASA
import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const getAllCasas = async () => {
  const [rows] = await pool.query('SELECT * FROM sie_casa');
  return rows;
};

export const getCasaById = async (id) => {
  console.log("Service getCasaById with id:", id, "type:", typeof id);
  const [rows] = await pool.query('SELECT * FROM sie_casa WHERE CAS_CASA = ?', [id]);
  console.log("Query result rows:", rows);
  return rows[0];
};

export const createCasa = async (data) => {
  const { CAS_CASA, CAS_CODIGO, CAS_NUMERO, CAS_CALLE, CAS_AVENIDA } = data;
  const [result] = await pool.query(
    'INSERT INTO sie_casa (CAS_CASA, CAS_CODIGO, CAS_NUMERO, CAS_CALLE, CAS_AVENIDA) VALUES (?, ?, ?, ?, ?)',
    [CAS_CASA, CAS_CODIGO, CAS_NUMERO, CAS_CALLE, CAS_AVENIDA]
  );
  return result.insertId;
};

export const updateCasa = async (id, data) => {
  const { CAS_CODIGO, CAS_NUMERO, CAS_CALLE, CAS_AVENIDA } = data;
  await pool.query(
    'UPDATE sie_casa SET CAS_CODIGO=?, CAS_NUMERO=?, CAS_CALLE=?, CAS_AVENIDA=? WHERE CAS_CASA=?',
    [CAS_CODIGO, CAS_NUMERO, CAS_CALLE, CAS_AVENIDA, id]
  );
};

export const deleteCasa = async (id) => {
  await pool.query('DELETE FROM sie_casa WHERE CAS_CASA = ?', [id]);
};
