import pool from "../lib/db.js";
import { errorHandler } from "../util/errorHandler.js";

//Servicio de Registro de Extras
export const extraRegister = async(v_name, v_value_add, v_quantity) => {
    try {
        await pool.query(
            'CALL p_insert_extra($1,$2,$3);',
            [v_name, v_value_add, v_quantity]
        )
    } catch (error) {
        errorHandler(error)
    }
}

//Servicio de Actualizar de Extras
export const extraUpdate = async(v_id_extra, v_name, v_value_add, v_quantity) => {
    try {
        await pool.query(
            'CALL p_update_extra($1,$2,$3,$4);',
            [v_id_extra, v_name, v_value_add, v_quantity]
        )
    } catch (error) {
        errorHandler(error)
    }
}
//Servicio de Eliminar de Extras
export const extraDelete = async(v_id_extra) => {
    try {
        await pool.query(
            'CALL p_delete_extra($1);',
            [v_id_extra]
        )
    } catch (error) {
        errorHandler(error)
    }
}
//Servicio de Obtencion de Extras
export const extraGet = async() => {
    try {
        const result = await pool.query(
            'SELECT * FROM EXTRA;'
        );
        return result.rows
    } catch (error) {
        errorHandler(error)
    }
}