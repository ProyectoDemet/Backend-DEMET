import pool from "../lib/db.js";
import { errorHandler } from "../util/errorHandler.js";

//Servicio de Obtencion de Reporte Con Valores Reales
export const reportGet = async() => {
    try {
        const result = await pool.query(
            "SELECT * FROM REPORT ORDER BY FECHA;"
        );
        return result.rows;
    } catch (error) {
        errorHandler(error)
    }
}

//Servicio de Obtencion de Reporte con Valores Proyectados
export const estimatedReportGet = async() => {
    try {
        const result = await pool.query(
            "SELECT * FROM estimated_report ORDER BY FECHA;"
        );
        return result.rows;
    } catch (error) {
        errorHandler(error)
    }
}