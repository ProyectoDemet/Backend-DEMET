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
});

//Esquema de Validacion de Datos de Login de Empleados
export const loginSchema = z.object({
    email: z.string().email("Email Invalido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
})


