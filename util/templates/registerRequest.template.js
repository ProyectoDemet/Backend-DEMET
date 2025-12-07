export const registerRequestTemplate = async (nameClient, pax, initDate, endDate, value, nameSpace, nameRate) => {
  const deposit = (value / 2).toLocaleString("es-CO");

  //Mensaje WhatsApp
  const whatsappMessage = encodeURIComponent(
  `Buen día, mi nombre es ${nameClient}. He realizado una solicitud de reserva del espacio ${nameSpace}, programada para el periodo comprendido entre ${initDate} y ${endDate}. Agradezco si podemos establecer comunicación para revisar y coordinar los detalles correspondientes. Muchas gracias.`
  );

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Solicitud Recibida</title>
  </head>

  <body style="margin:0; padding:0; background-color:#eeeade; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0"
                 style="background:#ffffff; border-radius:12px; overflow:hidden;">

            <!-- HEADER -->
            <tr>
              <td style="background:#223b80; padding:25px;">
                <img src="cid:logoG" alt="Club El Meta" width="90" style="display:block; margin: 0 auto;">
                <div align="center" style="color:white; font-size:25px; font-weight:bold;">
                  Solicitud Recibida
                </div>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:30px; color:#000000; font-size:15px; line-height:1.8;">

                <p style="margin:0 0 15px;">Hola <strong>${nameClient}</strong>,</p>

                <p style="margin:0 0 15px;">
                  Hemos recibido correctamente tu <strong>solicitud de reserva</strong>.
                  Nuestro equipo la revisará y pronto te enviaremos la confirmación.
                </p>

                <!-- RESUMEN DE LA SOLICITUD -->
                <table width="100%" cellpadding="0" cellspacing="0" 
                       style="background:#f5f5f5; padding:15px; border-radius:8px; margin:25px 0;">
                  <tr>
                    <td style="font-size:14px; padding:6px 0;"><strong>Cliente:</strong></td>
                    <td style="font-size:14px; padding:6px 0;">${nameClient}</td>
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
                    <td style="font-size:14px; padding:6px 0;"><strong>Fecha reservada:</strong></td>
                    <td style="font-size:14px; padding:6px 0;">Desde: ${initDate} - Hasta: ${endDate}</td>
                  </tr>
                  <tr>
                    <td style="font-size:14px; padding:6px 0;"><strong>Valor estimado:</strong></td>
                    <td style="font-size:14px; padding:6px 0;">$${value}</td>
                  </tr>
                </table>

                <!-- PAGO DEL ABONO -->
                <div style="background:#fff5d6; border-left:6px solid #f0b429; padding:15px; border-radius:6px; margin-bottom:25px;">
                  <p style="margin:0; font-size:15px;">
                    <strong>Importante:</strong> Para continuar con tu proceso de reserva, debes realizar un 
                    <strong>abono del 50%</strong> correspondiente a:
                  </p>

                  <p style="margin:10px 0 0; font-size:18px; font-weight:bold; color:#c47a00;">
                    $${deposit} COP
                  </p>

                  <p style="margin:10px 0 0; font-size:15px;">
                    Realiza la consignación en nuestro <strong>Nequi: 3103330880</strong> a nombre de <strong>Club El Meta</strong>.
                  </p>
                </div>

                <!-- AVISO PARA CONTACTAR AL ADMIN -->
                <div style="background:#e6f3ff; border-left:6px solid #1b6ec2; padding:15px; border-radius:6px; margin-bottom:25px;">
                  <p style="margin:0; font-size:15px;">
                    <strong>Nota importante:</strong> Antes de efectuar el abono inicial, es indispensable comunicarse 
                    con el administrador vía WhatsApp para validar la información, ajustar detalles y confirmar el 
                    valor definitivo de la reserva.
                  </p>
                </div>

                <!-- BOTÓN WHATSAPP -->
                <div style="text-align:center; margin:30px 0;">
                  <a href="https://wa.me/573103330880?text=${whatsappMessage}" target="_blank"
                    style="
                      background-color:#0cb64a;
                      color:white;
                      padding:14px 25px;
                      border-radius:6px;
                      text-decoration:none;
                      font-size:16px;
                      font-weight:bold;
                      display:inline-block;">
                    Contactar al Administrador por WhatsApp
                  </a>
                </div>

                <p style="margin:0 0 15px;">
                  Gracias por confiar en nosotros. Estaremos atentos a tu mensaje para continuar con el proceso.
                </p>

                <p style="margin-top:30px; color:#000000; font-weight:bold;">
                  Saludos,<br>Equipo de Reservas – Club El Meta
                </p>

              </td>
            </tr>

            <!-- FOOTER -->
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
};
