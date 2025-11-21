import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, FRONTEND_URL } from '../config.js';

let transporter = null;
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : undefined,
    secure: SMTP_PORT && Number(SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
} else {
  // Transporter not configured; emails will not be sent programmatically.
  transporter = null;
}

export const sendResetPasswordEmail = async (toEmail, toName, token) => {
  const resetUrl = `${FRONTEND_URL.replace(/\/$/, '')}/reset-password?token=${encodeURIComponent(token)}`;
  const subject = 'Recuperación de contraseña - ACCES';
  const html = `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>Recuperación de contraseña</h2>
      <p>Hola ${toName || 'usuario'},</p>
      <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en ACCES.</p>
      <p>Haz clic en el siguiente enlace para establecer una nueva contraseña (válido por 15 minutos):</p>
      <p><a href="${resetUrl}" target="_blank" rel="noopener">Restablecer contraseña</a></p>
      <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
      <hr />
      <p style="font-size:0.9rem; color:#666">Este mensaje fue enviado por ACCES. Si necesitas ayuda, responde a este correo o contacta a soporte: ${EMAIL_FROM}</p>
    </div>
  `;

  if (!transporter) {
    console.warn('SMTP not configured — skipping sending email to', toEmail);
    return { ok: false, info: 'SMTP not configured' };
  }

  const info = await transporter.sendMail({
    from: EMAIL_FROM,
    to: toEmail,
    subject,
    html,
  });
  return { ok: true, info };
};
