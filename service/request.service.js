import pool from "../lib/db.js";
import { errorHandler } from "../util/errorHandler.js";

//Servicio de Registrar Solicitud
export const requestRegister = async(
    v_tittle,
	v_description,
	v_name,
	v_email,
	v_phone_number,
	v_is_partner,
	v_pax,
	v_init_date,
	v_end_date,
	v_fk_rate
) => {
    try {
        await pool.query(
            "CALL p_insert_request($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);",
            [
                v_tittle,
                v_description,
                v_name,
                v_email,
                v_phone_number,
                v_is_partner,
                v_pax,
                v_init_date,
                v_end_date,
                v_fk_rate
            ]
        );
    } catch (error) {
        errorHandler(error);
    }
}

//Servicio de Actualizacion de Estado
// REQUEST 'PENDIENTE' ->> REQUEST 'EN PROGRESO'
export const updateStatus = async(v_id_request) => {
    try {
        await pool.query(
            "CALL p_update_request($1);",
            [v_id_request]
        );
    } catch (error) {
        errorHandler(error)
    }
}

//Servicio de Eliminacion de request
export const requestDelete = async(v_id_request) => {
    try {
        await pool.query(
            "CALL p_delete_request($1);",
            [v_id_request]
        );
    } catch (error) {
        errorHandler(error)
    }
}

//Servicio de Obtencion de Requests
export const get_requests = async() => {
    try {
        const result = await pool.query(
            "SELECT * FROM get_requests;"
        );
        return result.rows
    } catch (error) {
        errorHandler(error)
    }
}

//Servicio de Cotizacion Automatica
export const get_price = async(v_end_date,v_init_date,v_fk_rate) => {
    try {
        const result = await pool.query(
            "SELECT calculate_Value($1,$2,$3);",
            [v_end_date,v_init_date,v_fk_rate]
        );
        return result.rows[0]
    } catch (error) {
        errorHandler(error)
    }
}