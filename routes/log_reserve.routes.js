import express from 'express';
import { logsReserveController } from "../controller/log_reserve.controller.js";
import { verifyRol } from '../middleware/rolAccess.js';

const router = express.Router();

router.get('/get', verifyRol, logsReserveController.get);

export default router