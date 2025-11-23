import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config()

//Servicio de Creador de Transporte
export const transporterGmail = async() =>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.GOOGLE_USER,
            pass:process.env.GOOGLE_PWD
        }
    })
    return transport;
}
//Servicio de Preparar Correo
export const mailprepare = async(recipient, tittle, body) =>{
    //Preparar Correo
    const mailOptions = {
        from:`"Club del Meta <${process.env.GOOGLE_USER}>"`,
        to:recipient,
        subject:tittle,
        html:body
    }
    return mailOptions;
}
//Servicio de Enviar Correo
export const sendmail = async(transporter, mail) =>{
    return await transporter.sendMail(mail);
}