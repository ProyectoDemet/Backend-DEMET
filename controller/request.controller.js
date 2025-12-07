import { requestRegister, updateStatus, requestDelete, get_requests, get_price } from "../service/request.service.js";
import { spaceNameByRate } from "../service/space.service.js";
import { nameRateById } from "../service/rate.service.js";
import { getAdminEmployee } from "../service/auth.service.js";
import { transporterGmail, mailprepare, sendmail } from "../service/email.service.js";
import { updateStatusTemplate } from "../util/templates/updateStatus.template.js";
import { registerRequestTemplate } from "../util/templates/registerRequest.template.js";
import { adminNotifyRequestTemplate } from "../util/templates/adminNotifyRequest.template.js";

export const requestController = {
    register : async(req, res) => {
        try {
            //Body de la request
            const {v_tittle,v_description,v_name,v_email,v_phone_number,v_is_partner,v_pax,v_init_date,v_end_date,v_fk_rate, v_value} = await req.body;
            //Llamado al servicio de Registrar Request
            await requestRegister(v_tittle,v_description,v_name,v_email,v_phone_number,v_is_partner,v_pax,v_init_date,v_end_date,v_fk_rate);
            //Obtener Nombre del Espacio por medio del Id de la tarifa
            const v_nameSpace = await spaceNameByRate(v_fk_rate);
            //Obtener Nombre de Tarifa por medio del Id de la tarifa
            const v_nameRate = await nameRateById(v_fk_rate);
            //Obtener Email de Administrador
            const v_emailAdmin = await getAdminEmployee();  
            //Envio de Notificacion Via Email
            //Llamado al servicio de Creacion de Transportador
            const transporter = await transporterGmail();
            //Llamado al servicio de preparacion del Email para Cliente
            const mail = await mailprepare(v_email, 'Solicitud Enviada Con Exito', await registerRequestTemplate(v_name, v_pax, v_init_date, v_end_date, v_value, v_nameSpace.name, v_nameRate.tarifa));
            //Llamado al servicio de preparacion del Email para Administrador
            const adminMail = await mailprepare(v_emailAdmin.email, 'Nueva Solicitud', await adminNotifyRequestTemplate(v_name, v_phone_number, v_pax, v_init_date, v_end_date, v_value, v_nameSpace.name, v_nameRate.tarifa));
            //Llamado al servicio de envio de Email Para Cliente
            const result = await sendmail(transporter, mail);
            //Llamado al servicio de envio de Email Para Cliente
            const adminResult = await sendmail(transporter, adminMail);
            //Retornar respuesta
            return res.status(200).json({message:'Request Registrada Exitosamente', info:result.accepted, infoAdmin:adminResult.accepted})
        } catch (error) {
            console.log(error)
            //Obtener el Status del Error, o por default 500
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message:error.message})
        }
    },
    update : async(req, res) => {
        try {
            //Body de la request
            const {v_id_request, v_email} = await req.body;
            //Llamado del Servicio de Actualizacion de Status
            await updateStatus(v_id_request);
            //Envio de Notificacion Via Email
            //Llamado al servicio de Creacion de Transportador
            const transporter = await transporterGmail();
            //Llamado al servicio de preparacion del Email
            const mail = await mailprepare(v_email, 'Solicitud En proceso', updateStatusTemplate);
            //Llamado al servicio de envio de Email
            const result = await sendmail(transporter, mail);
            //Retornar respuesta
            return res.status(200).json({message:'Status Actualizado', info:result.accepted})
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
    },
    price: async(req, res) => {
        try {
            //Body
            const {v_end_date,v_init_date,v_fk_rate} = await req.body;
            //Llamado al servicio de Obtencion de Cotizacion
            const result = await get_price(v_end_date,v_init_date,v_fk_rate);
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