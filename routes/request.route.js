import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { validateSchema } from '../middleware/validate.js';
import { requestRegisterSchema, idRequestSchema, updateStatusSchema } from '../validator/request.schema.js';
import { requestController } from '../controller/request.controller.js';

const router = express.Router();

//Ruta Registro de Request provenientes de Clientes/Socios
router.post('/register', validateSchema(requestRegisterSchema), requestController.register); 

//Ruta de Actualizacion de Status de la Request del Cliente/Socio
router.put('/update', verifyToken, validateSchema(updateStatusSchema), requestController.update);

//Ruta de Eliminacion de Request de Clientes/Socios
router.delete('/delete', verifyToken, validateSchema(idRequestSchema), requestController.delete);

//Ruta de Obtencion de Requests realizadas por Clientes/Socios
router.get('/get', verifyToken, requestController.get);

export default router