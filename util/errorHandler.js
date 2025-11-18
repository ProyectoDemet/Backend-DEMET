import { AppError } from "./AppError.js";

//Mapa de errores personalizados provenientes de PostgreSQL (RAISE EXCEPTION)
const pgErrorMap = [
    //Autenticación / Identidad
    { text: 'EMAIL DESCONOCIDO', msg: 'EMAIL DESCONOCIDO', status: 404 },
    { text: 'EMAIL EN USO', msg: 'EMAIL EN USO', status: 409 },

    //Socios
    { text: 'SOCIO NO ENCONTRADO', msg: 'Socio No Encontrado, Porfavor Verifique su Identificador', status: 404 },
    { text: 'VERIFIQUE VALORES DE CEDULA', msg: 'Numero de Cedula Invalido', status: 400 },

    //Validaciones de valores
    { text: 'NO SE PERMITE VALORES NEGATIVOS', msg: 'NO SE PERMITE VALORES NEGATIVOS', status: 400 },
    { text: 'NO SE PERMITEN VALORES NEGATIVOS O NULOS', msg: 'NO SE PERMITEN VALORES NEGATIVOS O NULOS', status: 400 },

    //Espacios
    { text: 'ESPACIOS PARA SOCIO Y CLIENTES YA ESTAN REGISTRADOS', msg: 'ESPACIOS PARA SOCIO Y CLIENTES YA ESTAN REGISTRADOS', status: 409 },
    { text: 'ESPACIO REGISTRADO ANTERIORMENTE', msg: 'ESPACIO REGISTRADO ANTERIORMENTE', status: 409 },
    { text: 'ESPACIO NO ENCONTRADO', msg: 'ESPACIO NO ENCONTRADO', status: 404 },
    { text: 'ESPACIO OCUPADO EN ESE MOMENTO', msg: 'ESPACIO OCUPADO EN ESE MOMENTO', status: 409 },

    //Tarifas
    { text: 'ERROR EN CONSISTENCIA DE DATOS, VERIFIQUE ID RATE', msg: 'ERROR EN CONSISTENCIA DE DATOS, VERIFIQUE ID RATE', status: 400 },
    { text: 'TARIFA PARA SOCIO Y CLIENTES YA ESTA REGISTRADA', msg: 'TARIFA PARA SOCIO Y CLIENTES YA ESTA REGISTRADA', status: 409 },
    { text: 'TARIFA REGISTRADA ANTERIORMENTE', msg: 'TARIFA REGISTRADA ANTERIORMENTE', status: 409 },
    { text: 'TARIFA NO ENCONTRADA', msg: 'TARIFA NO ENCONTRADA', status: 404 },

    //Objetos Extra
    { text: 'Objeto ya existente, porfavor elija otro Nombre', msg: 'Objeto ya existente, porfavor elija otro Nombre', status: 409 },
    { text: 'OBJETO NO ENCONTRADO', msg: 'OBJETO NO ENCONTRADO', status: 404 },

    //Reservas
    { text: 'CODIGO DE RESERVA EN USO', msg: 'CODIGO DE RESERVA EN USO', status: 409 },
    { text: 'VALORES DUPLICADOS', msg: 'Cedula o Identificador en Uso', status: 409 },
    { text: 'EL INICIO DE LA RESERVA NO PUEDE SER MAYOR A SU CULMINACION', msg: 'EL INICIO DE LA RESERVA NO PUEDE SER MAYOR A SU CULMINACION', status: 400 },
    { text: 'AFORO MAXIMO SOBREPASADO', msg: 'AFORO MAXIMO SOBREPASADO', status: 400 },
    { text: 'RESERVA NO ENCONTRADA', msg: 'RESERVA NO ENCONTRADA', status: 404 },

    //Requests
    { text: 'REQUEST NO ENCONTRADA', msg: 'REQUEST NO ENCONTRADA', status: 404 }
];


export const errorHandler = (error) => {
    //ERRORES NATIVOS DE POSTGRES
    if (error.code === '23505') {
        throw new AppError("Algun Atributo Unico en Uso", 400);
    }
    if (error.code === 'ECONNREFUSED') {
        throw new AppError("No se pudo conectar con la base de datos", 503);
    }
    if (error.code === '22P02') {
        throw new AppError("Formato de dato inválido", 400);
    }

    //ERRORES DEFINIDOS POR PROCEDURES
    const found = pgErrorMap.find(e => error.message.includes(e.text));

    if (found) {
        throw new AppError(found.msg, found.status);
    }

    //ERROR NO CONTROLADO
    throw new AppError(error.message, 500);
};
