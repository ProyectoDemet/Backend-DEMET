import express from 'express';
import { verifyRol } from '../middleware/rolAccess.js';
import { validateSchema } from '../middleware/validate.js';
import { partnerSchema, partnerDeleteSchema, partnerIdSchema } from '../validator/partner.schema.js';
import { partnerController } from "../controller/partner.controller.js";

const router = express.Router();

/**
 * @swagger
 * /partner/register:
 *   post:
 *     summary: Registrar un nuevo socio
 *     tags: [Partner]
 *     description: >
 *       Esta ruta permite registrar un nuevo socio.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       es obtenido automáticamente desde la cookie `access_token`.
 *     security:
 *       - cookieAuth: []       # se usa cookie en lugar de Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partner'
 *     responses:
 *       200:
 *         description: Socio registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Socio Registrado Exitosamente"
 *       400:
 *         description: Error de validación en los datos del socio
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       500:
 *         description: Error interno del servidor
 */

 /**
  * @swagger
  * components:
  *   securitySchemes:
  *     cookieAuth:
  *       type: apiKey
  *       in: cookie
  *       name: access_token
  *   schemas:
  *     Partner:
  *       type: object
  *       properties:
  *         id:
  *           type: string
  *           example: "P001"
  *         name:
  *           type: string
  *           example: "Carlos Rodríguez"
  *         email:
  *           type: string
  *           example: "carlos.rodriguez@example.com"
  *         phoneNumber:
  *           type: number
  *           example: 3215667890
  *         cedula:
  *           type: number
  *           example: 1234567890
  */
//Ruta para registrar Socio
router.post('/register', verifyRol, validateSchema(partnerSchema), partnerController.register);
/**
 * @swagger
 * /partner/update:
 *   put:
 *     summary: Actualizar información de un socio existente
 *     tags: [Partner]
 *     description: >
 *       Esta ruta permite actualizar la información de un socio ya registrado.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       se obtiene automáticamente desde la cookie `access_token`.
 *     security:
 *       - cookieAuth: []       # se usa cookie en lugar del encabezado Authorization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Partner'
 *     responses:
 *       200:
 *         description: Socio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Socio Actualizado Exitosamente"
 *       400:
 *         description: Error de validación en los datos del socio o datos duplicados
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       404:
 *         description: Socio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
//Ruta para Actualizar Socio
router.put('/update', verifyRol, validateSchema(partnerSchema), partnerController.update);
/**
 * @swagger
 * /partner/delete:
 *   delete:
 *     summary: Eliminar un socio existente
 *     tags: [Partner]
 *     description: >
 *       Esta ruta permite eliminar un socio existente del sistema.  
 *       El usuario debe estar autenticado, ya que el token JWT se obtiene desde la cookie `access_token`.  
 *       Se requiere proporcionar tanto el identificador del socio como su correo electrónico para confirmar la eliminación.
 *     security:
 *       - cookieAuth: []       # autenticación basada en cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PartnerDelete'
 *     responses:
 *       200:
 *         description: Socio eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Socio Eliminado Exitosamente"
 *       400:
 *         description: Socio no encontrado o datos inválidos
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PartnerDelete:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "P001"
 *         email:
 *           type: string
 *           example: "carlos.rodriguez@example.com"
 */
//Ruta para Eliminar Socio
router.delete('/delete', verifyRol, validateSchema(partnerDeleteSchema), partnerController.delete);

/**
 * @swagger
 * /partner/get:
 *   get:
 *     summary: Obtener la lista completa de socios
 *     tags: [Partner]
 *     description: >
 *       Esta ruta permite obtener todos los socios registrados en el sistema.  
 *       El usuario debe haber iniciado sesión previamente, ya que el token JWT
 *       se obtiene automáticamente desde la cookie `access_token`.
 *     security:
 *       - cookieAuth: []      # autenticación basada en cookie
 *     responses:
 *       200:
 *         description: Lista de socios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partner'
 *       401:
 *         description: Token no enviado o inválido (cookie ausente o expirada)
 *       500:
 *         description: Error interno del servidor
 */
router.get('/get', verifyRol, partnerController.get);

/**
 * @swagger
 * /partner/verify:
 *   post:
 *     summary: Verificar si un usuario es socio activo
 *     tags: [Partner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - v_idPartner
 *             properties:
 *               v_idPartner:
 *                 type: string
 *                 example: "123456789"
 *                 description: ID del socio a verificar.
 *     responses:
 *       200:
 *         description: Socio verificado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Socio no encontrado o no válido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Socio No Encontrado"
 *                 result:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error inesperado en el servidor"
 */
router.post('/verify', validateSchema(partnerIdSchema), partnerController.verify);

export default router;
