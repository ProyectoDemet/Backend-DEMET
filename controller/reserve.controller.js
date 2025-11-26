import { reserveRegister, reserveUpdate, reserveDelete, reserveGet } from "../service/reserve.service.js";

export const reserveController = {
    register : async(req, res) => {
            try {
                //Body Necesario
                const { v_id_reservation,v_name,v_email,v_phone_number,v_init_date,v_end_date,v_pax,v_status,v_extras,v_amount,v_total_value,v_fk_rate} = await req.body;
                //Llamado al Servicio de Registro de Reservas
                await reserveRegister(v_id_reservation,v_name,v_email,v_phone_number,v_init_date,v_end_date,v_pax,v_status,v_extras,v_amount,v_total_value,v_fk_rate, req.user.id_employee);
                //Retornar Respuesta
                return res.status(200).json({message:'Registro Exitoso'})
            } catch (error) {
                console.log(error)
                //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
                const status = error.statusCode || 500;
                //Retornar Error
                return res.status(status).json({message: error.message})
            }
        },
        update : async(req, res) => {
            try {
                //Body Necesario
                const {v_id_reservation,v_email,v_phone_number,v_init_date,v_end_date,v_pax,v_status,v_extras,v_amount,v_total_value,v_fk_rate} = await req.body;
                //Llamado al Servicio de Actualizacion de Reserva
                await reserveUpdate(v_id_reservation,v_email,v_phone_number,v_init_date,v_end_date,v_pax,v_status,v_extras,v_amount,v_total_value,v_fk_rate, req.user.id_employee);
                //Retornar Respuesta
                return res.status(200).json({message:'Update Exitoso'})
            } catch (error) {
                //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
                const status = error.statusCode || 500;
                //Retornar Error
                return res.status(status).json({message: error.message})
            }
        },
        delete : async(req, res) => {
            try {
                //Body Necesario
                const {v_id_reservation} = await req.body;
                //Llamado al Servicio de Eliminacion de Reserva
                await reserveDelete(v_id_reservation);
                //Retornar Respuesta
                return res.status(200).json({message:'Eliminacion Exitosa'})
            } catch (error) {
                console.log(error)
                //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
                const status = error.statusCode || 500;
                //Retornar Error
                return res.status(status).json({message: error.message})
            }
        },
        get : async(req, res) => {
            try {
                //Llamado al Servicio de Obtencion de Reservas
                const result = await reserveGet();
                //Retornar Respuesta
                return res.status(200).json({result : result})
            } catch (error) {
                //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
                const status = error.statusCode || 500;
                //Retornar Error
                return res.status(status).json({message: error.message})
            }
        }
}