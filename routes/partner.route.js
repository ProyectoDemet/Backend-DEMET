import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { validateSchema } from '../middleware/validate.js';
import { partnerSchema, partnerDeleteSchema } from '../validator/partner.schema.js';
import { partnerController } from "../controller/partner.controller.js";

const router = express.Router();

//Ruta para registrar Socio
router.post('/register', verifyToken, validateSchema(partnerSchema), partnerController.register);
//Ruta para Actualizar Socio
router.put('/update', verifyToken, validateSchema(partnerSchema), partnerController.update);
//Ruta para Eliminar Socio
router.delete('/delete', verifyToken, validateSchema(partnerDeleteSchema), partnerController.delete);

export default router;
