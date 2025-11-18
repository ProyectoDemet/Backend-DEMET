import { extraRegister, extraDelete, extraUpdate, extraGet } from "../service/extra.service.js";

export const extraController = {
    register : async(req, res) => {
            try {
                //Body Necesario
                const {v_name, v_value_add, v_quantity} = await req.body;
                //Llamado al Servicio de Registro de Extras
                await extraRegister(v_name, v_value_add, v_quantity);
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
                const {v_id_extra, v_name, v_value_add, v_quantity} = await req.body;
                //Llamado al Servicio de Actualizacion de Extras
                await extraUpdate(v_id_extra, v_name, v_value_add, v_quantity);
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
                const {v_id_extra} = await req.body;
                //Llamado al Servicio de Eliminacion de Extras
                await extraDelete(v_id_extra);
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
                const result = await extraGet();
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