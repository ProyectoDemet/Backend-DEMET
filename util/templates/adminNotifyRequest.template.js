export const adminNotifyRequestTemplate = async (nameClient, phoneClient, pax, initDate, endDate, value, nameSpace, nameRate) => {
  const deposit = (value / 2).toLocaleString("es-CO");

  const whatsappAdminMessage = encodeURIComponent(`
  Hola ${nameClient}, soy el administrador del Club El Meta. 
  He visto tu solicitud para el espacio ${nameSpace} el día ${initDate} hasta ${endDate}. 
  Me gustaría confirmar algunos detalles de la reserva, conversar sobre precios y saber si deseas visitar nuestras instalaciones antes de continuar con el proceso. 
  Quedo atento para coordinar contigo. ¡Gracias!
  `);


  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Nueva Solicitud de Reserva</title>
  </head>

  <body style="margin:0; padding:0; background-color:#f1f1f1; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 25px 0;">
      <tr>
        <td align="center">

          <table width="620" cellpadding="0" cellspacing="0"
            style="background:#ffffff; border-radius:12px; overflow:hidden;">

            <!-- HEADER -->
            <tr>
              <td style="background:#223b80; padding:20px;">
                <img src="cid:logoG" alt="Club El Meta" width="85" style="display:block; margin:0 auto;">
                <div align="center" style="color:white; font-size:22px; font-weight:bold; margin-top:10px;">
                  Nueva Solicitud de Reserva
                </div>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:28px; color:#000; font-size:15px; line-height:1.7;">

                <p style="margin:0 0 15px;">
                  Hola <strong>Administrador</strong>,
                </p>

                <p style="margin:0 0 15px;">
                  Se ha recibido una nueva solicitud de reserva en el sistema.  
                  A continuación encontrarás toda la información enviada por el cliente:
                </p>

                <!-- RESUMEN DE LA SOLICITUD -->
                <table width="100%" cellpadding="0" cellspacing="0"
                  style="background:#fafafa; padding:15px; border-radius:8px; margin:20px 0; border:1px solid #e0e0e0;">

                  <tr>
                    <td style="font-size:14px; padding:6px 0;"><strong>Cliente:</strong></td>
                    <td style="font-size:14px; padding:6px 0;">${nameClient}</td>
                  </tr>

                  <tr>
                    <td style="font-size:14px; padding:6px 0;"><strong>Teléfono:</strong></td>
                    <td style="font-size:14px; padding:6px 0;">${phoneClient}</td>
                  </tr>

                  <tr>
                    <td style="font-size:14px; padding:6px 0;"><strong>Espacio solicitado:</strong></td>
                    <td style="font-size:14px; padding:6px 0;">${nameSpace}</td>
                  </tr>

                  <tr>
                    <td style="font-size:14px; padding:6px 0;"><strong>Tipo de Organizacion:</strong></td>
                    <td style="font-size:14px; padding:6px 0;">${nameRate}</td>
                  </tr>

                  <tr>
                    <td style="font-size:14px; padding:6px 0;"><strong>Número de personas:</strong></td>
                    <td style="font-size:14px; padding:6px 0;">${pax}</td>
                  </tr>

                  <tr>
                    <td style="font-size:14px; padding:6px 0;"><strong>Fecha:</strong></td>
                    <td style="font-size:14px; padding:6px 0;">Desde: ${initDate}<br>Hasta: ${endDate}</td>
                  </tr>

                  <tr>
                    <td style="font-size:14px; padding:6px 0;"><strong>Valor total:</strong></td>
                    <td style="font-size:14px; padding:6px 0;">$${value}</td>
                  </tr>

                  <tr>
                    <td style="font-size:14px; padding:6px 0;"><strong>Abono requerido (50%):</strong></td>
                    <td style="font-size:14px; padding:6px 0; font-weight:bold; color:#b07000;">$${deposit}</td>
                  </tr>
                </table>

                <p style="margin:0 0 20px;">
                  Recuerda comunicarte con el cliente para solicitar el comprobante del abono y confirmar su reserva.
                </p>

                <!-- BOTÓN WHATSAPP -->
                <div style="text-align:center; margin:30px 0;">
                  <a href="https://wa.me/57${phoneClient}?text=${whatsappAdminMessage}" target="_blank"
                    style="
                      background-color:#0cb64a;
                      color:white;
                      padding:14px 28px;
                      border-radius:6px;
                      text-decoration:none;
                      font-size:15px;
                      font-weight:bold;
                      display:inline-block;">
                    Contactar Cliente por WhatsApp
                  </a>
                </div>
                
                <!-- BOTÓN PANEL ADMIN -->
                <div style="text-align:center; margin-top:10px;">
                  <a href="#"
                    style="
                      background-color:#223b80;
                      color:white;
                      padding:12px 22px;
                      border-radius:6px;
                      text-decoration:none;
                      font-size:14px;
                      font-weight:bold;
                      display:inline-block;">
                    Ir al Panel de Reservas
                  </a>
                </div>

                <p style="margin-top:35px; color:#000;">
                  Atentamente,<br>
                  <strong>Sistema de Reservas – Club El Meta</strong>
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td align="center" style="background:#ffffff; color:#7a7979; padding:12px; font-size:12px;">
                Notificación interna • No responder este correo
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};
