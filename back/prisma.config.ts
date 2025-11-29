// ============================================
// CONFIGURACIÓN DE PRISMA 7
// ============================================
/**
 * Este archivo configura Prisma para el proyecto.
 *
 * ¿Qué es prisma.config.ts?
 * - Archivo de configuración de Prisma (nuevo en v7)
 * - Define la ubicación del schema
 * - Configura la URL de conexión a la base de datos
 * - Configura rutas de migraciones
 *
 * Nota: Este archivo usa dotenv para cargar variables de entorno
 */

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Ubicación del schema de Prisma
  schema: "prisma/schema.prisma",

  // Configuración de migraciones
  migrations: {
    path: "prisma/migrations",
  },

  // Configuración de la fuente de datos
  datasource: {
    // URL de conexión desde .env
    // Formato: mysql://usuario:password@host:puerto/database
    url: env("DATABASE_URL"),
  },
});
