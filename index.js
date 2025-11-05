import express from "express";
import cors from "cors";
import sql from "mssql"; // Cambiado a mssql
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

const sqlConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  server: DB_HOST,
  //port: parseInt(DB_PORT), // Asegúrate de que sea un número
  options: {
    encrypt: true, // Usar en conexiones seguras
    trustServerCertificate: true, // Usar si no tienes un certificado SSL
  },
  requestTimeout: 60000, // Aumenta el tiempo de espera a 60 segundos
  pool: {
    max: 10, // Número máximo de conexiones en el pool
    min: 0, // Número mínimo de conexiones en el pool
    idleTimeoutMillis: 30000, // Tiempo de espera para cerrar conexiones inactivas
  },
};

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

app.get("/ping", async (req, res) => {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query("SELECT GETDATE() AS now");

    res.send({
      pong: result.recordset[0].now,
    });
  } catch (err) {
    console.error("Error al conectar a SQL Server:", err);
    res.status(500).send({
      error: "Error al conectar a la base de datos",
      details: err.message,
    });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

