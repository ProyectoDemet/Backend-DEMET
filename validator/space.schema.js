import z from "zod";

export const spaceRegisterSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    descrip: z.string().min(1, "La descripción es obligatoria"),
    isPartner: z.boolean(),
    pax: z.number().int().positive("El número de personas debe ser positivo"),
    value4: z.number().positive("El valor por 4 horas debe ser positivo"),
    value8: z.number().positive("El valor por 8 horas debe ser positivo"),
    value_extra: z.number().positive("El valor extra debe ser positivo")
}).strict();


export const spaceUpdateSchema = z.object({
    id_rate: z.number().int().positive("El ID del espacio es obligatorio"),
    name: z.string().min(1, "El nombre es obligatorio"),
    descrip: z.string().min(1, "La descripción es obligatoria"),
    pax: z.number().int().positive("El número de personas debe ser positivo"),
    value4: z.number().positive("El valor por 4 horas debe ser positivo"),
    value8: z.number().positive("El valor por 8 horas debe ser positivo"),
    value_extra: z.number().positive("El valor extra debe ser positivo")
}).strict();


export const spaceDeleteSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio")
}).strict();
