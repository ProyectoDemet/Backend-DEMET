import pool from "../lib/db.js";
import { errorHandler } from "../util/errorHandler.js";

//Servicio de Registro de Reservas
export const reserveRegister = async(
    v_id_reservation,
	v_name,
	v_email,
	v_phone_number,
	v_init_date,
	v_end_date,
	v_pax,
	v_status,
	v_extras,
	v_amount,
	v_total_value,
	v_fk_rate,
	v_fk_employee 
) => {
    try {
        await pool.query(
            'CALL p_insert_reservation($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);',
            [
                v_id_reservation,
                v_name,
                v_email,
                v_phone_number,
                v_init_date,
                v_end_date,
                v_pax,
                v_status,
                v_extras,
                v_amount,
                v_total_value,
                v_fk_rate,
                v_fk_employee 
            ]
        )
    } catch (error) {
        errorHandler(error)
    }
}

//Servicio de Actualizar de Reservas
export const reserveUpdate = async(
    v_id_reservation,
	v_email,
	v_phone_number,
	v_init_date,
	v_end_date,
	v_pax,
	v_status,
	v_extras,
	v_amount,
	v_total_value,
	v_fk_rate,
	v_fk_employee
) => {
    try {
        await pool.query(
            'CALL p_update_reservation($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);',
            [
                v_id_reservation,
                v_email,
                v_phone_number,
                v_init_date,
                v_end_date,
                v_pax,
                v_status,
                v_extras,
                v_amount,
                v_total_value,
                v_fk_rate,
                v_fk_employee
            ]
        )
    } catch (error) {
        errorHandler(error)
    }
}
//Servicio de Eliminar de Reservas
export const reserveDelete = async(v_id_reservation) => {
    try {
        await pool.query(
            'CALL p_delete_reservation($1);',
            [v_id_reservation]
        )
    } catch (error) {
        errorHandler(error)
    }
}
//Servicio de Obtencion de Reservas
export const reserveGet = async() => {
    try {
        const result = await pool.query(
            'SELECT * FROM RESERVATION;'
        );
        return result.rows
    } catch (error) {
        errorHandler(error)
    }
}