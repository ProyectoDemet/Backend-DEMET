import { requestRegister, updateStatus, requestDelete, get_requests } from "../service/request.service.js";

export const requestController = {
    register : async(req, res) => {
        try {
            //Body de la request
            const {v_tittle,v_description,v_name,v_email,v_phone_number,v_is_partner,v_pax,v_init_date,v_end_date,v_fk_rate} = await req.body;
            //Llamado al servicio de Registrar Request
            await requestRegister(v_tittle,v_description,v_name,v_email,v_phone_number,v_is_partner,v_pax,v_init_date,v_end_date,v_fk_rate);
            //Retornar respuesta
            return res.status(200).json({message:'Request Registrada Exitosamente'})
        } catch (error) {
            //Obtener el Status del Error, o por default 500
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message:error.message})
        }
    },
    update : async(req, res) => {
        try {
            //Body de la request
            const {v_id_request} = await req.body;
            //Llamado del Servicio de Actualizacion de Status
            await updateStatus(v_id_request);
            //Retornar respuesta
            return res.status(200).json({message:'Status Actualizado'})
        } catch (error) {
            //Obtener el Status del Error, o por default 500
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message:error.message})
        }
    },
    delete : async(req, res) => {
        try {
            //Body de la request
            const {v_id_request} = await req.body;
            //Llamado del Servicio de Eliminacion de request
            await requestDelete(v_id_request);
            //Retornar respuesta
            return res.status(200).json({message:'Request Eliminada'})
        } catch (error) {
            //Obtener el Status del Error, o por default 500
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message:error.message})
        }
    },
    get : async(req, res) => {
        try {
            //Llamado al servicio de visualizacion de requests
            const result = await get_requests();
            //Retornar resultados
            return res.status(200).json({result: result})
        } catch (error) {
            //Obtener el Status del Error, o por default 500
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message:error.message})
        }
    }
}