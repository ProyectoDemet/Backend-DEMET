import pool from "../lib/db.js";
import { errorHandler } from "../util/errorHandler.js";

//Servicio de Registro de Tarifas
export const rateRegister = async(
    v_name,
    v_pax, 
    v_value4, 
    v_value8, 
    v_value_extra,
    v_isPartner,
    v_idSpace
) => {
    try {
        await pool.query(
            'CALL p_insert_rate($1,$2,$3,$4,$5,$6,$7);',
            [
                v_name,
                v_pax, 
                v_value4, 
                v_value8, 
                v_value_extra,
                v_isPartner,
                v_idSpace
            ]
        )
    } catch (error) {
        errorHandler(error)
    }
}

//Servicio de Actualizar de Tarifas
export const rateUpdate = async(
    v_id_rate,
    v_name,
    v_pax,
    v_value4, 
    v_value8, 
    v_value_extra
) => {
    try {
        await pool.query(
            'CALL p_update_rate($1,$2,$3,$4,$5,$6);',
            [
                v_id_rate,
                v_name,
                v_pax,
                v_value4, 
                v_value8, 
                v_value_extra
            ]
        )
    } catch (error) {
        errorHandler(error)
    }
}
//Servicio de Eliminar de Tarifas
export const rateDelete = async(v_id_rate) => {
    try {
        await pool.query(
            'CALL p_delete_rate($1);',
            [v_id_rate]
        )
    } catch (error) {
        errorHandler(error)
    }
}
//Servicio de Obtencion de Tarifas
export const rateget = async() => {
    try {
        const result = await pool.query(
            'SELECT * FROM get_rates;'
        );
        return result.rows
    } catch (error) {
        errorHandler(error)
    }
}