import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const getAllEventos = async () => {
  const [rows] = await pool.query(`
    SELECT e.EVE_EVENTO, e.EXT_EXTRA, e.EVE_FECHA, x.TIE_TIPO
    FROM SIE_EVENTO e
    LEFT JOIN SIE_EXTRA x ON e.EXT_EXTRA = x.EXT_EXTRA
    ORDER BY e.EVE_FECHA DESC, e.EVE_EVENTO DESC
  `);
  return rows;
};

export const getEventosByExtra = async (extId) => {
  const [rows] = await pool.query(
    `SELECT e.EVE_EVENTO, e.EXT_EXTRA, e.EVE_FECHA, x.TIE_TIPO
     FROM SIE_EVENTO e
     LEFT JOIN SIE_EXTRA x ON e.EXT_EXTRA = x.EXT_EXTRA
     WHERE e.EXT_EXTRA = ?
     ORDER BY e.EVE_FECHA DESC, e.EVE_EVENTO DESC`,
    [extId]
  );
  return rows;
};

export const getEventoById = async (id) => {
  const [rows] = await pool.query(
    'SELECT e.EVE_EVENTO, e.EXT_EXTRA, e.EVE_FECHA FROM SIE_EVENTO e WHERE e.EVE_EVENTO = ?',
    [id]
  );
  return rows[0];
};

export const createEvento = async ({ EXT_EXTRA, EVE_FECHA }) => {
  const [result] = await pool.query(
    'INSERT INTO SIE_EVENTO (EXT_EXTRA, EVE_FECHA) VALUES (?, ?)',
    [EXT_EXTRA, EVE_FECHA]
  );
  return result.insertId;
};

export const deleteEvento = async (id) => {
  await pool.query('DELETE FROM SIE_EVENTO WHERE EVE_EVENTO = ?', [id]);
  return id;
};
