import { partnerRegister, partnerUpdate, partnerDelete, getPartner, isPartner } from "../service/partner.service.js";

export const partnerController = {
    register : async(req, res) =>{
        try {
            //Body de la Request
            const {id, name, email, phoneNumber, cedula} = await req.body;
            //Llamado del Servicio
            await partnerRegister(id, name, email, phoneNumber, cedula);
            //Retornar Respuesta
            return res.status(200).json({message : "Socio Registrado Exitosamente"})
        } catch (error) {
            //Vista del Error en CMD
            console.log('Error en register.partner.controller: ', error)
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
        }
    },
    update : async(req, res) => {
        try {
            //Body de la request
            const {id, name, email, phoneNumber, cedula} = await req.body;
            //Llamado al Servicio
            await partnerUpdate(id, name, email, phoneNumber, cedula);
            //Retornar Respuesta
            return res.status(200).json({message: "Socio Actualizado Exitosamente"})
        } catch (error) {
            //Vista del Error en CMD
            console.log('Error en update.partner.controller: ', error)
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
        }
    },
    delete : async(req, res) => {
        try {
            //Body de la request
            const {id, email} = await req.body;
            //Llamado al servicio
            await partnerDelete(id, email)
            //Retornar Respuesta
            return res.status(200).json({message: "Socio Eliminado Exitosamente"})
        } catch (error) {
            //Vista del Error en CMD
            console.log('Error en delete.partner.controller: ', error)
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
        }
    },
    get : async(req, res) => {
        try {
            //Llamado de Servicio de Obtencion de Socios
            const result = await getPartner();
            //Retornar Resultado
            return res.status(200).json({result : result})
        } catch (error) {
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
        }
    },
    verify : async(req, res) => {
        try {
            //Body
            const {v_idPartner} = await req.body;
            //Llamado al Servicio Verificador de Socios
            const result =  await isPartner(v_idPartner);
            //Retornar Resultado Si es False
            if(!result.verify_partner) return res.status(401).json({message: "Socio No Encontrado", result : result.verify_partner});
            //Retornar Resultado Exitoso
            return res.status(200).json({result : result.verify_partner})
        } catch (error) {
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
        }
    }
}