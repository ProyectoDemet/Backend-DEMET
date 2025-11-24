export const updateStatusTemplate = `
<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Confirmación de Reserva</title>
  </head>

  <body style="margin:0; padding:0; background-color:#eeeade; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" 
                style="background:#ffffff; border-radius:12px; overflow:hidden;">

            <tr>
              <td  style="background:#223b80; padding:25px;">
                <img src="cid:logoG" alt="Club El Meta" width="90" style="display:block; margin: 0 auto;">
                <div align="center" style="color:white; font-size:25px; font-weight:bold; padding-right:20px;">
                  Confirmación de Solicitud
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:30px; color:#000000; font-size:15px; line-height:1.8;">

                <p style="margin:0 0 15px;">Hola,</p>

                <p style="margin:0 0 15px;">
                  Hemos revisado tu <strong>solicitud de reserva</strong> y ha sido 
                  <strong style="color:#000000;">aceptada</strong>.
                </p>

                <p style="margin:0 0 15px;">
                  Pronto nos pondremos en contacto contigo para coordinar los detalles.
                </p>

                <p style="margin:0 0 25px;">
                  Si deseas comunicarte con nosotros, puedes hacerlo por WhatsApp:
                </p>

                <div style="text-align:center; margin:30px 0;">
                  <a href="https://wa.me/57301301301" target="_blank"
                    style="
                      background-color:#0cb64a;
                      color:white;
                      padding:14px 25px;
                      border-radius:6px;
                      text-decoration:none;
                      font-size:16px;
                      font-weight:bold;
                      display:inline-block;">
                    Contactar por WhatsApp
                  </a>
                </div>

                <p style="margin:0 0 15px;">Gracias por confiar en nosotros.</p>

                <p style="margin-top:30px; color:#000000; font-weight:bold;">
                  Saludos,<br>Equipo de Reservas – Club El Meta
                </p>

              </td>
            </tr>

            <tr>
              <td align="center" style="background:#ffffff; color:#7a7979; padding:12px; font-size:12px;">
                © 2025 Club El Meta • Todos los derechos reservados
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
