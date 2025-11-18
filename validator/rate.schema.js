import z from "zod";

export const rateRegisterSchema = z.object({
    v_name: z.string().min(1, "El nombre es obligatorio"),
    v_pax: z.number().int().positive("El número de personas debe ser positivo"),
    v_value4: z.number().positive("El valor por 4 horas debe ser positivo"),
    v_value8: z.number().positive("El valor por 8 horas debe ser positivo"),
    v_value_extra: z.number().positive("El valor extra debe ser positivo"),
    v_isPartner: z.boolean(),
    v_idSpace: z.number().int().positive("El ID del espacio debe ser un número positivo")
}).strict();


export const rateUpdateSchema = z.object({
    v_id_rate: z.number().int().positive("El ID de la tarifa es obligatorio"),
    v_name: z.string().min(1, "El nombre es obligatorio"),
    v_pax: z.number().int().positive("El número de personas debe ser positivo"),
    v_value4: z.number().positive("El valor por 4 horas debe ser positivo"),
    v_value8: z.number().positive("El valor por 8 horas debe ser positivo"),
    v_value_extra: z.number().positive("El valor extra debe ser positivo")
}).strict();


export const rateDeleteSchema = z.object({
    v_id_rate: z.number().int().positive("El ID de la tarifa es obligatorio")
}).strict();
