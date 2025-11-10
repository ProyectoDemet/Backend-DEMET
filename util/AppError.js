//Crear SubClase que herede de Clase Error
export class AppError extends Error {
    //Declarar Metodo Constructor
    constructor(message, statusCode){
        //Heredar el Metodo Constructor de Error
        //|->Habilitar Atributos como: .message, .stack
        super(message);
        //Agregar Atributos statusCode -> Obtener el status 400/404/401/etc..
        this.statusCode = statusCode;
        //Indicar que es un Error previsto, que se puede manejar
        this.isOperational = true;
    }
}