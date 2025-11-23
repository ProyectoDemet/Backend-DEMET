export const updateStatusTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Confirmación de Reserva</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <table width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="20" cellspacing="0" style="background: #ffffff; border-radius: 10px;">
            <tr>
              <td align="center" style="background: #2d89ef; color: white; font-size: 22px; border-radius: 10px 10px 0 0;">
                Confirmación de Solicitud
              </td>
            </tr>
            <tr>
              <td style="font-size: 15px; color: #444;">
                <p>Hola,</p>
                <p>Hemos revisado tu <strong>solicitud de reserva</strong> y ha sido <strong>aceptada</strong>.</p>
                <p>Pronto nos pondremos en contacto contigo para coordinar los detalles.</p>

                <p>Si deseas comunicarte con nosotros, puedes hacerlo por WhatsApp:</p>

                <p style="text-align: center; margin: 25px 0;">
                  <a href="https://wa.me/57301301301" target="_blank"
                     style="
                       background-color: #25D366;
                       color: white;
                       padding: 12px 22px;
                       border-radius: 8px;
                       text-decoration: none;
                       font-size: 16px;
                       font-weight: bold;
                       display: inline-block;">
                    Contactar por WhatsApp
                  </a>
                </p>

                <p>Gracias por confiar en nosotros.</p>
                <p style="margin-top: 30px;">Saludos,<br>El equipo de Reservas</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size: 12px; color: #888;">
                © 2025
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
