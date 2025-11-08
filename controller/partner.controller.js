import { partnerRegister, partnerUpdate, partnerDelete } from "../service/partner.service.js";

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
            //Manejo de Errores Personalizados
            if(error.message.includes('VALORES DUPLICADOS')) {
                return res.status(400).json({message:"Cedula o Identificador en Uso"})
            }
            if(error.message.includes('EMAIL EN USO')) {
                return res.status(400).json({message:"Correo Electronico en Uso"})
            }
            if(error.message.includes('VERIFIQUE VALORES DE CEDULA')) {
                return res.status(400).json({message:"Numero de Cedula Invalido"})
            }
            //Error de Servidor
            return res.status(500).json({error: error.message})
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
            //Manejo de Errores Personalizados
            if(error.message.includes('VALORES DUPLICADOS')) {
                return res.status(400).json({message:"Cedula o Identificador en Uso"})
            }
            if(error.message.includes('SOCIO NO ENCONTRADO')) {
                return res.status(400).json({message:"Socio No Encontrado, Porfavor Verifique su Identificador"})
            }
            if(error.message.includes('VERIFIQUE VALORES DE CEDULA')) {
                return res.status(400).json({message:"Numero de Cedula Invalido"})
            }
            //Error de Servidor
            return res.status(500).json({error: error.message})
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
            //Manejo de Errores Personalizados
            if(error.message.includes('SOCIO NO ENCONTRADO')) {
                return res.status(400).json({message:"Socio No Encontrado, Porfavor Verifique su Identificador"})
            }
            //Error de Servidor
            return res.status(500).json({error: error.message})
        }
    }
}