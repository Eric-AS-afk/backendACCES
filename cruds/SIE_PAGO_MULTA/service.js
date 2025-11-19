// Servicio para SIE_PAGO_MULTA
import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const listAllPagoMulta = async () => {
  const [rows] = await pool.query(
    `SELECT pm.*, m.MUL_NOMBRE, m.MUL_CODIGO, u.US_NOMBRE
     FROM sie_pago_multa pm
     LEFT JOIN sie_multa m ON pm.MUL_MULTA = m.MUL_MULTA
     LEFT JOIN sie_usuario u ON pm.US_USUARIO = u.US_USUARIO
     ORDER BY pm.pam_pago_multa DESC`
  );
  return rows;
};

export const getPagoMultaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM sie_pago_multa WHERE pam_pago_multa = ?', [id]);
  return rows[0];
};

export const createPagoMulta = async (data) => {
  const { MUL_MULTA, US_USUARIO, PAM_VALOR, TIP_TIPO, PAM_BOLETA, PAM_EVIDENCIA, PAM_ESTADO } = data;
  // Coerce PAM_BOLETA to integer (remove non-digits). If invalid, store NULL.
  let boletaNum = null;
  if (PAM_BOLETA !== undefined && PAM_BOLETA !== null && String(PAM_BOLETA).trim() !== '') {
    const cleaned = String(PAM_BOLETA).replace(/\D+/g, '');
    const parsed = parseInt(cleaned, 10);
    if (!Number.isNaN(parsed) && Number.isSafeInteger(parsed)) boletaNum = parsed;
  }

  const [result] = await pool.query(
    'INSERT INTO sie_pago_multa (MUL_MULTA, US_USUARIO, PAM_VALOR, TIP_TIPO, PAM_BOLETA, PAM_EVIDENCIA, PAM_ESTADO) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [MUL_MULTA, US_USUARIO, PAM_VALOR, TIP_TIPO, boletaNum, PAM_EVIDENCIA, PAM_ESTADO]
  );
  return result.insertId;
};

export const updatePagoMulta = async (id, data) => {
  const { MUL_MULTA, US_USUARIO, PAM_VALOR, TIP_TIPO, PAM_BOLETA, PAM_EVIDENCIA, PAM_ESTADO } = data;
  // Coerce PAM_BOLETA to integer (remove non-digits). If invalid, store NULL.
  let boletaNum = null;
  if (PAM_BOLETA !== undefined && PAM_BOLETA !== null && String(PAM_BOLETA).trim() !== '') {
    const cleaned = String(PAM_BOLETA).replace(/\D+/g, '');
    const parsed = parseInt(cleaned, 10);
    if (!Number.isNaN(parsed) && Number.isSafeInteger(parsed)) boletaNum = parsed;
  }

  await pool.query(
    'UPDATE sie_pago_multa SET MUL_MULTA = ?, US_USUARIO = ?, PAM_VALOR = ?, TIP_TIPO = ?, PAM_BOLETA = ?, PAM_EVIDENCIA = ?, PAM_ESTADO = ?, PAM_FECHA = NOW() WHERE pam_pago_multa = ?',
    [MUL_MULTA, US_USUARIO, PAM_VALOR, TIP_TIPO, boletaNum, PAM_EVIDENCIA, PAM_ESTADO, id]
  );
};

export const deletePagoMulta = async (id) => {
  await pool.query('DELETE FROM sie_pago_multa WHERE pam_pago_multa = ?', [id]);
};

export const getPagoMultaByBoleta = async (boleta) => {
  const [rows] = await pool.query('SELECT * FROM sie_pago_multa WHERE PAM_BOLETA = ?', [boleta]);
  return rows[0];
};

export const updatePagoMultaEvidencia = async (id, filename) => {
  await pool.query('UPDATE sie_pago_multa SET PAM_EVIDENCIA = ? WHERE pam_pago_multa = ?', [filename, id]);
};
