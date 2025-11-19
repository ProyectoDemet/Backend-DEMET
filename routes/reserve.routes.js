import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { validateSchema } from '../middleware/validate.js';
import { insertReservationSchema, updateReservationSchema, deleteReservationSchema } from '../validator/reserve.schema.js';
import { reserveController } from '../controller/reserve.controller.js';

const router = express.Router();

/**
 * @swagger
 * /reserve/register:
 *   post:
 *     summary: Registrar una nueva reserva
 *     tags: [Reserva]
 *     description: >
 *       Esta ruta permite registrar una nueva reserva en el sistema.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       se obtiene automáticamente desde la cookie `access_token`.  
 *       
 *       Debe enviarse información del cliente, fechas de inicio y fin, cantidad de personas,
 *       valor total, tarifa asociada y una lista de extras opcionales.  
 *       
 *       El campo **v_extras** debe enviarse como un string JSON válido, por ejemplo:  
 *       - `"[{}]"`  
 *       - `"[{\"id_extra\":1, \"quantity\":1, \"value_add\":10}]"`  
 *
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationRegister'
 *     responses:
 *       200:
 *         description: Reserva registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reserva Registrada Exitosamente"
 *       400:
 *         description: Error de validación en los datos enviados
 *       401:
 *         description: Token no enviado o inválido
 *       409:
 *         description: Las fechas están ocupadas o no disponibles
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReservationRegister:
 *       type: object
 *       properties:
 *         v_id_reservation:
 *           type: string
 *           example: "RSV00123"
 *         v_name:
 *           type: string
 *           example: "Juan Pérez"
 *         v_email:
 *           type: string
 *           example: "juan@example.com"
 *         v_phone_number:
 *           type: string
 *           example: "3104567890"
 *         v_init_date:
 *           type: string
 *           format: date-time
 *           example: "2025-06-10T10:00:00Z"
 *         v_end_date:
 *           type: string
 *           format: date-time
 *           example: "2025-06-10T15:00:00Z"
 *         v_pax:
 *           type: number
 *           example: 20
 *         v_status:
 *           type: string
 *           enum: ["EN PROGRESO", "FINALIZADO"]
 *           example: "EN PROGRESO"
 *         v_extras:
 *           type: string
 *           description: >
 *             Cadena JSON con los extras seleccionados.  
 *             Debe recibirse como string:  
 *             - `"[{}]"`  
 *             - `"[{\"id_extra\":1, \"quantity\":1, \"value_add\":10}]"`  
 *           example: "[{\"id_extra\":1, \"quantity\":2, \"value_add\":5000}]"
 *         v_amount:
 *           type: number
 *           example: 85000
 *         v_total_value:
 *           type: number
 *           example: 90000
 *         v_fk_rate:
 *           type: number
 *           example: 2
 *       required:
 *         - v_name
 *         - v_email
 *         - v_phone_number
 *         - v_init_date
 *         - v_end_date
 *         - v_pax
 *         - v_status
 *         - v_extras
 *         - v_amount
 *         - v_total_value
 *         - v_fk_rate
 */
router.post('/register', verifyToken, validateSchema(insertReservationSchema), reserveController.register);

/**
 * @swagger
 * /reserve/update:
 *   put:
 *     summary: Actualizar una reserva existente
 *     tags: [Reserva]
 *     description: >
 *       Esta ruta permite actualizar la información de una reserva existente.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       se obtiene automáticamente desde la cookie `access_token`.  
 *       
 *       Se pueden modificar datos del cliente, fechas, pax, tarifa, valores
 *       y la lista de extras.  
 *
 *       El campo **v_extras** debe enviarse como un string JSON válido, por ejemplo:  
 *       - `"[{}]"`  
 *       - `"[{\"id_extra\":1, \"quantity\":1, \"value_add\":10}]"`  
 *
 *       La fecha final **debe ser mayor** que la fecha de inicio.
 *
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationUpdate'
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reserva Actualizada Exitosamente"
 *       400:
 *         description: Error en la validación de los datos enviados
 *       401:
 *         description: Token no enviado o inválido
 *       404:
 *         description: No existe una reserva con el ID proporcionado
 *       409:
 *         description: Las fechas están ocupadas o no disponibles
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReservationUpdate:
 *       type: object
 *       properties:
 *         v_id_reservation:
 *           type: string
 *           example: "RSV00123"
 *         v_email:
 *           type: string
 *           example: "cliente_actualizado@example.com"
 *         v_phone_number:
 *           type: string
 *           example: "3119876543"
 *         v_init_date:
 *           type: string
 *           format: date-time
 *           example: "2025-07-10T09:00:00Z"
 *         v_end_date:
 *           type: string
 *           format: date-time
 *           example: "2025-07-10T14:00:00Z"
 *         v_pax:
 *           type: number
 *           example: 25
 *         v_status:
 *           type: string
 *           enum: ["EN PROGRESO", "FINALIZADO"]
 *           example: "EN PROGRESO"
 *         v_extras:
 *           type: string
 *           description: >
 *             Cadena JSON con los extras seleccionados.  
 *             Ejemplos válidos:  
 *             - `"[{}]"`  
 *             - `"[{\"id_extra\":1, \"quantity\":2, \"value_add\":5000}]"`  
 *           example: "[{\"id_extra\":1, \"quantity\":1, \"value_add\":3000}]"
 *         v_amount:
 *           type: number
 *           example: 95000
 *         v_total_value:
 *           type: number
 *           example: 100000
 *         v_fk_rate:
 *           type: number
 *           example: 4
 *       required:
 *         - v_id_reservation
 *         - v_email
 *         - v_phone_number
 *         - v_init_date
 *         - v_end_date
 *         - v_pax
 *         - v_status
 *         - v_extras
 *         - v_amount
 *         - v_total_value
 *         - v_fk_rate
 */
router.put('/update', verifyToken, validateSchema(updateReservationSchema), reserveController.update);

/**
 * @swagger
 * /reserve/delete:
 *   delete:
 *     summary: Eliminar una reserva existente
 *     tags: [Reserva]
 *     description: >
 *       Esta ruta permite eliminar una reserva existente del sistema.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       se obtiene automáticamente desde la cookie `access_token`.  
 *
 *       Solo se debe proporcionar el ID de la reserva que se desea eliminar.
 *
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationDelete'
 *     responses:
 *       200:
 *         description: Reserva eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reserva Eliminada Exitosamente"
 *       400:
 *         description: Error en los datos enviados o formato inválido
 *       401:
 *         description: Token no enviado o inválido
 *       404:
 *         description: No existe una reserva con el ID proporcionado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReservationDelete:
 *       type: object
 *       properties:
 *         v_id_reservation:
 *           type: string
 *           example: "RSV00123"
 *           description: ID de la reserva a eliminar
 *       required:
 *         - v_id_reservation
 */
router.delete('/delete', verifyToken, validateSchema(deleteReservationSchema), reserveController.delete);

/**
 * @swagger
 * /reserve/get:
 *   get:
 *     summary: Obtener todas las reservas registradas
 *     tags: [Reserva]
 *     description: >
 *       Esta ruta devuelve la lista completa de reservas registradas en el sistema.  
 *       Incluye información del cliente, fechas, pax, tarifa asociada, valores
 *       y extras utilizados en cada reserva.  
 *
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       se obtiene automáticamente desde la cookie `access_token`.
 *
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReservationGet'
 *       401:
 *         description: Token no enviado o inválido
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReservationGet:
 *       type: object
 *       properties:
 *         id_reservation:
 *           type: string
 *           example: "RSV00123"
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           example: "juan.perez@example.com"
 *         phone_number:
 *           type: string
 *           example: "3119876543"
 *         init_date:
 *           type: string
 *           format: date-time
 *           example: "2025-07-15T09:00:00Z"
 *         end_date:
 *           type: string
 *           format: date-time
 *           example: "2025-07-15T13:00:00Z"
 *         pax:
 *           type: number
 *           example: 30
 *         status:
 *           type: string
 *           enum: ["EN PROGRESO", "FINALIZADO"]
 *           example: "EN PROGRESO"
 *         extras:
 *           type: array
 *           description: Listado de extras asociados a la reserva
 *           items:
 *             type: object
 *             properties:
 *               id_extra:
 *                 type: number
 *                 example: 1
 *               quantity:
 *                 type: number
 *                 example: 2
 *               value_add:
 *                 type: number
 *                 example: 3000
 *         amount:
 *           type: number
 *           example: 95000
 *         total_value:
 *           type: number
 *           example: 120000
 *         fk_rate:
 *           type: number
 *           example: 4
 */
router.get('/get', verifyToken, reserveController.get);

export default router