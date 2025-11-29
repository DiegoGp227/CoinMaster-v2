// ============================================
// CONTROLADOR DE DASHBOARD
// ============================================
/**
 * Este controlador maneja las operaciones del dashboard del usuario.
 *
 * NOTA IMPORTANTE:
 * Este controlador actualmente usa autenticación mediante email/password
 * en cada request. Esto NO es una buena práctica de seguridad.
 *
 * Mejora recomendada:
 * - Usar un middleware de autenticación JWT
 * - Extraer el userId del token en lugar de pedirlo en cada request
 * - Ver: middlewares/auth.middleware.ts (próximo paso)
 *
 * Por ahora, mantenemos la lógica existente pero con Prisma.
 */

import { Request, Response } from "express";
import { UserService } from "../../services/user.service.js";
import { AppError } from "../../types/common.types.js";

/**
 * Obtiene el balance del usuario (información básica)
 *
 * @route POST /api/dashboard/balance
 * @body { email, password }
 * @returns { message, userId, userInfo }
 *
 * TODO: Refactorizar para usar JWT token en lugar de email/password
 */
const getBalance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      res.status(400).json({
        message: "Email y contraseña son requeridos",
      });
      return;
    }

    // Buscar usuario por email
    const user = await UserService.findByEmail(email);

    if (!user) {
      res.status(404).json({
        message: "Usuario no encontrado",
      });
      return;
    }

    // Verificar contraseña
    const isPasswordValid = await UserService.verifyPassword(
      password,
      user.hashedPassword
    );

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Contraseña inválida",
      });
      return;
    }

    // Respuesta exitosa
    res.status(200).json({
      message: "Balance obtenido exitosamente",
      userId: user.id,
      userInfo: {
        username: user.username,
        email: user.email,
        currency: user.currency,
        budgetResetDay: user.budgetResetDay,
      },
    });
  } catch (error) {
    console.error("❌ Error al obtener balance:", error);

    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export default getBalance;
