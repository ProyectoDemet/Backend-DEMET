import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { validateSchema } from '../middleware/validate.js';
import { requestRegisterSchema, idRequestSchema, updateStatusSchema, getPriceSchema } from '../validator/request.schema.js';
import { requestController } from '../controller/request.controller.js';

const router = express.Router();

/**
 * @swagger
 * /request/register:
 *   post:
 *     summary: Registrar una solicitud proveniente de un cliente o socio
 *     description: Crea una solicitud con datos de contacto, fechas, tipo de socio y tarifa seleccionada.
 *     tags:
 *       - Request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - v_tittle
 *               - v_description
 *               - v_name
 *               - v_email
 *               - v_phone_number
 *               - v_is_partner
 *               - v_pax
 *               - v_init_date
 *               - v_end_date
 *               - v_fk_rate
 *             properties:
 *               v_tittle:
 *                 type: string
 *                 minLength: 4
 *                 maxLength: 10
 *                 example: "Evento"
 *               v_description:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *                 example: "Descripción del evento o solicitud."
 *               v_name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 20
 *                 example: "Juan Perez"
 *               v_email:
 *                 type: string
 *                 format: email
 *                 example: "cliente@example.com"
 *               v_phone_number:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 13
 *                 example: "3001234567"
 *               v_is_partner:
 *                 type: boolean
 *                 example: false
 *               v_pax:
 *                 type: integer
 *                 minimum: 1
 *                 example: 50
 *               v_init_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-10T10:00:00.000Z"
 *               v_end_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-10T14:00:00.000Z"
 *               v_fk_rate:
 *                 type: integer
 *                 minimum: 1
 *                 example: 2
 *     responses:
 *       201:
 *         description: Solicitud registrada exitosamente.
 *       400:
 *         description: Error de validación en los datos enviados.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/register', validateSchema(requestRegisterSchema), requestController.register); 

/**
 * @swagger
 * /request/update:
 *   put:
 *     summary: Actualizar el estado de una solicitud (Cliente/Socio)
 *     description: >
 *       Actualiza el estado de una solicitud de **Pendiente** a **En Progreso**.  
 *       Tras actualizar el estado, el sistema envía automáticamente una notificación
 *       por correo electrónico al cliente o socio informando del cambio de estado.  
 *       Esta ruta requiere autenticación mediante token (JWT en cookie).
 *     tags:
 *       - Request
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - v_id_request
 *               - v_email
 *             properties:
 *               v_id_request:
 *                 type: integer
 *                 minimum: 1
 *                 example: 12
 *               v_email:
 *                 type: string
 *                 format: email
 *                 example: "cliente@example.com"
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente y correo enviado al cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Status Actualizado"
 *                 info:
 *                   type: array
 *                   example: ["cliente@example.com"]
 *       400:
 *         description: Error de validación en los datos enviados.
 *       401:
 *         description: Token no enviado o inválido.
 *       404:
 *         description: No se encontró la solicitud a actualizar.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/update', verifyToken, validateSchema(updateStatusSchema), requestController.update);

/**
 * @swagger
 * /request/delete:
 *   delete:
 *     summary: Eliminar una solicitud (Cliente/Socio)
 *     description: >
 *       Esta ruta permite eliminar una solicitud registrada por un cliente o socio.  
 *       El usuario debe estar autenticado mediante un token JWT almacenado en cookies.  
 *       Solo se requiere enviar el ID numérico de la solicitud a eliminar.
 *     tags:
 *       - Request
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - v_id_request
 *             properties:
 *               v_id_request:
 *                 type: integer
 *                 minimum: 1
 *                 example: 15
 *     responses:
 *       200:
 *         description: Solicitud eliminada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Solicitud Eliminada Correctamente"
 *       400:
 *         description: Error de validación en los datos enviados.
 *       401:
 *         description: Token no enviado o inválido.
 *       404:
 *         description: No se encontró la solicitud a eliminar.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/delete', verifyToken, validateSchema(idRequestSchema), requestController.delete);

/**
 * @swagger
 * /request/get:
 *   get:
 *     summary: Obtener todas las solicitudes realizadas por Clientes/Socios
 *     description: >
 *       Esta ruta permite obtener la lista completa de solicitudes enviadas por clientes o socios.  
 *       Incluye información detallada como datos personales, fechas del evento, estado actual,  
 *       valor aproximado calculado, el espacio seleccionado y la tarifa asociada.  
 *       El usuario debe estar autenticado mediante token JWT almacenado en cookies.
 *     tags:
 *       - Request
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de solicitudes obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RequestItem'
 *       401:
 *         description: Token no enviado o inválido.
 *       500:
 *         description: Error interno del servidor.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RequestItem:
 *       type: object
 *       properties:
 *         id_request:
 *           type: integer
 *           example: 2
 *         tittle:
 *           type: string
 *           example: "CUMPLEAÑOS"
 *         description:
 *           type: string
 *           example: "QUIERO CELEBRAR MI CUMPLE"
 *         name:
 *           type: string
 *           example: "JULIAN"
 *         email:
 *           type: string
 *           example: "cliente@gmail.com"
 *         phone_number:
 *           type: string
 *           example: "3108880996"
 *         is_partner:
 *           type: boolean
 *           example: true
 *         pax:
 *           type: integer
 *           example: 15
 *         init_date:
 *           type: string
 *           format: date-time
 *           example: "2025-11-22T11:30:00.000Z"
 *         end_date:
 *           type: string
 *           format: date-time
 *           example: "2025-11-22T17:30:00.000Z"
 *         status:
 *           type: string
 *           enum: [PENDIENTE, EN PROGRESO]
 *           example: "PENDIENTE"
 *         value_aprox:
 *           type: string
 *           example: "250000.00"
 *         espacio:
 *           type: string
 *           example: "Salón Principal"
 *         tarifa:
 *           type: string
 *           example: "Tarifa Base"
 */
router.get('/get', verifyToken, requestController.get);

/**
 * @swagger
 * /request/price:
 *   post:
 *     summary: Obtiene la cotización estimada según fechas y tarifa.
 *     tags:
 *       - Request
 *     description: >
 *       Calcula el valor estimado de una reserva basándose en la duración
 *       (horas entre fecha inicial y final) y la tarifa seleccionada.
 *       Internamente llama a la función SQL `calculate_value` que determina
 *       el precio según franjas de horas, valores base y horas extra.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - v_init_date
 *               - v_end_date
 *               - v_fk_rate
 *             properties:
 *               v_init_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-01-10T10:00:00.000Z"
 *                 description: Fecha y hora de inicio del evento.
 *               v_end_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-01-10T18:00:00.000Z"
 *                 description: Fecha y hora de fin del evento.
 *               v_fk_rate:
 *                 type: integer
 *                 example: 2
 *                 description: ID de la tarifa que se usará para calcular el valor.
 *
 *     responses:
 *       200:
 *         description: Cotización generada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   example: 450000
 *                   description: Valor calculado según la duración y tarifa.
 *
 *       400:
 *         description: Error de validación o fechas inconsistentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "INCONGRUENCIA EN LAS FECHAS"
 *
 *       500:
 *         description: Error interno inesperado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.post('/price', validateSchema(getPriceSchema), requestController.price);

export default router