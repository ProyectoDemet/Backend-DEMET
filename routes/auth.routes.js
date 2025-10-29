import express from 'express';
import AuthController from "../controller/auth.controller.js";
import { validateSchema } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validator/auth.schema.js';

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
router.post("/signup", validateSchema(registerSchema), AuthController.register);
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
router.post("/login", validateSchema(loginSchema), AuthController.login);

export default router;
