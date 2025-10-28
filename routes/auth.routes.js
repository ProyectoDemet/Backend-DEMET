import express from 'express';
import AuthController from "../controller/auth.controller.js";
import { validateSchema } from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validator/auth.schema.js';

const router = express.Router();

router.post("/signup", validateSchema(registerSchema), AuthController.register);

router.post("/login", validateSchema(loginSchema), AuthController.login);

export default router;
