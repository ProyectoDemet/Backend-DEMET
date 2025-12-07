import express from 'express';
import AuthController from "../controller/auth.controller.js";
import { validateSchema } from '../middleware/validate.js';
import { registerSchema, loginSchema, deleteSchema, updateSchema } from '../validator/auth.schema.js';
import { verifyRol } from '../middleware/rolAccess.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

/**
 * @swagger
 * /intern/signup:
 *   post:
 *     summary: Registrar un nuevo empleado
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               rol:
 *                 type: string
 *                 enum: [Administrador, Asistente de Gerencia]
 *                 example: Administrador
 *     responses:
 *       201:
 *         description: Registro exitoso
 *       400:
 *         description: Error de validación
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeRegister:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           example: "juan@example.com"
 *         password:
 *           type: string
 *           example: "123456"
 *         rol:
 *           type: string
 *           enum: ["Administrador", "Asistente de Gerencia"]
 *           example: "Administrador"
 */
router.post("/signup", verifyRol, validateSchema(registerSchema), AuthController.register);
/**
 * @swagger
 * /intern/login:
 *   post:
 *     summary: Iniciar Sesión Cómo Empleado
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: token
 *       400:
 *         description: Error de Validación
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     EmployeeLogin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "juan@example.com"
 *         password:
 *           type: string
 *           example: "123456"
 */
router.post("/login", validateSchema(loginSchema), AuthController.login);

/**
 * @swagger
 * /intern/refresh:
 *   get:
 *     summary: Renovar Access Token
 *     tags: [Auth]
 *     description: >
 *       Este endpoint permite renovar el *access token* utilizando un *refresh token*
 *       previamente generado y almacenado en una cookie HTTP-only.
 *       El sistema verifica la integridad del refresh token y, si es válido, genera un
 *       nuevo access token y lo envía nuevamente al cliente mediante una cookie segura.
 *
 *     responses:
 *       200:
 *         description: Access token renovado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Access token renovado
 *
 *       401:
 *         description: Refresh token no encontrado en la cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Refresh token no encontrado
 *
 *       400:
 *         description: Error al validar el refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token inválido o expirado
 */
router.get("/refresh", AuthController.refresh);

/**
 * @swagger
 * /intern/logout:
 *   get:
 *     summary: Cerrar sesión
 *     description: >
 *       Elimina las cookies `access_token` y `refresh_token`, cerrando la sesión del usuario.
 *     tags: [Auth]
 *
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               message: "Sesión cerrada"
 *
 *       400:
 *         description: Error inesperado al intentar cerrar sesión.
 *         content:
 *           application/json:
 *             example:
 *               error: "Error interno"
 */
router.get("/logout", AuthController.logout);

/**
 * @swagger
 * /intern/get:
 *   get:
 *     summary: Obtener la lista de empleados registrados
 *     description: >
 *       Retorna una lista completa de empleados.  
 *       Esta ruta está protegida y requiere un rol válido mediante el middleware `verifyRol`.
 *     tags: [Auth]
 * 
 *     security:
 *       - cookieAuth: []
 *
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente.
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
 *                       id_employee:
 *                         type: integer
 *                         example: 4
 *                       name:
 *                         type: string
 *                         example: Paula
 *                       email:
 *                         type: string
 *                         example: Paa@GMAIL.COM
 *                       rol:
 *                         type: string
 *                         example: Administrador
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-18T06:13:41.005Z
 *
 *       401:
 *         description: No autorizado. El usuario no tiene permisos para acceder a este recurso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No autorizado
 *
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */

router.get('/get', verifyRol, AuthController.get);

/**
 * @swagger
 * /intern/me:
 *   get:
 *     summary: Obtener el rol del usuario autenticado
 *     description: >
 *       Retorna el **rol del empleado autenticado**, siempre y cuando:
 *       - Exista un `access_token` válido en las cookies  
 *       - El usuario tenga el rol **Administrador**  
 *       
 *       Este endpoint utiliza el middleware **verifyRol**, el cual:
 *       - Verifica el token JWT
 *       - Valida que el usuario tenga permisos de Administrador
 *       - Coloca la información del usuario en `req.user`
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       201:
 *         description: Rol obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: string
 *                   example: "Administrador"
 *       401:
 *         description: Token no enviado, inválido o usuario no autorizado
 *         content:
 *           application/json:
 *             examples:
 *               tokenNotSent:
 *                 summary: Token no enviado
 *                 value:
 *                   auth: false
 *                   message: "Token No Enviado"
 *               invalidToken:
 *                 summary: Token inválido o expirado
 *                 value:
 *                   auth: false
 *                   message: "Token Invalido o Expirado"
 *               unauthorizedRole:
 *                 summary: Rol no autorizado
 *                 value:
 *                   auth: false
 *                   message: "Usuario/Rol No Autorizado"
 *                   role: "Asistente de Gerencia"
 *       400:
 *         description: Error interno al obtener la información
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.get('/me', verifyToken, AuthController.me);

/**
 * @swagger
 * /intern/update:
 *   put:
 *     summary: Actualizar datos de un empleado
 *     description: Actualiza el correo y rol de un empleado existente. Solo puede ser utilizado por usuarios con rol Administrador.
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - v_idEmployee
 *               - v_email
 *               - v_rol
 *             properties:
 *               v_idEmployee:
 *                 type: integer
 *                 example: 5
 *               v_email:
 *                 type: string
 *                 format: email
 *                 example: "empleado@gmail.com"
 *               v_rol:
 *                 type: string
 *                 enum: ["Administrador", "Asistente de Gerencia"]
 *                 example: "Asistente de Gerencia"
 *     responses:
 *       201:
 *         description: Empleado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Update Exitoso"
 *       400:
 *         description: Error en validación o datos incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email inválido"
 *       401:
 *         description: Token inválido, expirado o usuario no autorizado (rol distinto de Administrador)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Usuario/Rol No Autorizado"
 *       500:
 *         description: Error interno del servidor
 */
router.put('/update', verifyRol, validateSchema(updateSchema), AuthController.update);

/**
 * @swagger
 * /intern/delete:
 *   delete:
 *     summary: Eliminar empleado
 *     description: |
 *       Elimina un empleado del sistema.  
 *       Esta ruta solo puede ser usada por usuarios con el rol **Administrador**.
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - v_idEmployee
 *             properties:
 *               v_idEmployee:
 *                 type: integer
 *                 example: 5
 *                 description: ID del empleado a eliminar.
 *
 *     responses:
 *       201:
 *         description: Empleado eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Delete Exitoso
 *
 *       400:
 *         description: Error en los datos enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Numero debe ser Entero Positivo
 *
 *       401:
 *         description: Token no enviado, inválido o usuario sin permisos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Usuario/Rol No Autorizado
 *
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error interno del servidor
 */
router.delete('/delete', verifyRol, validateSchema(deleteSchema), AuthController.delete);

export default router;
