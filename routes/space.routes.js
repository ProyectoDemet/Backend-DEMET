import express from 'express';
import { verifyRol } from '../middleware/rolAccess.js';
import { validateSchema } from '../middleware/validate.js';
import { spaceRegisterSchema, spaceDeleteSchema, spaceUpdateSchema, occupiedSpacesSchema } from '../validator/space.schema.js';
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
 *       El usuario debe estar autenticado mediante el token JWT alojado en la cookie
 *       `access_token`.  
 *       Todos los campos enviados son validados usando el esquema `SpaceRegister`,  
 *       incluyendo ahora el arreglo de URLs de imágenes del espacio (`v_url_img`),  
 *       el cual debe contener al menos una imagen válida.
 *     security:
 *       - cookieAuth: []
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
 *         description: Error de validación en los datos enviados
 *       401:
 *         description: Token no enviado, inválido o expirado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SpaceRegister:
 *       type: object
 *       required:
 *         - v_name
 *         - v_descrip
 *         - v_isPartner
 *         - v_pax
 *         - v_value4
 *         - v_value8
 *         - v_value_extra
 *         - v_url_img
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
 *         v_url_img:
 *           type: array
 *           description: Lista de URLs de imagenes del espacio (mínimo 1)
 *           items:
 *             type: string
 *             example: "https://midominio.com/imagenes/salon1.jpg"
 *           example:
 *             - "https://midominio.com/imagenes/salon1.jpg"
 *             - "https://midominio.com/imagenes/salon2.jpg"
 */
router.post('/register', verifyRol, validateSchema(spaceRegisterSchema), spaceController.register);

/**
 * @swagger
 * /space/update:
 *   put:
 *     summary: Actualizar información de un espacio existente
 *     tags: [Space]
 *     description: >
 *       Actualiza los datos de un espacio previamente registrado.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       se obtiene automáticamente desde la cookie `access_token`.  
 *       Es obligatorio enviar el ID del espacio y todos los campos que serán actualizados,
 *       incluyendo el array con las URLs de imágenes del espacio.
 *     security:
 *       - cookieAuth: []
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
 *       required:
 *         - v_id_rate
 *         - v_name
 *         - v_descrip
 *         - v_pax
 *         - v_value4
 *         - v_value8
 *         - v_value_extra
 *         - v_url_img
 *       properties:
 *         v_id_rate:
 *           type: number
 *           description: ID del espacio (tarifa asociada)
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
 *         v_url_img:
 *           type: array
 *           description: Arreglo con URLs de imágenes del espacio
 *           items:
 *             type: string
 *             example: "https://mi-servidor.com/uploads/salon1.jpg"
 *           example:
 *             - "https://mi-servidor.com/uploads/salon1.jpg"
 *             - "https://mi-servidor.com/uploads/salon2.jpg"
 */
router.put('/update', verifyRol, validateSchema(spaceUpdateSchema), spaceController.update);

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

router.delete('/delete', verifyRol, validateSchema(spaceDeleteSchema), spaceController.delete);

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

/**
 * @swagger
 * /space/occupied:
 *   post:
 *     tags:
 *       - Space
 *     summary: Obtener fechas ocupadas según el espacio
 *     description: >
 *       Retorna todas las reservas asociadas a un espacio específico, incluyendo el ID de la reserva,
 *       fecha de inicio y fecha de finalización.  
 *       Si no existen reservas para el espacio solicitado, retornará un mensaje informativo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               v_space:
 *                 type: string
 *                 example: "SALÓN SOCIAL"
 *                 description: Nombre del espacio a consultar.
 *             required:
 *               - v_space
 *     responses:
 *       200:
 *         description: Lista de reservas encontradas para el espacio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID_RESERVATION:
 *                         type: string
 *                         example: "RE001"
 *                       INIT_DATE:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-15T10:00:00.000Z"
 *                       END_DATE:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-01-15T18:00:00.000Z"
 *       400:
 *         description: El espacio no tiene reservas registradas o error en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "No hay reservas para este Espacio"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor"
 */
router.post('/occupied', validateSchema(occupiedSpacesSchema), spaceController.getOccupiedSpaces);

export default router
