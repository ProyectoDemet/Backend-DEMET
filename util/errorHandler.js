import { AppError } from "./AppError.js";

//Manejador de Errores
export const errorHandler = (error) => {
    //Error 23505 -> Valores Duplicados
    if(error.code == '23505') {
        throw new AppError('Algun Atributo Unico en Uso', 400)
    }
    //Error de Conexion
    if (error.code === 'ECONNREFUSED') {
        throw new AppError("No se pudo conectar con la base de datos", 503);
    }
    // Error de formato en PostgreSQL
    if (error.code === '22P02') { 
        throw new AppError("Formato de dato inválido", 400);
    }
    //Manejo de Errores Personalizados
    //Son Errores Provenientes de RAISE EXCEPTION de Procedures
    if(error.message.includes('SOCIO NO ENCONTRADO')) {
        throw new AppError("Socio No Encontrado, Porfavor Verifique su Identificador", 404);
    }
    if(error.message.includes('VERIFIQUE VALORES DE CEDULA')) {
        throw new AppError("Numero de Cedula Invalido", 400);
    }
    if(error.message.includes('VALORES DUPLICADOS')) {
        throw new AppError("Cedula o Identificador en Uso", 400);
    }
    //Error de otra Indole dentro de la DataBase
    throw new AppError(error.message, 500);
}