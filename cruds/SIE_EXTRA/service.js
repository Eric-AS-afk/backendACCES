import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const createExtra = async (data) => {
  const { EXT_CODIGO, US_USUARIO, EXT_FECHA, TIE_TIPO, EXT_TOTAL, EXT_EVIDENCIA, TIP_TIPO, EXT_FECHA_EVENTO } = data;
  const [result] = await pool.query(
    'INSERT INTO sie_extra (EXT_CODIGO, US_USUARIO, EXT_FECHA, TIE_TIPO, EXT_TOTAL, EXT_EVIDENCIA, TIP_TIPO, EXT_FECHA_EVENTO) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [EXT_CODIGO, US_USUARIO, EXT_FECHA, TIE_TIPO, EXT_TOTAL, EXT_EVIDENCIA, TIP_TIPO, EXT_FECHA_EVENTO || null]
  );
  return result.insertId;
};

export const getAllExtras = async () => {
  const [rows] = await pool.query(`
    SELECT e.*, t.TIE_NOMBRE, t.TIE_DESCRIPCION, u.US_NOMBRE, tp.TIP_DESCRIPCION
    FROM sie_extra e
    LEFT JOIN sie_tipo_extra t ON e.TIE_TIPO = t.TIE_TIPO
    LEFT JOIN sie_usuario u ON e.US_USUARIO = u.US_USUARIO
    LEFT JOIN sie_tipo_pago tp ON e.TIP_TIPO = tp.TIP_TIPO
  `);
  return rows;
};

export const getExtraById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM sie_extra WHERE EXT_EXTRA = ?', [id]);
  return rows[0];
};

export const updateExtra = async (id, data) => {
  const { EXT_CODIGO, US_USUARIO, EXT_FECHA, TIE_TIPO, EXT_TOTAL, EXT_EVIDENCIA, TIP_TIPO, EXT_FECHA_EVENTO } = data;
  await pool.query(
    'UPDATE sie_extra SET EXT_CODIGO=?, US_USUARIO=?, EXT_FECHA=?, TIE_TIPO=?, EXT_TOTAL=?, EXT_EVIDENCIA=?, TIP_TIPO=?, EXT_FECHA_EVENTO=? WHERE EXT_EXTRA=?',
    [EXT_CODIGO, US_USUARIO, EXT_FECHA, TIE_TIPO, EXT_TOTAL, EXT_EVIDENCIA, TIP_TIPO, EXT_FECHA_EVENTO || null, id]
  );
};

export const deleteExtra = async (id) => {
  await pool.query('DELETE FROM sie_extra WHERE EXT_EXTRA = ?', [id]);
};
