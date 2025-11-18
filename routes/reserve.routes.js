import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { validateSchema } from '../middleware/validate.js';
import { insertReservationSchema, updateReservationSchema, deleteReservationSchema } from '../validator/reserve.schema.js';
import { reserveController } from '../controller/reserve.controller.js';

const router = express.Router();

router.post('/register', verifyToken, validateSchema(insertReservationSchema), reserveController.register);

router.put('/update', verifyToken, validateSchema(updateReservationSchema), reserveController.update);

router.delete('/delete', verifyToken, validateSchema(deleteReservationSchema), reserveController.delete);

router.get('/get', verifyToken, reserveController.get);

export default router