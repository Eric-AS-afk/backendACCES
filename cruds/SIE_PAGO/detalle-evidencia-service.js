// Actualiza DET_EVIDENCIA en todos los detalles de un pago
import mysql from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../../config.js';

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT || 3306,
});

export const updateDetalleEvidenciaByPago = async (pagoId, evidenciaPath) => {
  await pool.query(
    'UPDATE SIE_DETALLE_PAGO SET DET_EVIDENCIA = ? WHERE PAG_PAGO = ?',
    [evidenciaPath, pagoId]
  );
};
