// ...existing code...
// Servicio para SIE_PAGO

import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';
import { updateDetalleEvidenciaByPago } from './detalle-evidencia-service.js';
// Reexportar para uso en el controlador
export { updateDetalleEvidenciaByPago };

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const getAllPagos = async () => {
  const [rows] = await pool.query('SELECT * FROM sie_pago');
  return rows;
};

export const getPagoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM sie_pago WHERE PAG_PAGO = ?', [id]);
  return rows[0];
};


export const createPago = async (data) => {
  const { PAG_CODIGO, US_USUARIO, PAG_MES, PAG_AÑO, PAG_TOTAL, CUE_CUENTA, TIP_TIPO, PAG_EVIDENCIA, PAG_fecha } = data;
  const [result] = await pool.query(
    'INSERT INTO sie_pago (PAG_CODIGO, US_USUARIO, PAG_MES, PAG_AÑO, PAG_TOTAL, CUE_CUENTA, TIP_TIPO, PAG_EVIDENCIA, PAG_fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [PAG_CODIGO, US_USUARIO, PAG_MES, PAG_AÑO, PAG_TOTAL, CUE_CUENTA, TIP_TIPO, PAG_EVIDENCIA, PAG_fecha]
  );
  return result.insertId;
};

export const updatePago = async (id, data) => {
  const { PAG_PAGO, PAG_CODIGO, US_USUARIO, PAG_MES, PAG_AÑO, PAG_TOTAL, CUE_CUENTA, PAG_EVIDENCIA, TIP_TIPO, PAG_fecha } = data;
  await pool.query(
    'UPDATE sie_pago SET PAG_CODIGO=?, US_USUARIO=?, PAG_MES=?, PAG_AÑO=?, PAG_TOTAL=?, CUE_CUENTA=?, PAG_EVIDENCIA=?, TIP_TIPO=?, PAG_fecha=? WHERE PAG_PAGO=?',
    [PAG_CODIGO, US_USUARIO, PAG_MES, PAG_AÑO, PAG_TOTAL, CUE_CUENTA, PAG_EVIDENCIA, TIP_TIPO, PAG_fecha, id]
  );
};

// Actualiza solo la evidencia del pago (evita requerir todos los campos)
export const updatePagoEvidencia = async (id, evidenciaFilename) => {
  await pool.query(
    'UPDATE sie_pago SET PAG_EVIDENCIA=? WHERE PAG_PAGO=?',
    [evidenciaFilename, id]
  );
};

export const deletePago = async (id) => {
  await pool.query('DELETE FROM sie_pago WHERE PAG_PAGO = ?', [id]);
};

export const checkPagoByUsuarioMesAnio = async (usuarioId, mes, anio) => {
  const [rows] = await pool.query(
    'SELECT * FROM sie_pago WHERE US_USUARIO = ? AND PAG_MES = ? AND PAG_AÑO = ?',
    [usuarioId, mes, anio]
  );
  return rows[0] || null;
};

// Obtiene todos los pagos de un usuario
export const getPagosByUsuario = async (usuarioId) => {
  const [rows] = await pool.query(
    'SELECT * FROM sie_pago WHERE US_USUARIO = ? ORDER BY PAG_AÑO DESC, CAST(PAG_MES AS UNSIGNED) DESC',
    [usuarioId]
  );
  return rows;
};

// Obtiene todos los pagos con nombre de usuario y número de casa
export const getAllPagosConUsuario = async () => {
  const [rows] = await pool.query(
    `SELECT p.*, u.US_NOMBRE, c.CAS_NUMERO
     FROM sie_pago p
     JOIN sie_usuario u ON u.US_USUARIO = p.US_USUARIO
     LEFT JOIN sie_casa c ON c.CAS_CASA = u.CAS_CASA
     ORDER BY p.PAG_AÑO DESC, CAST(p.PAG_MES AS UNSIGNED) DESC`
  );
  return rows;
};
