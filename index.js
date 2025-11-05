import express from "express";
import cors from "cors";
import mysql from 'mysql2/promise';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  //DB_PORT,
  DB_USER,
  FRONTEND_URL,
  PORT,
} from "./config.js";

import casaRoutes from './cruds/SIE_CASA/routes.js';
import usuarioRoutes from './cruds/SIE_USUARIO/routes.js';
import cuentaRoutes from './cruds/SIE_CUENTA_BANCARIA/routes.js';
import pagoRoutes from './cruds/SIE_PAGO/routes.js';
import servicioRoutes from './cruds/SIE_SERVICIO/routes.js';
import tipoPagoRoutes from './cruds/SIE_TIPO_PAGO/routes.js';
import detallePagoRoutes from './cruds/SIE_DETALLE_PAGO/routes.js';
import extraRoutes from './cruds/SIE_EXTRA/routes.js';
import tipoExtraRoutes from './cruds/SIE_TIPO_EXTRA/routes.js';
import proveedorRoutes from './cruds/SIE_PROVEEDOR/routes.js';
import retiroRoutes from './cruds/SIE_RETIRO/routes.js';
import eventoRoutes from './cruds/SIE_EVENTO/routes.js';
import path from 'path';
import fs from 'fs';

const app = express();

const mysqlConfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  // port: DB_PORT ? parseInt(DB_PORT) : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 60000,
};

// Crear un pool reutilizable para la aplicación
const pool = mysql.createPool(mysqlConfig);

app.use(express.json()); // Middleware para procesar JSON

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

app.use('/api/casas', casaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/cuentas', cuentaRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/tipo-pago', tipoPagoRoutes);
app.use('/api/detalle-pago', detallePagoRoutes);
app.use('/api/extra', extraRoutes);
app.use('/api/tipo-extra', tipoExtraRoutes);
app.use('/api/proveedor', proveedorRoutes);
app.use('/api/retiro', retiroRoutes);
app.use('/api/evento', eventoRoutes);

// Servir estáticamente las evidencias
const uploadsDir = path.resolve('uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

app.get('/ping', async (req, res) => {
  try {
    // Ejecutar una consulta simple para verificar la conexión a MySQL
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.send({
      pong: rows && rows[0] ? rows[0].now : null,
    });
  } catch (err) {
    console.error('Error al conectar a MySQL:', err);
    res.status(500).send({
      error: 'Error al conectar a la base de datos',
      details: err.message,
    });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

