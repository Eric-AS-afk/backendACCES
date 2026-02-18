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

const normalizeExcesoEstado = (value, fallback = 'PENDIENTE') => {
  const text = String(value ?? '').trim().toLowerCase();
  if (!text) return fallback;
  if (text === 'pendiente') return 'PENDIENTE';
  if (text === 'pagado') return 'PAGADO';
  return fallback;
};

export const listAllExceso = async () => {
  const [rows] = await pool.query('SELECT * FROM sie_exceso ORDER BY EXC_EXCESO DESC');
  return rows;
};

export const getExcesoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM sie_exceso WHERE EXC_EXCESO = ?', [id]);
  return rows[0];
};

export const createExceso = async (data) => {
  const EXC_DESC = data?.EXC_DESC ?? data?.exc_desc ?? '';
  const US_USUARIO = data?.US_USUARIO ?? data?.us_usuario;
  const EXC_VALOR = data?.EXC_VALOR ?? data?.exc_valor ?? 0;
  const EXC_ESTADO = normalizeExcesoEstado(data?.EXC_ESTADO ?? data?.exc_estado ?? data?.estado, 'PENDIENTE');
  const [result] = await pool.query(
    'INSERT INTO sie_exceso (EXC_DESC, US_USUARIO, EXC_VALOR, EXC_ESTADO) VALUES (?, ?, ?, ?)',
    [EXC_DESC, US_USUARIO, EXC_VALOR, EXC_ESTADO]
  );
  return result.insertId;
};

export const updateExceso = async (id, data) => {
  const EXC_DESC = data?.EXC_DESC ?? data?.exc_desc ?? null;
  const US_USUARIO = data?.US_USUARIO ?? data?.us_usuario ?? null;
  const EXC_VALOR = data?.EXC_VALOR ?? data?.exc_valor ?? null;
  const EXC_ESTADO_RAW = data?.EXC_ESTADO ?? data?.exc_estado ?? data?.estado;
  const EXC_ESTADO = EXC_ESTADO_RAW == null
    ? null
    : normalizeExcesoEstado(EXC_ESTADO_RAW, 'PENDIENTE');

  await pool.query(
    `UPDATE sie_exceso
     SET EXC_DESC = COALESCE(?, EXC_DESC),
         US_USUARIO = COALESCE(?, US_USUARIO),
         EXC_VALOR = COALESCE(?, EXC_VALOR),
         EXC_ESTADO = COALESCE(?, EXC_ESTADO)
     WHERE EXC_EXCESO = ?`,
    [EXC_DESC, US_USUARIO, EXC_VALOR, EXC_ESTADO, id]
  );
};

export const deleteExceso = async (id) => {
  await pool.query('DELETE FROM sie_exceso WHERE EXC_EXCESO = ?', [id]);
};

export const markExcesosPagados = async ({ US_USUARIO, EXC_IDS, EXC_ESTADO = 'Pagado' }) => {
  const estadoNormalizado = normalizeExcesoEstado(EXC_ESTADO, 'PAGADO');
  const placeholders = EXC_IDS.map(() => '?').join(', ');
  const sql = `
    UPDATE sie_exceso
    SET EXC_ESTADO = ?
    WHERE US_USUARIO = ?
      AND EXC_EXCESO IN (${placeholders})
  `;

  const params = [estadoNormalizado, US_USUARIO, ...EXC_IDS];
  const [result] = await pool.query(sql, params);
  return result.affectedRows || 0;
};
