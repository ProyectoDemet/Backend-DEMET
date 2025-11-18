import { rateRegister, rateUpdate, rateDelete, rateget } from "../service/rate.service.js";

export const rateController = {
    register : async(req, res) => {
        try {
            //Body Necesario
            const {v_name,v_pax, v_value4, v_value8, v_value_extra,v_isPartner,v_idSpace} = await req.body;
            //Llamado al Servicio de Registro de Tarifas
            await rateRegister(v_name,v_pax, v_value4, v_value8, v_value_extra,v_isPartner,v_idSpace);
            //Retornar Respuesta
            return res.status(200).json({message:'Registro Exitoso'})
        } catch (error) {
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
        }
    },
    update : async(req, res) => {
        try {
            //Body Necesario
            const {v_id_rate,v_name,v_pax,v_value4, v_value8, v_value_extra} = await req.body;
            //Llamado al Servicio de Actualizacion de Tarifas
            await rateUpdate(v_id_rate,v_name,v_pax,v_value4, v_value8, v_value_extra);
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
            const {v_id_rate} = await req.body;
            //Llamado al Servicio de Eliminacion de Tarifas
            await rateDelete(v_id_rate);
            //Retornar Respuesta
            return res.status(200).json({message:'Eliminacion Exitosa'})
        } catch (error) {
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
        }
    },
    get : async(req, res) => {
        try {
            //Llamado al Servicio de Obtencion de Tarifas
            const result = await rateget();
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