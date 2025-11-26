import express from 'express';
import { verifyRol } from '../middleware/rolAccess.js';
import { validateSchema } from '../middleware/validate.js';
import { rateRegisterSchema, rateUpdateSchema, rateDeleteSchema } from '../validator/rate.schema.js';
import { rateController } from '../controller/rate.controller.js';

const router = express.Router();

/**
 * @swagger
 * /rate/register:
 *   post:
 *     summary: Registrar una nueva tarifa para un espacio
 *     tags: [Rate]
 *     description: >
 *       Esta ruta permite registrar una nueva tarifa asociada a un espacio específico.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       es obtenido automáticamente desde la cookie `access_token`.  
 *       Se deben proporcionar los valores de la tarifa, la capacidad del espacio
 *       y el ID del espacio al que pertenece esta tarifa.
 *     security:
 *       - cookieAuth: []      # autenticación basada en cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RateRegister'
 *     responses:
 *       200:
 *         description: Tarifa registrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarifa Registrada Exitosamente"
 *       400:
 *         description: Error de validación en los datos de la tarifa
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       404:
 *         description: Espacio asociado no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RateRegister:
 *       type: object
 *       properties:
 *         v_name:
 *           type: string
 *           example: "Tarifa Fines de Semana"
 *         v_pax:
 *           type: number
 *           example: 80
 *         v_value4:
 *           type: number
 *           example: 250000
 *         v_value8:
 *           type: number
 *           example: 400000
 *         v_value_extra:
 *           type: number
 *           example: 60000
 *         v_isPartner:
 *           type: boolean
 *           example: false
 *         v_idSpace:
 *           type: number
 *           example: 2
 */
router.post('/register', verifyRol, validateSchema(rateRegisterSchema), rateController.register);

/**
 * @swagger
 * /rate/update:
 *   put:
 *     summary: Actualizar una tarifa existente
 *     tags: [Rate]
 *     description: >
 *       Esta ruta permite actualizar la información de una tarifa previamente registrada.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       es obtenido automáticamente desde la cookie `access_token`.  
 *       Se debe enviar el identificador de la tarifa junto con los datos actualizados.
 *     security:
 *       - cookieAuth: []      # autenticación basada en cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RateUpdate'
 *     responses:
 *       200:
 *         description: Tarifa actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarifa Actualizada Exitosamente"
 *       400:
 *         description: Error de validación o datos duplicados
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       404:
 *         description: Tarifa no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RateUpdate:
 *       type: object
 *       properties:
 *         v_id_rate:
 *           type: number
 *           example: 5
 *         v_name:
 *           type: string
 *           example: "Tarifa Entre Semana"
 *         v_pax:
 *           type: number
 *           example: 100
 *         v_value4:
 *           type: number
 *           example: 220000
 *         v_value8:
 *           type: number
 *           example: 360000
 *         v_value_extra:
 *           type: number
 *           example: 55000
 */
router.put('/update', verifyRol, validateSchema(rateUpdateSchema), rateController.update);

/**
 * @swagger
 * /rate/delete:
 *   delete:
 *     summary: Eliminar una tarifa existente
 *     tags: [Rate]
 *     description: >
 *       Esta ruta permite eliminar una tarifa previamente registrada en el sistema.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       es obtenido automáticamente desde la cookie `access_token`.  
 *       Para eliminar una tarifa, se debe enviar su identificador único.
 *     security:
 *       - cookieAuth: []      # autenticación basada en cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RateDelete'
 *     responses:
 *       200:
 *         description: Tarifa eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarifa Eliminada Exitosamente"
 *       400:
 *         description: Datos inválidos o tarifa no encontrada
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RateDelete:
 *       type: object
 *       properties:
 *         v_id_rate:
 *           type: number
 *           example: 5
 */
router.delete('/delete', verifyRol, validateSchema(rateDeleteSchema), rateController.delete);

/**
 * @swagger
 * /rate/get:
 *   get:
 *     summary: Obtener la lista completa de tarifas
 *     tags: [Rate]
 *     description: >
 *       Esta ruta permite obtener todas las tarifas registradas en el sistema.  
 *       No requiere autenticación, ya que no utiliza token ni cookies.  
 *       Devuelve la información completa de cada tarifa según el esquema `RateGet`.
 *     responses:
 *       200:
 *         description: Lista de tarifas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RateGet'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RateGet:
 *       type: object
 *       properties:
 *         id_rate:
 *           type: number
 *           example: 3
 *         name:
 *           type: string
 *           example: "Tarifa Fines de Semana"
 *         pax:
 *           type: number
 *           example: 80
 *         value4:
 *           type: number
 *           example: 250000
 *         value8:
 *           type: number
 *           example: 400000
 *         value_extra:
 *           type: number
 *           example: 60000
 *         isPartner:
 *           type: boolean
 *           example: false
 *         id_space:
 *           type: number
 *           example: 2
 */
router.get('/get', rateController.get);

export default router
