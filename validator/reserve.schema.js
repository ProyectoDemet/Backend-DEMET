import { z } from "zod";

//SCHEMA RESERVAS REGISTER
export const insertReservationSchema = z.object({
    v_id_reservation: z.string().min(1).max(10),
    v_name: z.string().min(1),
    v_email: z
        .string()
        .email("El email no es válido"),
    v_phone_number: z
        .string()
        .min(7)
        .max(13),
    v_init_date: z.coerce.date(), 
    v_end_date: z.coerce.date(),
    v_pax: z.number().int().positive(),
    v_status: z.enum(["EN PROGRESO", "FINALIZADO"]),
    v_extras: z.string(),
    v_amount: z.number().nonnegative(),
    v_total_value: z.number().nonnegative(),
    v_fk_rate: z.number().int().positive()
})
.refine(
    (data) => data.v_end_date > data.v_init_date,
    {
        message: "La fecha final debe ser mayor que la fecha de inicio",
        path: ["v_end_date"]
    }
);

//SCHEMA UPDATE RESERVAS
export const updateReservationSchema = z.object({
  v_id_reservation: z.string().max(10),
  v_email: z
    .string()
    .email("El email no es válido"),
  v_phone_number: z
    .string()
    .min(7)
    .max(13),
  v_init_date: z.coerce.date(),
  v_end_date: z.coerce.date(),
  v_pax: z.number().int().positive(),
  v_status: z.enum(["EN PROGRESO", "FINALIZADO"]),
  v_extras: z.string(),
  v_amount: z.number().nonnegative(),
  v_total_value: z.number().nonnegative(),
  v_fk_rate: z.number().int().positive()
})
.refine(
    (data) => data.v_end_date > data.v_init_date,
    {
        message: "La fecha final debe ser mayor que la fecha de inicio",
        path: ["v_end_date"]
    }
);

//SCHEMA DELETE RESERVAS
export const deleteReservationSchema = z.object({
  v_id_reservation: z
    .string()
    .min(1, "El ID de la reserva es obligatorio")
    .max(10, "El ID no puede superar los 10 caracteres")
});
