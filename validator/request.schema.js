import z from "zod";

export const requestRegisterSchema = z.object({
    v_tittle : z.string().min(4, "El titulo debe tener minimo 4 Caracteres").max(10, "El titulo debe tener maximo 10 caracteres"),
	v_description : z.string().min(1, "La descripcion debe tener minimo 1 Caracter").max(500, "Descripcion de maximo 500 caracteres"),
    v_name : z.string().min(1, "Nombre debe tener minimo 1 Caracter").max(20, "Nombre debe tener maximo 20 caracteres"),
	v_email : z.string().email("Email inválido"),
	v_phone_number : z.string().min(10, "Numero de telefono tener minimo 10 Caracteres").max(13, "Numero de Telefono debe tener maximo 13 caracteres"),
	v_is_partner : z.boolean(),
	v_pax : z.number().int().positive(),
	v_init_date: z.coerce.date(),
	v_end_date: z.coerce.date(),
	v_fk_rate : z.number().int().positive(),
	v_value: z.number().positive()
}).strict()

export const updateStatusSchema = z.object({
	v_id_request : z.number().int().positive(),
	v_email :  z.string().email("Email inválido")
}).strict()

export const idRequestSchema = z.object({
	v_id_request : z.number().int().positive()
}).strict()

//SCHEMA Obtener Cotizacion
export const getPriceSchema = z.object({ 
    v_end_date: z.coerce.date(),
	v_init_date: z.coerce.date(),
    v_fk_rate: z.number().int().positive()
})
.refine(
    (data) => data.v_end_date > data.v_init_date,
    {
        message: "La fecha final debe ser mayor que la fecha de inicio",
        path: ["v_end_date"]
    }
);