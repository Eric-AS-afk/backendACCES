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
    SELECT e.EVE_EVENTO, e.EXT_EXTRA, e.EVE_FECHA, e.EVE_HORA, x.TIE_TIPO
    FROM sie_evento e
    LEFT JOIN sie_extra x ON e.EXT_EXTRA = x.EXT_EXTRA
    ORDER BY e.EVE_FECHA DESC, e.EVE_EVENTO DESC
  `);
  return rows;
};

export const getEventosByExtra = async (extId) => {
  const [rows] = await pool.query(
    `SELECT e.EVE_EVENTO, e.EXT_EXTRA, e.EVE_FECHA, e.EVE_HORA, x.TIE_TIPO
     FROM sie_evento e
     LEFT JOIN sie_extra x ON e.EXT_EXTRA = x.EXT_EXTRA
     WHERE e.EXT_EXTRA = ?
     ORDER BY e.EVE_FECHA DESC, e.EVE_EVENTO DESC`,
    [extId]
  );
  return rows;
};

export const getEventoById = async (id) => {
  const [rows] = await pool.query(
    'SELECT e.EVE_EVENTO, e.EXT_EXTRA, e.EVE_FECHA, e.EVE_HORA FROM sie_evento e WHERE e.EVE_EVENTO = ?',
    [id]
  );
  return rows[0];
};

export const createEvento = async ({ EXT_EXTRA, EVE_FECHA, EVE_HORA }) => {
  // Check for collisions: if time provided, require same date+time to be free; otherwise check date-only
  if (EVE_FECHA) {
    if (EVE_HORA) {
      const [rows] = await pool.query('SELECT EVE_EVENTO, EVE_HORA FROM sie_evento WHERE DATE(EVE_FECHA) = ?', [EVE_FECHA]);
      const collide = (rows || []).some(r => {
        const horaStored = r.EVE_HORA ? String(r.EVE_HORA).substr(0,5) : '';
        return horaStored && horaStored === String(EVE_HORA).substr(0,5);
      });
      if (collide) {
        const err = new Error('FECHA_HORA_OCUPADA');
        throw err;
      }
    } else {
      const [rows] = await pool.query('SELECT 1 FROM sie_evento WHERE DATE(EVE_FECHA) = ? LIMIT 1', [EVE_FECHA]);
      if ((rows || []).length) {
        const err = new Error('FECHA_OCUPADA');
        throw err;
      }
    }
  }

  const [result] = await pool.query(
    'INSERT INTO sie_evento (EXT_EXTRA, EVE_FECHA, EVE_HORA) VALUES (?, ?, ?)',
    [EXT_EXTRA, EVE_FECHA, EVE_HORA || null]
  );
  return result.insertId;
};

export const deleteEvento = async (id) => {
  await pool.query('DELETE FROM sie_evento WHERE EVE_EVENTO = ?', [id]);
  return id;
};
