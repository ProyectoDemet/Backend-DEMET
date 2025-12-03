import pool from "../lib/db.js";
import { errorHandler } from "../util/errorHandler.js";

//Servicio de Registro de Espacios
export const spaceRegister = async(v_name, v_descrip, v_isPartner, v_pax, v_value4, v_value8, v_value_extra, v_url_img) => {
    try {
        await pool.query(
            'CALL p_insert_space($1,$2,$3,$4,$5,$6,$7,$8);',
            [
                v_name, 
                v_descrip, 
                v_isPartner,
                v_pax, 
                v_value4, 
                v_value8, 
                v_value_extra,
                v_url_img
            ]
        )
    } catch (error) {
        errorHandler(error)
    }
}

//Servicio de Actualizar de Espacios
export const spaceUpdate = async(v_id_rate,v_name,v_descrip,v_pax,v_value4, v_value8, v_value_extra, v_url_img) => {
    try {
        await pool.query(
            'CALL p_update_space($1,$2,$3,$4,$5,$6,$7,$8);',
            [
                v_id_rate,
                v_name,
                v_descrip,
                v_pax,
                v_value4, 
                v_value8, 
                v_value_extra,
                v_url_img
            ]
        )
    } catch (error) {
        errorHandler(error)
    }
}
//Servicio de Eliminar de Espacios
export const spaceDelete = async(v_name) => {
    try {
        await pool.query(
            'CALL p_delete_space($1);',
            [v_name]
        )
    } catch (error) {
        errorHandler(error)
    }
}
//Servicio de Obtencion de Espacios
export const spaceget = async() => {
    try {
        const result = await pool.query(
            'SELECT * FROM get_spaces;'
        );
        return result.rows
    } catch (error) {
        errorHandler(error)
    }
}

//Servicio de Obtencion de Nombre del Espacio Segun ID de Tarifa
export const spaceNameByRate = async(id_rate) => {
    try {
        const result = await pool.query(
            'SELECT name FROM get_spaces WHERE id_rate = ($1) LIMIT 1;',
            [id_rate]
        );
        return result.rows[0]
    } catch (error) {
        errorHandler(error)
    }
}

export const occupiedSpaces = async(v_space) => {
    try {
        const result = await pool.query(
            'SELECT * FROM occupiedSpaces($1);',
            [v_space]
        );
        return result.rows
    } catch (error) {
        errorHandler(error)
    }
}