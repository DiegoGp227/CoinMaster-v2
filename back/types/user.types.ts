// ============================================
// TIPOS Y DTOs PARA USUARIOS
// ============================================
/**
 * Este archivo define los tipos de datos para usuarios.
 *
 * DTO (Data Transfer Object):
 * - Son objetos que definen cómo se envían los datos entre diferentes capas
 * - Por ejemplo, CreateUserDTO define qué datos necesitamos para crear un usuario
 * - UserResponse define qué datos devolvemos al cliente (sin password)
 *
 * ¿Por qué separar los tipos?
 * - Seguridad: No exponemos campos sensibles como hashedPassword
 * - Validación: Definimos exactamente qué campos son requeridos
 * - Mantenibilidad: Si cambia la BD, solo actualizamos los DTOs
 */

/**
 * DTO para crear un nuevo usuario
 * Contiene todos los campos necesarios para el registro
 */
export interface CreateUserDTO {
  username: string;
  email: string;
  password: string; // Password en texto plano (se hasheará en el servicio)
  currency?: string; // Opcional, por defecto "COP"
  budgetResetDay?: number; // Opcional, por defecto 1
}

/**
 * DTO para login de usuario
 * Solo necesita email y password
 */
export interface LoginUserDTO {
  email: string;
  password: string;
}

/**
 * DTO para actualizar un usuario
 * Todos los campos son opcionales
 */
export interface UpdateUserDTO {
  username?: string;
  email?: string;
  password?: string;
  currency?: string;
  budgetResetDay?: number;
}

/**
 * Respuesta de usuario (lo que devolvemos al cliente)
 * NO incluye hashedPassword por seguridad
 */
export interface UserResponse {
  id: number;
  username: string;
  email: string;
  currency: string;
  budgetResetDay: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Respuesta de autenticación
 * Incluye el token JWT y la información del usuario
 */
export interface AuthResponse {
  message: string;
  userId: number;
  token: string;
  userInfo: {
    username: string;
    email: string;
    currency: string;
    budgetResetDay: number;
  };
}
