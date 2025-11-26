import Express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { reportController } from "../controller/report.controller.js";

const router = Express.Router();

/**
 * @swagger
 * /report/export:
 *   get:
 *     summary: Exportar reportes en formato Excel
 *     tags: [Report]
 *     description: >
 *       Esta ruta permite generar y descargar un archivo Excel que contiene dos reportes:  
 *       **Reporte** y **Reporte Estimado**.  
 *       Ambos conjuntos de datos se obtienen desde la base de datos y se exportan como hojas  
 *       separadas dentro de un único archivo `.xlsx`.  
 *       El usuario debe estar autenticado mediante un token JWT enviado desde la cookie.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Archivo Excel generado y enviado correctamente.
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Token no enviado o inválido.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/export', verifyToken, reportController.export);

export default router