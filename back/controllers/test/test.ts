// ============================================
// CONTROLADOR DE PRUEBA DE CONEXIÓN A BD
// ============================================
/**
 * Este controlador verifica que la conexión a la base de datos
 * esté funcionando correctamente usando Prisma.
 *
 * ¿Cómo funciona?
 * - Ejecuta una query simple ($queryRaw) para verificar la conexión
 * - Si funciona, retorna éxito
 * - Si falla, retorna error
 *
 * Útil para:
 * - Health checks
 * - Debugging de problemas de conexión
 * - Verificar que Prisma esté configurado correctamente
 */

import { Request, Response } from "express";
import prisma from "../../db/prisma.js";

const dbCheck = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Ejecutar una query simple para verificar la conexión
    // $queryRaw ejecuta SQL crudo (raw SQL)
    const result = await prisma.$queryRaw`SELECT 1 AS ok`;

    res.status(200).json({
      status: "success",
      message: "Conexión a base de datos exitosa (Prisma)",
      result,
    });
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error);
    res.status(500).json({
      status: "error",
      message: "No se pudo conectar a la base de datos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export default dbCheck;
