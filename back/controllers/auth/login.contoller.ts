// ============================================
// CONTROLADOR DE LOGIN
// ============================================
/**
 * Este controlador maneja la autenticación de usuarios existentes.
 *
 * Flujo de autenticación:
 * 1. Usuario envía email y password
 * 2. Buscamos el usuario en la base de datos
 * 3. Verificamos que la contraseña sea correcta
 * 4. Generamos un token JWT
 * 5. Devolvemos el token y la información del usuario
 *
 * Seguridad:
 * - Nunca devolvemos el hashedPassword al cliente
 * - Usamos bcrypt para comparar contraseñas de forma segura
 * - El token JWT expira después de cierto tiempo
 */

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../../services/user.service.js";
import { loginSchema } from "../../validators/user.validator.js";
import { AppError } from "../../types/common.types.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";

/**
 * Controlador de login
 *
 * @route POST /api/login
 * @body { email, password }
 * @returns { message, userId, token, userInfo }
 */
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. VALIDACIÓN DE ENTRADA
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
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

    const { email, password } = validation.data;

    // 2. BUSCAR USUARIO POR EMAIL
    const user = await UserService.findByEmail(email);

    if (!user) {
      // Nota de seguridad: No especificamos si el email existe o no
      // para prevenir enumeración de usuarios
      res.status(401).json({
        message: "Credenciales inválidas",
      });
      return;
    }

    // 3. VERIFICAR CONTRASEÑA
    /**
     * bcrypt.compare compara la contraseña en texto plano
     * con el hash almacenado de forma segura
     *
     * ¿Por qué es seguro?
     * - Usa el mismo salt que se usó para crear el hash
     * - Es resistente a ataques de fuerza bruta (es lento intencionalmente)
     * - No es reversible (no se puede obtener la contraseña del hash)
     */
    const isPasswordValid = await UserService.verifyPassword(
      password,
      user.hashedPassword
    );

    if (!isPasswordValid) {
      res.status(401).json({
        message: "Credenciales inválidas",
      });
      return;
    }

    console.log("✅ Login exitoso para usuario:", user.email);

    // 4. GENERAR TOKEN JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION || "1h" } as any
    );

    // 5. RESPUESTA EXITOSA
    res.status(200).json({
      message: "Login exitoso",
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
    console.error("❌ Error en login:", error);

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

export default login;
