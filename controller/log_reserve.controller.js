import { logReservationGet } from "../service/log_reserve.service.js";

export const logsReserveController = {
    get : async(req, res) => {
        try {
            //Llamado al Servicio
            const result = await logReservationGet();
            //Retornar Resultados
            return res.status(200).json({result : result})
        } catch (error) {
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
        }
    }
}