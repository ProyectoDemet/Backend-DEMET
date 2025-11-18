import z from "zod";

export const extraInsertSchema = z.object({
  v_name: z.string().min(1, "El nombre es obligatorio"),
  v_value_add: z.number().positive("El valor adicional debe ser un número positivo"),
  v_quantity: z.number().int().positive("La cantidad debe ser un entero positivo")
}).strict();

export const extraUpdateSchema = z.object({
  v_id_extra: z.number().int().positive("El ID del extra debe ser un número positivo"),
  v_name: z.string().min(1, "El nombre es obligatorio"),
  v_value_add: z.number().positive("El valor adicional debe ser un número positivo"),
  v_quantity: z.number().int().positive("La cantidad debe ser un entero positivo")
}).strict();

export const extraDeleteSchema = z.object({
  v_id_extra: z.number().int().positive("El ID del extra debe ser un número positivo")
}).strict();
