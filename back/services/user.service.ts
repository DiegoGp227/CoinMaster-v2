// ============================================
// SERVICIO DE USUARIOS
// ============================================
/**
 * Este archivo contiene la lógica de negocio para usuarios.
 *
 * ¿Qué es un servicio?
 * - Capa intermedia entre controladores y base de datos
 * - Contiene la lógica de negocio de la aplicación
 * - Reutilizable: múltiples controladores pueden usar el mismo servicio
 *
 * Patrón de arquitectura:
 * Request → Controller → Service → Prisma → Database
 *
 * Responsabilidades del servicio:
 * - Operaciones CRUD (Create, Read, Update, Delete)
 * - Validaciones de negocio (ej: verificar duplicados)
 * - Transformación de datos
 * - Manejo de errores de base de datos
 */

import bcryptjs from "bcryptjs";
import prisma from "../db/prisma.js";
import { CreateUserDTO, UpdateUserDTO, UserResponse } from "../types/user.types.js";
import { AppError } from "../types/common.types.js";

/**
 * Servicio de usuarios
 * Exportamos cada función por separado para facilitar testing y reutilización
 */
export class UserService {
  /**
   * Crea un nuevo usuario en la base de datos
   *
   * @param userData - Datos del usuario a crear
   * @returns Usuario creado (sin password)
   * @throws AppError si el email ya existe o hay error en BD
   *
   * Proceso:
   * 1. Verificar si el email ya existe
   * 2. Hashear la contraseña con bcrypt
   * 3. Crear el usuario en la base de datos
   * 4. Retornar usuario sin el hashedPassword
   */
  static async createUser(userData: CreateUserDTO): Promise<UserResponse> {
    try {
      // 1. Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        throw new AppError("El usuario ya existe", 409);
      }

      // 2. Validar el día de reinicio de presupuesto
      if (
        userData.budgetResetDay &&
        (userData.budgetResetDay < 1 || userData.budgetResetDay > 31)
      ) {
        throw new AppError("El día de reinicio debe estar entre 1 y 31", 422);
      }

      // 3. Hashear la contraseña
      // Salt rounds: mayor número = más seguro pero más lento (10 es estándar)
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(userData.password, salt);

      // 4. Crear el usuario en la base de datos usando Prisma
      const user = await prisma.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          hashedPassword,
          currency: userData.currency || "COP",
          budgetResetDay: userData.budgetResetDay || 1,
        },
        // select: especifica qué campos queremos devolver (excluimos hashedPassword)
        select: {
          id: true,
          username: true,
          email: true,
          currency: true,
          budgetResetDay: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      // Si es un error que ya lanzamos nosotros, lo re-lanzamos
      if (error instanceof AppError) {
        throw error;
      }

      // Si es un error de Prisma u otro, lo envolvemos en AppError
      console.error("Error al crear usuario:", error);
      throw new AppError("Error al crear el usuario", 500);
    }
  }

  /**
   * Busca un usuario por email
   *
   * @param email - Email del usuario
   * @returns Usuario encontrado o null
   *
   * Nota: Este método SÍ retorna el hashedPassword porque se usa
   * para verificar la contraseña en el login
   */
  static async findByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      console.error("Error al buscar usuario por email:", error);
      throw new AppError("Error al buscar usuario", 500);
    }
  }

  /**
   * Busca un usuario por ID
   *
   * @param id - ID del usuario
   * @returns Usuario encontrado (sin password) o null
   */
  static async findById(id: number): Promise<UserResponse | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          email: true,
          currency: true,
          budgetResetDay: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      console.error("Error al buscar usuario por ID:", error);
      throw new AppError("Error al buscar usuario", 500);
    }
  }

  /**
   * Actualiza un usuario existente
   *
   * @param id - ID del usuario a actualizar
   * @param updateData - Datos a actualizar
   * @returns Usuario actualizado (sin password)
   */
  static async updateUser(
    id: number,
    updateData: UpdateUserDTO
  ): Promise<UserResponse> {
    try {
      // Si se está actualizando la contraseña, hashearla
      let hashedPassword: string | undefined;
      if (updateData.password) {
        const salt = await bcryptjs.genSalt(10);
        hashedPassword = await bcryptjs.hash(updateData.password, salt);
      }

      // Actualizar el usuario
      const user = await prisma.user.update({
        where: { id },
        data: {
          ...(updateData.username && { username: updateData.username }),
          ...(updateData.email && { email: updateData.email }),
          ...(hashedPassword && { hashedPassword }),
          ...(updateData.currency && { currency: updateData.currency }),
          ...(updateData.budgetResetDay && {
            budgetResetDay: updateData.budgetResetDay,
          }),
        },
        select: {
          id: true,
          username: true,
          email: true,
          currency: true,
          budgetResetDay: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return user;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw new AppError("Error al actualizar usuario", 500);
    }
  }

  /**
   * Elimina un usuario
   *
   * @param id - ID del usuario a eliminar
   *
   * Nota: Debido a la configuración de Prisma con onDelete: Cascade,
   * esto también eliminará todas las categorías, transacciones, etc. del usuario
   */
  static async deleteUser(id: number): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw new AppError("Error al eliminar usuario", 500);
    }
  }

  /**
   * Verifica si una contraseña coincide con el hash almacenado
   *
   * @param password - Contraseña en texto plano
   * @param hashedPassword - Hash almacenado en la base de datos
   * @returns true si coinciden, false si no
   */
  static async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcryptjs.compare(password, hashedPassword);
  }
}
