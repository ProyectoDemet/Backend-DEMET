import pool from "../lib/db.js";
import { errorHandler } from "../util/errorHandler.js";

export const partnerRegister = async(id, name, email, phoneNumber, cedula) => {
    try {
        await pool.query(
            'CALL insert_partner($1,$2,$3,$4,$5);',
            [id, name, email, phoneNumber, cedula]
        );
    } catch (error) {
        //Vista del Error en CMD
        console.log("Error en partnerRegister.partner.service: ", error)
        //Controlador de Errores
        errorHandler(error)
    }
}

export const partnerUpdate = async(id, name, email, phoneNumber, cedula) => {
    try {
        await pool.query(
            'CALL update_Partner($1,$2,$3,$4,$5);',
            [id, name, email, phoneNumber, cedula]
        );
    } catch (error) {
        //Vista del Error en CMD
        console.log("Error en partnerUpdate.partner.service: ", error)
        //Controlador de Errores
        errorHandler(error)
    }
}

export const partnerDelete = async(id, email) => {
    try {
        await pool.query(
            'CALL delete_partner($1,$2);',
            [id, email]
        );
    } catch (error) {
        //Vista del Error en CMD
        console.log("Error en partnerDelete.partner.service: ", error)
        //Controlador de Errores
        errorHandler(error)
    }
}

//SERVICIO DE OBTENCION DE SOCIOS
export const getPartner = async() => {
    try {
        const result = await pool.query(
            'SELECT * FROM PARTNER;'
        );
        //RETORNAR RESULTADO
        return result.rows;
    } catch (error) {
        errorHandler(error)
    }
} 

//SERVICIO VERIFICACION DE SOCIO
export const isPartner = async(idPartner) => {
    try {
        const result = await pool.query(
            'SELECT verify_partner($1);',
            [idPartner]
        );
        //RETORNAR RESULTADO
        return result.rows[0];
    } catch (error) {
        errorHandler(error)
    }
} 