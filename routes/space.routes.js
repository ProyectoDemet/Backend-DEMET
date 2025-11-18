import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { validateSchema } from '../middleware/validate.js';
import { spaceRegisterSchema, spaceDeleteSchema, spaceUpdateSchema } from '../validator/space.schema.js';
import { spaceController } from '../controller/space.controller.js';

const router = express.Router();

router.post('/register', verifyToken, validateSchema(spaceRegisterSchema), spaceController.register);

router.put('/update', verifyToken, validateSchema(spaceUpdateSchema), spaceController.update);

router.delete('/delete', verifyToken, validateSchema(spaceDeleteSchema), spaceController.delete);

router.get('/get', verifyToken, spaceController.get);

export default router
