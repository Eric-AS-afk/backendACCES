import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const getAllRetiros = async (usuarioId = null) => {
  let query = `
    SELECT 
      r.RET_RETIRO,
      r.US_USUARIO,
      r.PRO_PROVEEDOR,
      r.RET_EVIDENCIA,
      r.RET_FECHA,
      r.RET_TOTAL,
      r.TIP_TIPO,
      u.US_NOMBRE,
      p.PRO_NOMBRE,
      tp.TIP_DESCRIPCION
    FROM sie_retiro r
    LEFT JOIN sie_usuario u ON r.US_USUARIO = u.US_USUARIO
    LEFT JOIN sie_proveedor p ON r.PRO_PROVEEDOR = p.PRO_PROVEEDOR
    LEFT JOIN sie_tipo_pago tp ON r.TIP_TIPO = tp.TIP_TIPO
  `;
  
  const params = [];
  if (usuarioId) {
    query += ' WHERE r.US_USUARIO = ?';
    params.push(usuarioId);
  }
  
  query += ' ORDER BY r.RET_RETIRO DESC';
  
  const [rows] = await pool.query(query, params);
  return rows;
};

export const getRetiroById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM sie_retiro WHERE RET_RETIRO = ?',
    [id]
  );
  return rows[0];
};

export const createRetiro = async (retiro) => {
  const { US_USUARIO, PRO_PROVEEDOR, RET_FECHA, RET_TOTAL, TIP_TIPO, RET_EVIDENCIA } = retiro;
  const [result] = await pool.query(
    'INSERT INTO sie_retiro (US_USUARIO, PRO_PROVEEDOR, RET_FECHA, RET_TOTAL, TIP_TIPO, RET_EVIDENCIA) VALUES (?, ?, ?, ?, ?, ?)',
    [US_USUARIO, PRO_PROVEEDOR, RET_FECHA, RET_TOTAL, TIP_TIPO, RET_EVIDENCIA || null]
  );
  return result.insertId;
};

export const updateRetiro = async (id, retiro) => {
  const { US_USUARIO, PRO_PROVEEDOR, RET_FECHA, RET_TOTAL, TIP_TIPO, RET_EVIDENCIA } = retiro;
  await pool.query(
    'UPDATE sie_retiro SET US_USUARIO = ?, PRO_PROVEEDOR = ?, RET_FECHA = ?, RET_TOTAL = ?, TIP_TIPO = ?, RET_EVIDENCIA = ? WHERE RET_RETIRO = ?',
    [US_USUARIO, PRO_PROVEEDOR, RET_FECHA, RET_TOTAL, TIP_TIPO, RET_EVIDENCIA || null, id]
  );
  return id;
};

export const deleteRetiro = async (id) => {
  await pool.query('DELETE FROM sie_retiro WHERE RET_RETIRO = ?', [id]);
  return id;
};

export const updateRetiroEvidencia = async (id, filename) => {
  await pool.query('UPDATE sie_retiro SET RET_EVIDENCIA = ? WHERE RET_RETIRO = ?', [filename, id]);
  return id;
};
