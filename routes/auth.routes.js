import express from 'express';
import AuthController from "../controller/auth.controller.js";
import { validateSchema } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validator/auth.schema.js';
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
router.post("/signup", verifyToken, validateSchema(registerSchema), AuthController.register);
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

export default router;
