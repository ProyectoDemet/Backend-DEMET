import express from 'express';
import { verifyRol } from '../middleware/rolAccess.js';
import { validateSchema } from '../middleware/validate.js';
import { extraInsertSchema, extraUpdateSchema, extraDeleteSchema } from '../validator/extra.schema.js';
import { extraController } from '../controller/extra.controller.js';

const router = express.Router();

/**
 * @swagger
 * /extra/register:
 *   post:
 *     summary: Registrar un nuevo extra
 *     tags: [Extra]
 *     description: >
 *       Esta ruta permite registrar un nuevo extra disponible en el sistema  
 *       (por ejemplo: sillas, mesas, manteles, etc.).  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       se obtiene automáticamente desde la cookie `access_token`.  
 *       Se debe enviar el nombre del extra, su valor adicional y la cantidad disponible.
 *     security:
 *       - cookieAuth: []      # autenticación basada en cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExtraRegister'
 *     responses:
 *       200:
 *         description: Extra registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Extra Registrado Exitosamente"
 *       400:
 *         description: Error de validación en los datos enviados
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExtraRegister:
 *       type: object
 *       properties:
 *         v_name:
 *           type: string
 *           example: "Silla Plástica"
 *         v_value_add:
 *           type: number
 *           example: 5000
 *         v_quantity:
 *           type: number
 *           example: 50
 */
router.post('/register', verifyRol, validateSchema(extraInsertSchema), extraController.register);

/**
 * @swagger
 * /extra/update:
 *   put:
 *     summary: Actualizar un extra existente
 *     tags: [Extra]
 *     description: >
 *       Esta ruta permite actualizar la información de un extra existente  
 *       (por ejemplo: sillas, mesas, manteles, etc.).  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       se obtiene automáticamente desde la cookie `access_token`.  
 *       Se debe enviar el ID del extra junto con los nuevos valores.
 *     security:
 *       - cookieAuth: []      # autenticación basada en cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExtraUpdate'
 *     responses:
 *       200:
 *         description: Extra actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Extra Actualizado Exitosamente"
 *       400:
 *         description: Error de validación en los datos enviados
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       404:
 *         description: No existe un extra con el ID proporcionado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExtraUpdate:
 *       type: object
 *       properties:
 *         v_id_extra:
 *           type: number
 *           example: 3
 *           description: ID del extra que se desea actualizar
 *         v_name:
 *           type: string
 *           example: "Mesa Redonda"
 *         v_value_add:
 *           type: number
 *           example: 8000
 *         v_quantity:
 *           type: number
 *           example: 20
 */
router.put('/update', verifyRol, validateSchema(extraUpdateSchema), extraController.update);

/**
 * @swagger
 * /extra/delete:
 *   delete:
 *     summary: Eliminar un extra del sistema
 *     tags: [Extra]
 *     description: >
 *       Esta ruta permite eliminar un extra existente del sistema  
 *       (por ejemplo: sillas, mesas, manteles, etc.).  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       se obtiene automáticamente desde la cookie `access_token`.  
 *       Solo se debe enviar el ID del extra que se desea eliminar.
 *     security:
 *       - cookieAuth: []      # autenticación basada en cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExtraDelete'
 *     responses:
 *       200:
 *         description: Extra eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Extra Eliminado Exitosamente"
 *       400:
 *         description: Error de validación en los datos enviados
 *       401:
 *         description: Token no enviado o inválido
 *       404:
 *         description: No existe un extra con el ID proporcionado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExtraDelete:
 *       type: object
 *       properties:
 *         v_id_extra:
 *           type: number
 *           example: 3
 *           description: ID del extra a eliminar
 */
router.delete('/delete', verifyRol, validateSchema(extraDeleteSchema), extraController.delete);

/**
 * @swagger
 * /extra/get:
 *   get:
 *     summary: Obtener la lista de extras disponibles
 *     tags: [Extra]
 *     description: >
 *       Esta ruta devuelve todos los extras disponibles en el sistema  
 *       (por ejemplo: sillas, mesas, manteles, etc.).  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       se obtiene automáticamente desde la cookie `access_token`.
 *     security:
 *       - cookieAuth: []      # autenticación basada en cookie
 *     responses:
 *       200:
 *         description: Lista de extras obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExtraGet'
 *       401:
 *         description: Token no enviado o inválido
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExtraGet:
 *       type: object
 *       properties:
 *         id_extra:
 *           type: number
 *           example: 3
 *         name:
 *           type: string
 *           example: "Silla Plástica"
 *         value_add:
 *           type: number
 *           example: 5000
 *         quantity:
 *           type: number
 *           example: 50
 */
router.get('/get', verifyRol, extraController.get);

export default router