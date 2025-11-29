// ============================================
// TIPOS COMUNES
// ============================================
/**
 * Este archivo contiene tipos compartidos por toda la aplicación
 */

/**
 * Respuesta estándar de API
 * Útil para mantener consistencia en todas las respuestas
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

/**
 * Opciones de paginación
 * Para endpoints que devuelven listas
 */
export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Respuesta paginada
 * Incluye los datos y metadatos de paginación
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Tipo para errores personalizados
 * Permite agregar código de estado HTTP
 */
export class AppError extends Error {
  constructor(
    public override message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}
