import pool from "../lib/db.js";
import { errorHandler } from "../util/errorHandler.js";

//Servicio de Obtencion de Historial de Reservas
export const logReservationGet = async() => {
    try {
        const result = await pool.query(
            "SELECT * FROM log_reservation ORDER BY INIT_DATE;"
        );
        return result.rows;
    } catch (error) {
        errorHandler(error)
    }
}
