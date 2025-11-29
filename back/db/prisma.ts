// ============================================
// CLIENTE DE PRISMA - SINGLETON PATTERN
// ============================================
/**
 * Este archivo implementa el patrón Singleton para el cliente de Prisma.
 *
 * ¿Por qué usar Singleton?
 * - En desarrollo, el hot-reload puede crear múltiples instancias del cliente
 * - Cada instancia consume una conexión a la base de datos
 * - El patrón Singleton garantiza que solo exista UNA instancia del cliente
 *
 * ¿Cómo funciona?
 * 1. Verifica si ya existe una instancia en el objeto global
 * 2. Si existe, la reutiliza
 * 3. Si no existe, crea una nueva y la guarda en el objeto global
 */

import { PrismaClient } from "@prisma/client";

// Extendemos el objeto global de Node.js para almacenar el cliente
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Configuración del cliente de Prisma
 *
 * Opciones importantes:
 * - log: Define qué eventos se registran en la consola
 *   - query: Muestra las consultas SQL generadas (útil para aprender)
 *   - error: Muestra errores de Prisma
 *   - warn: Muestra advertencias
 */
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: [
      // En desarrollo, mostramos las queries para aprender
      // En producción, solo mostramos errores
      ...(process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"]
      ),
    ] as any,
  });
};

// Si ya existe una instancia en global, la usamos
// Si no existe, creamos una nueva
const prisma = globalThis.prisma ?? prismaClientSingleton();

// En desarrollo, guardamos la instancia en el objeto global
// para que persista entre hot-reloads
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

/**
 * Manejo de cierre graceful
 *
 * Cuando la aplicación se cierra (Ctrl+C, error fatal, etc.),
 * es importante cerrar las conexiones a la base de datos correctamente.
 */
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;
