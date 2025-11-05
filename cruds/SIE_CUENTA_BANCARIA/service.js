// Servicio para SIE_CUENTA_BANCARIA
import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const getAllCuentas = async () => {
  const [rows] = await pool.query('SELECT * FROM SIE_CUENTA_BANCARIA');
  return rows;
};

export const getCuentaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM SIE_CUENTA_BANCARIA WHERE CUE_CUENTA = ?', [id]);
  return rows[0];
};

export const createCuenta = async (data) => {
  const { CUE_CUENTA, CUE_NUMERO, CUE_BANCO, CUE_TIPO, CUE_DUEÑO } = data;
  const [result] = await pool.query(
    'INSERT INTO SIE_CUENTA_BANCARIA (CUE_CUENTA, CUE_NUMERO, CUE_BANCO, CUE_TIPO, CUE_DUEÑO) VALUES (?, ?, ?, ?, ?)',
    [CUE_CUENTA, CUE_NUMERO, CUE_BANCO, CUE_TIPO, CUE_DUEÑO]
  );
  return result.insertId;
};

export const updateCuenta = async (id, data) => {
  const { CUE_NUMERO, CUE_BANCO, CUE_TIPO, CUE_DUEÑO } = data;
  await pool.query(
    'UPDATE SIE_CUENTA_BANCARIA SET CUE_NUMERO=?, CUE_BANCO=?, CUE_TIPO=?, CUE_DUEÑO=? WHERE CUE_CUENTA=?',
    [CUE_NUMERO, CUE_BANCO, CUE_TIPO, CUE_DUEÑO, id]
  );
};

export const deleteCuenta = async (id) => {
  await pool.query('DELETE FROM SIE_CUENTA_BANCARIA WHERE CUE_CUENTA = ?', [id]);
};
