import pool from "../lib/db.js";
import bcrypt from "bcrypt";
import JWT from 'jsonwebtoken';

export const hashed = async(password) => {
    return await bcrypt.hash(password, 8)
}

export const comparePassword = async(password, passwordDb) => {
    return await bcrypt.compare(password, passwordDb)
}

export const RegisterEmployee = async(name, email, password, rol) => {
    const result = await pool.query(
        'INSERT INTO EMPLOYEE(NAME, EMAIL, PASSWORD, ROL) VALUES($1,$2,$3,$4);',
    [name, email, password, rol]);
    return result.rows[0];
}

export const findEmail = async(email) => {
    const result = await pool.query(
        'SELECT * FROM f_login_employee($1);',
        [email]
    );
    return result.rows[0]
}

export const generateAccessToken = (employee) => {
    return JWT.sign({
        id_employee : employee.id_employee,
        role : employee.rol
    },
    process.env.ACCESS_SECRET,
    {expiresIn: process.env.ACCESS_EXPIRE_IN});
}

export const verifyAccessToken = (token) => {
    return JWT.verify(token, process.env.ACCESS_SECRET)
}