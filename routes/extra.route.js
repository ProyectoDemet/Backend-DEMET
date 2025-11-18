import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { validateSchema } from '../middleware/validate.js';
import { extraInsertSchema, extraUpdateSchema, extraDeleteSchema } from '../validator/extra.schema.js';
import { extraController } from '../controller/extra.controller.js';

const router = express.Router();

router.post('/register', verifyToken, validateSchema(extraInsertSchema), extraController.register);

router.put('/update', verifyToken, validateSchema(extraUpdateSchema), extraController.update);

router.delete('/delete', verifyToken, validateSchema(extraDeleteSchema), extraController.delete);

router.get('/get', verifyToken, extraController.get);

export default router