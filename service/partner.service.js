import pool from "../lib/db.js";

export const partnerRegister = async(id, name, email, phoneNumber, cedula) => {
    try {
        await pool.query(
            'CALL insert_partner($1,$2,$3,$4,$5);',
            [id, name, email, phoneNumber, cedula]
        );
    } catch (error) {
        //Vista del Error en CMD
        console.log("Error en partnerRegister.partner.service: ", error)
        //Control de Errores Personalizados dentro de Procedures
        if(error.code == 'P0001') throw new Error(error.message)
        //Error Cuanto a Llaves Duplicadas
        if(error.code == '23505') throw new Error('VALORES DUPLICADOS')
        //Error Generico
        throw new Error("Error en Servicio de Registrar Socios")
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
        //Control de Errores Personalizados dentro de Procedures
        if(error.code == 'P0001') throw new Error(error.message)
        //Error Cuanto a Llaves Duplicadas
        if(error.code == '23505') throw new Error('VALORES DUPLICADOS')
        //Error Generico
        throw new Error("Error en Servicio de Actualizar Socios")
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
        //Control de Errores Personalizados dentro de Procedures
        if(error.code == 'P0001') throw new Error(error.message)
        //Error Generico
        throw new Error("Error en Servicio de Actualizar Socios")
    }
}