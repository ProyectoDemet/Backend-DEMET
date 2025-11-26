import { spaceRegister, spaceUpdate, spaceDelete, spaceget, occupiedSpaces } from "../service/space.service.js";

export const spaceController = {
    register : async(req, res) => {
        try {
            //Body Necesario
            const {v_name, v_descrip, v_isPartner, v_pax, v_value4, v_value8, v_value_extra, v_url_img} = await req.body;
            //Llamado al Servicio de Registro de Espacios
            await spaceRegister(v_name, v_descrip, v_isPartner, v_pax, v_value4, v_value8, v_value_extra, v_url_img);
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
            const {v_id_rate, v_name, v_descrip, v_pax,v_value4, v_value8, v_value_extra, v_url_img} = await req.body;
            //Llamado al Servicio de Actualizacion de Espacios
            await spaceUpdate(v_id_rate, v_name, v_descrip, v_pax,v_value4, v_value8, v_value_extra, v_url_img);
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
            const {v_name} = await req.body;
            //Llamado al Servicio de Eliminacion de Espacios
            await spaceDelete(v_name);
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
            //Llamado al Servicio de Obtencion de Espacios
            const result = await spaceget();
            //Retornar Respuesta
            return res.status(200).json({result : result})
        } catch (error) {
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
        }
    },
    getOccupiedSpaces : async(req, res)=> {
        try {
            //Body
            const {v_space} = await req.body;
            //Llamado al Servicio de Obtencion de Espacios
            const result = await occupiedSpaces(v_space);
            //Validar Cantidad de Datos Recibidos
            if(result.length === 0) return res.status(400).json({result : "No hay reservas para este Espacio"})
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