import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const getAllProveedores = async () => {
  const [rows] = await pool.query(`
    SELECT 
      p.PRO_PROVEEDOR,
      p.PRO_NOMBRE,
      p.PRO_CUENTA,
      p.SER_SERVICIO,
      s.SER_NOMBRE
    FROM sie_proveedor p
    LEFT JOIN sie_servicio s ON p.SER_SERVICIO = s.SER_SERVICIO
    ORDER BY p.PRO_PROVEEDOR DESC
  `);
  return rows;
};

export const getProveedorById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM sie_proveedor WHERE PRO_PROVEEDOR = ?',
    [id]
  );
  return rows[0];
};

export const createProveedor = async (proveedor) => {
  const { PRO_NOMBRE, PRO_CUENTA, SER_SERVICIO } = proveedor;
  const [result] = await pool.query(
    'INSERT INTO sie_proveedor (PRO_NOMBRE, PRO_CUENTA, SER_SERVICIO) VALUES (?, ?, ?)',
    [PRO_NOMBRE, PRO_CUENTA, SER_SERVICIO]
  );
  return result.insertId;
};

export const updateProveedor = async (id, proveedor) => {
  const { PRO_NOMBRE, PRO_CUENTA, SER_SERVICIO } = proveedor;
  await pool.query(
    'UPDATE sie_proveedor SET PRO_NOMBRE = ?, PRO_CUENTA = ?, SER_SERVICIO = ? WHERE PRO_PROVEEDOR = ?',
    [PRO_NOMBRE, PRO_CUENTA, SER_SERVICIO, id]
  );
  return id;
};

export const deleteProveedor = async (id) => {
  await pool.query('DELETE FROM sie_proveedor WHERE PRO_PROVEEDOR = ?', [id]);
  return id;
};
