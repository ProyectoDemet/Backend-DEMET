import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { validateSchema } from '../middleware/validate.js';
import { spaceRegisterSchema, spaceDeleteSchema, spaceUpdateSchema } from '../validator/space.schema.js';
import { spaceController } from '../controller/space.controller.js';

const router = express.Router();

/**
 * @swagger
 * /space/register:
 *   post:
 *     summary: Registrar un nuevo espacio
 *     tags: [Space]
 *     description: >
 *       Esta ruta permite registrar un nuevo espacio disponible en el sistema.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       es obtenido automáticamente desde la cookie `access_token`.  
 *       Se valida que todos los campos requeridos cumplan con las reglas definidas
 *       en el esquema `SpaceRegister`.
 *     security:
 *       - cookieAuth: []      # autenticación basada en cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SpaceRegister'
 *     responses:
 *       200:
 *         description: Espacio registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Espacio Registrado Exitosamente"
 *       400:
 *         description: Error de validación en los datos del espacio
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SpaceRegister:
 *       type: object
 *       properties:
 *         v_name:
 *           type: string
 *           example: "Salón Principal"
 *         v_descrip:
 *           type: string
 *           example: "Espacio amplio con sonido y sillas incluidas"
 *         v_isPartner:
 *           type: boolean
 *           example: true
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
 */

router.post('/register', verifyToken, validateSchema(spaceRegisterSchema), spaceController.register);

/**
 * @swagger
 * /space/update:
 *   put:
 *     summary: Actualizar información de un espacio existente
 *     tags: [Space]
 *     description: >
 *       Esta ruta permite actualizar los datos de un espacio previamente registrado.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       es obtenido automáticamente desde la cookie `access_token`.  
 *       Se requiere enviar el identificador del espacio junto con los demás datos
 *       que serán actualizados.
 *     security:
 *       - cookieAuth: []      # autenticación basada en cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SpaceUpdate'
 *     responses:
 *       200:
 *         description: Espacio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Espacio Actualizado Exitosamente"
 *       400:
 *         description: Error de validación en los datos o datos duplicados
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       404:
 *         description: Espacio no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SpaceUpdate:
 *       type: object
 *       properties:
 *         v_id_rate:
 *           type: number
 *           example: 3
 *         v_name:
 *           type: string
 *           example: "Salón Principal Remodelado"
 *         v_descrip:
 *           type: string
 *           example: "Espacio actualizado con nueva iluminación y mobiliario"
 *         v_pax:
 *           type: number
 *           example: 100
 *         v_value4:
 *           type: number
 *           example: 300000
 *         v_value8:
 *           type: number
 *           example: 480000
 *         v_value_extra:
 *           type: number
 *           example: 70000
 */
router.put('/update', verifyToken, validateSchema(spaceUpdateSchema), spaceController.update);

/**
 * @swagger
 * /space/delete:
 *   delete:
 *     summary: Eliminar un espacio existente
 *     tags: [Space]
 *     description: >
 *       Esta ruta permite eliminar un espacio registrado en el sistema.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       es obtenido automáticamente desde la cookie `access_token`.  
 *       Para realizar la eliminación se debe enviar el nombre del espacio a eliminar.
 *     security:
 *       - cookieAuth: []      # autenticación basada en cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SpaceDelete'
 *     responses:
 *       200:
 *         description: Espacio eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Espacio Eliminado Exitosamente"
 *       400:
 *         description: Datos inválidos o espacio no encontrado
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SpaceDelete:
 *       type: object
 *       properties:
 *         v_name:
 *           type: string
 *           example: "Salón Principal"
 */

router.delete('/delete', verifyToken, validateSchema(spaceDeleteSchema), spaceController.delete);

/**
 * @swagger
 * /space/get:
 *   get:
 *     summary: Obtener la lista completa de espacios
 *     tags: [Space]
 *     description: >
 *       Esta ruta permite obtener todos los espacios registrados en el sistema.  
 *       No requiere autenticación, ya que no utiliza token ni cookies.  
 *       Devuelve la información completa de cada espacio según el esquema `SpaceGet`.
 *     responses:
 *       200:
 *         description: Lista de espacios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SpaceGet'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SpaceGet:
 *       type: object
 *       properties:
 *         id_rate:
 *           type: number
 *           example: 3
 *         name:
 *           type: string
 *           example: "Salón Principal"
 *         descrip:
 *           type: string
 *           example: "Espacio amplio con sonido y sillas incluidas"
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
 */
router.get('/get', spaceController.get);

export default router
