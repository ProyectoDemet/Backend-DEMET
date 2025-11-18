import z from "zod";

export const spaceRegisterSchema = z.object({
    v_name: z.string().min(1, "El nombre es obligatorio"),
    v_descrip: z.string().min(1, "La descripción es obligatoria"),
    v_isPartner: z.boolean(),
    v_pax: z.number().int().positive("El número de personas debe ser positivo"),
    v_value4: z.number().positive("El valor por 4 horas debe ser positivo"),
    v_value8: z.number().positive("El valor por 8 horas debe ser positivo"),
    v_value_extra: z.number().positive("El valor extra debe ser positivo")
}).strict();


export const spaceUpdateSchema = z.object({
    v_id_rate: z.number().int().positive("El ID del espacio es obligatorio"),
    v_name: z.string().min(1, "El nombre es obligatorio"),
    v_descrip: z.string().min(1, "La descripción es obligatoria"),
    v_pax: z.number().int().positive("El número de personas debe ser positivo"),
    v_value4: z.number().positive("El valor por 4 horas debe ser positivo"),
    v_value8: z.number().positive("El valor por 8 horas debe ser positivo"),
    v_value_extra: z.number().positive("El valor extra debe ser positivo")
}).strict();


export const spaceDeleteSchema = z.object({
    v_name: z.string().min(1, "El nombre es obligatorio")
}).strict();
