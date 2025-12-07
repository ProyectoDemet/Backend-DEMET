import { z } from "zod";

//Esquema de Validacion de Datos de Registro de Empleados
export const registerSchema = z.object({
  name: z.string().min(3, "El nombre debe tener mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  rol: z.enum(["Administrador", "Asistente de Gerencia"], {
    required_error: "El rol es obligatorio",
    invalid_type_error: "Rol inválido. Debe ser 'Administrador' o 'Asistente de Gerencia'"
  })
}).strict();

//Esquema de Validacion de Datos de Update de Empleados
export const updateSchema = z.object({
  v_idEmployee : z.number().int().positive("Numero debe ser Entero Positivo"),
  v_email: z.string().email("Email inválido"),
  v_rol: z.enum(["Administrador", "Asistente de Gerencia"], {
    required_error: "El rol es obligatorio",
    invalid_type_error: "Rol inválido. Debe ser 'Administrador' o 'Asistente de Gerencia'"
  })
}).strict();

//Esquema de Validacion de Datos de DELETE de Empleados
export const deleteSchema = z.object({
  v_idEmployee : z.number().int().positive("Numero debe ser Entero Positivo")
}).strict();

//Esquema de Validacion de Datos de Login de Empleados
export const loginSchema = z.object({
    email: z.string().email("Email Invalido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
}).strict();


