import z, { email } from "zod";

//Esquema de validación cuanto al registro/Actualiza de Socios
export const partnerSchema = z.object({
    id: z.string(),
    name : z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    cedula: z.number().positive()
}).strict()

//Esquema de validación cuanto a la eliminación de Socios
export const partnerDeleteSchema = z.object({
    id: z.string(),
    email: z.string().email()
}).strict()

//Esquema Validacion de ID
export const partnerIdSchema = z.object({
    v_idPartner: z.string(),
}).strict()
