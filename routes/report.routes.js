import Express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { reportController } from "../controller/report.controller.js";

const router = Express.Router();

//Ruta para Descargar Reportes
router.get('/export', verifyToken, reportController.export);

export default router