import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { validateSchema } from '../middleware/validate.js';
import { rateRegisterSchema, rateUpdateSchema, rateDeleteSchema } from '../validator/rate.schema.js';
import { rateController } from '../controller/rate.controller.js';

const router = express.Router();

router.post('/register', verifyToken, validateSchema(rateRegisterSchema), rateController.register);

router.put('/update', verifyToken, validateSchema(rateUpdateSchema), rateController.update);

router.delete('/delete', verifyToken, validateSchema(rateDeleteSchema), rateController.delete);

router.get('/get', verifyToken, rateController.get);

export default router
