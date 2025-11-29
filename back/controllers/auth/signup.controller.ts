// ============================================
// CONTROLADOR DE REGISTRO (SIGNUP)
// ============================================
/**
 * Este controlador maneja la lógica de registro de usuarios.
 *
 * ¿Qué es un controlador?
 * - Punto de entrada para las peticiones HTTP
 * - Valida los datos de entrada con Zod
 * - Llama a los servicios para ejecutar la lógica de negocio
 * - Formatea y envía la respuesta HTTP
 *
 * Arquitectura:
 * Request → [CONTROLADOR] → Validator → Service → Database
 *                ↓
 *            Response
 *
 * Responsabilidades del controlador:
 * 1. Validar entrada (usando Zod)
 * 2. Llamar al servicio correspondiente
 * 3. Generar token JWT si es necesario
 * 4. Formatear respuesta HTTP
 * 5. Manejar errores y devolver códigos HTTP apropiados
 */

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../../services/user.service.js";
import { signupSchema } from "../../validators/user.validator.js";
import { AppError } from "../../types/common.types.js";

// Variable de entorno para el secret del JWT
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";

/**
 * Controlador de registro de usuario
 *
 * @route POST /api/signup
 * @body { username, email, password, currency?, budgetResetDay? }
 * @returns { message, userId, token, userInfo }
 *
 * Flujo del controlador:
 * 1. Validar datos de entrada con Zod
 * 2. Llamar al servicio para crear el usuario
 * 3. Generar token JWT para autenticación
 * 4. Devolver respuesta exitosa con el token
 */
const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. VALIDACIÓN DE ENTRADA
    // safeParse no lanza errores, retorna { success, data, error }
    const validation = signupSchema.safeParse(req.body);

    if (!validation.success) {
      // Si la validación falla, extraemos los errores de Zod
      const errors = validation.error.issues.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      res.status(400).json({
        message: "Errores de validación",
        errors,
      });
      return;
    }

    // 2. LLAMAR AL SERVICIO
    // validation.data contiene los datos validados y transformados por Zod
    const user = await UserService.createUser(validation.data);

    console.log("✅ Usuario creado exitosamente:", user.id);

    // 3. GENERAR TOKEN JWT
    /**
     * JWT (JSON Web Token) es un estándar para autenticación
     * Contiene:
     * - Payload: información del usuario (id, email)
     * - Signature: firma criptográfica para verificar autenticidad
     * - Expiration: tiempo de expiración
     */
    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload
      JWT_SECRET, // Secret para firmar
      {
        expiresIn: process.env.TOKEN_EXPIRATION || "1h", // Expiración
      } as any
    );

    // 4. RESPUESTA EXITOSA
    res.status(201).json({
      message: "Usuario creado exitosamente",
      userId: user.id,
      token,
      userInfo: {
        username: user.username,
        email: user.email,
        currency: user.currency,
        budgetResetDay: user.budgetResetDay,
      },
    });
  } catch (error) {
    // MANEJO DE ERRORES
    console.error("❌ Error en signup:", error);

    // Si es un error de aplicación (AppError), usamos su código de estado
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        message: error.message,
      });
      return;
    }

    // Para errores inesperados, devolvemos error 500
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export default signup;
