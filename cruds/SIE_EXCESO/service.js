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

const normalizePositiveInt = (value, fallback = null) => {
  const parsed = parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) return fallback;
  return parsed;
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
  const EXC_MES = normalizePositiveInt(data?.EXC_MES ?? data?.exc_mes ?? data?.mes, new Date().getMonth() + 1);
  const EXC_AÑO = normalizePositiveInt(data?.EXC_AÑO ?? data?.EXC_ANIO ?? data?.exc_año ?? data?.exc_anio ?? data?.anio ?? data?.año, new Date().getFullYear());
  const [result] = await pool.query(
    'INSERT INTO sie_exceso (EXC_DESC, US_USUARIO, EXC_VALOR, EXC_MES, `EXC_AÑO`) VALUES (?, ?, ?, ?, ?)',
    [EXC_DESC, US_USUARIO, EXC_VALOR, EXC_MES, EXC_AÑO]
  );
  return result.insertId;
};

export const updateExceso = async (id, data) => {
  const EXC_DESC = data?.EXC_DESC ?? data?.exc_desc ?? null;
  const US_USUARIO = data?.US_USUARIO ?? data?.us_usuario ?? null;
  const EXC_VALOR = data?.EXC_VALOR ?? data?.exc_valor ?? null;
  const EXC_MES_RAW = data?.EXC_MES ?? data?.exc_mes ?? data?.mes;
  const EXC_AÑO_RAW = data?.EXC_AÑO ?? data?.EXC_ANIO ?? data?.exc_año ?? data?.exc_anio ?? data?.anio ?? data?.año;
  const EXC_MES = EXC_MES_RAW == null ? null : normalizePositiveInt(EXC_MES_RAW, null);
  const EXC_AÑO = EXC_AÑO_RAW == null ? null : normalizePositiveInt(EXC_AÑO_RAW, null);

  await pool.query(
    `UPDATE sie_exceso
     SET EXC_DESC = COALESCE(?, EXC_DESC),
         US_USUARIO = COALESCE(?, US_USUARIO),
         EXC_VALOR = COALESCE(?, EXC_VALOR),
         EXC_MES = COALESCE(?, EXC_MES),
         \`EXC_AÑO\` = COALESCE(?, \`EXC_AÑO\`)
     WHERE EXC_EXCESO = ?`,
    [EXC_DESC, US_USUARIO, EXC_VALOR, EXC_MES, EXC_AÑO, id]
  );
};

export const deleteExceso = async (id) => {
  await pool.query('DELETE FROM sie_exceso WHERE EXC_EXCESO = ?', [id]);
};
