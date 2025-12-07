import pool from "../lib/db.js";
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken';
import { errorHandler } from "../util/errorHandler.js";

//Servicio de Hashear Passwords
export const hashed = async(password) => {
    return await bcrypt.hash(password, 8)
}
//Servicio de Comparar Passwords Hasheadas
export const comparePassword = async(password, passwordDb) => {
    return await bcrypt.compare(password, passwordDb)
}
//Servicio de Registro de Empleados
export const RegisterEmployee = async(name, email, password, rol) => {
    try {
        const result = await pool.query(
            'CALL p_insert_employee($1,$2,$3,$4)',
            [name, email, password, rol]);
        return result.rows[0];    
    } catch (error) {
        //Error Usualmente Proviene de Uso de Emails Repetidos
        return false;
    }
    
}

//Servicio de Obtencion de Empleados
export const getEmployees = async() => {
    try {
        const result = await pool.query(
            'SELECT * FROM get_employees;');
        return result.rows;    
    } catch (error) {
        errorHandler(error);
    }
}

//Servicio de Obtencion de Empleados by Id
/*
    Este Email está pensado para:
        1. Ser receptor de correos
        2. Validar Integridad de Emails dentro de la DB
*/
export const getAdminEmployee = async() => {
    try {
        const result = await pool.query(
            `
            SELECT email 
            FROM get_employees
            WHERE EMAIL = ($1)
            AND ROL = 'Administrador'
            LIMIT 1;
            `, [process.env.EMAIL_ADMIN]);
        return result.rows[0];  
    } catch (error) {
        errorHandler(error);
    }
}

//SERVICIO UPDATE EMPLOYEE
export const updateEmployee = async(id_employee, email, rol) => {
    try {
        const result = await pool.query(
            'CALL p_update_employee($1,$2,$3)',
            [id_employee, email, rol]);
        return result.rows[0];    
    } catch (error) {
        errorHandler(error);
    }
}

//SERVICIO DELETE EMPLOYEE
export const deleteEmployee = async(id_employee) => {
    try {
        const result = await pool.query(
            'CALL p_delete_employee($1)',
            [id_employee]);
        return result.rows[0];    
    } catch (error) {
        errorHandler(error);
    }
}

//Servicio de Encontrar el email solicitado en la base de datos
export const findEmail = async(email) => {
    try {
        const result = await pool.query(
            'SELECT * FROM f_login_employee($1);',
            [email]
        );
        return result.rows[0]    
    } catch (error) {
        return error;
    }
    
}
//Servicio de Generacion de Access Token
export const generateAccessToken = (employee) => {
    return JWT.sign({
        id_employee : employee.id_employee,
        role : employee.rol
    },
    process.env.ACCESS_SECRET,
    {expiresIn: process.env.ACCESS_EXPIRE_IN});
}
//Servicio de Verificacion de Access token
export const verifyAccessToken = (token) => {
    return JWT.verify(token, process.env.ACCESS_SECRET)
}
//Servicio de Generacion de Refresh Token
export const generateRefreshToken = (employee) => {
    return JWT.sign({
        id_employee : employee.id_employee,
        role : employee.rol
    },
    process.env.REFRESH_SECRET,
    {expiresIn: process.env.REFRESH_EXPIRE_IN});
}
//Servicio de Verificacion de Refresh Token
export const verifyRefreshToken = (token) => {
    return JWT.verify(token, process.env.REFRESH_SECRET)
}