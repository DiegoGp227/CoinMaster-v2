// ============================================
// VALIDADORES ZOD PARA USUARIOS
// ============================================
/**
 * Este archivo define los schemas de validación usando Zod.
 *
 * ¿Qué es Zod?
 * - Una librería de validación y parsing de TypeScript
 * - Permite definir reglas de validación de forma declarativa
 * - Genera tipos de TypeScript automáticamente
 *
 * ¿Por qué validar en esta capa?
 * - Prevenir datos inválidos antes de llegar a la base de datos
 * - Proporcionar mensajes de error claros al usuario
 * - Documentar qué datos se esperan en cada endpoint
 *
 * Ejemplo de uso:
 * ```ts
 * const result = signupSchema.safeParse(req.body);
 * if (!result.success) {
 *   return res.status(400).json({ error: result.error });
 * }
 * // Aquí result.data tiene los datos validados y tipados
 * ```
 */

import { z } from "zod";

/**
 * Schema de validación para registro de usuario
 *
 * Reglas de negocio:
 * - username: 3-50 caracteres
 * - email: formato válido de email
 * - password: mínimo 6 caracteres (puedes hacer más estricto)
 * - currency: código de 3 letras (ej: USD, COP, EUR)
 * - budgetResetDay: entre 1 y 31
 */
export const signupSchema = z.object({
  username: z
    .string({ message: "El nombre de usuario es requerido" })
    .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre de usuario no puede exceder 50 caracteres" })
    .trim(),

  email: z
    .string({ message: "El email es requerido" })
    .email({ message: "Formato de email inválido" })
    .toLowerCase()
    .trim(),

  password: z
    .string({ message: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    // Puedes agregar validaciones más estrictas:
    // .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    // .regex(/[0-9]/, "Debe contener al menos un número")
    ,

  currency: z
    .string()
    .length(3, { message: "El código de moneda debe tener 3 caracteres" })
    .toUpperCase()
    .optional()
    .default("COP"),

  budgetResetDay: z
    .number({ message: "El día de reinicio debe ser un número" })
    .int({ message: "El día de reinicio debe ser un número entero" })
    .min(1, { message: "El día de reinicio debe ser entre 1 y 31" })
    .max(31, { message: "El día de reinicio debe ser entre 1 y 31" })
    .optional()
    .default(1),
});

/**
 * Schema de validación para login
 *
 * Solo requiere email y password
 */
export const loginSchema = z.object({
  email: z
    .string({ message: "El email es requerido" })
    .email({ message: "Formato de email inválido" })
    .toLowerCase()
    .trim(),

  password: z.string({ message: "La contraseña es requerida" }),
});

/**
 * Schema de validación para actualizar usuario
 *
 * Todos los campos son opcionales, pero si se proporcionan
 * deben cumplir con las mismas reglas que en signup
 */
export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
    .max(50, "El nombre de usuario no puede exceder 50 caracteres")
    .trim()
    .optional(),

  email: z
    .string()
    .email("Formato de email inválido")
    .toLowerCase()
    .trim()
    .optional(),

  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .optional(),

  currency: z
    .string()
    .length(3, "El código de moneda debe tener 3 caracteres")
    .toUpperCase()
    .optional(),

  budgetResetDay: z
    .number()
    .int("El día de reinicio debe ser un número entero")
    .min(1, "El día de reinicio debe ser entre 1 y 31")
    .max(31, "El día de reinicio debe ser entre 1 y 31")
    .optional(),
});

/**
 * Tipos inferidos automáticamente desde los schemas
 * Esto garantiza que los tipos de TypeScript estén sincronizados con las validaciones
 */
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
