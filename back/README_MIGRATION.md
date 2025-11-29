# 📚 Guía de Migración a Prisma

Esta guía documenta la migración del backend de MySQL directo a Prisma ORM.

## 🎯 Objetivos de la Migración

1. **Separar responsabilidades**: Controladores, Servicios y Base de Datos
2. **Mejorar validación**: Usar Zod en controladores y validaciones en servicios
3. **TypeScript estricto**: Mejor tipado y prevención de errores
4. **Migraciones**: Sistema de versiones para cambios en la BD

## 🏗️ Nueva Arquitectura

```
Request
   ↓
[CONTROLADOR]  → Valida entrada (Zod)
   ↓
[SERVICIO]     → Lógica de negocio
   ↓
[PRISMA]       → ORM para BD
   ↓
[DATABASE]     → MySQL
```

## 📁 Estructura de Carpetas

```
back/
├── controllers/      # Manejan requests HTTP
│   ├── auth/        # signup, login
│   ├── dashboard/   # dashboard endpoints
│   └── test/        # health checks
├── services/        # Lógica de negocio
│   └── user.service.ts
├── validators/      # Schemas de Zod
│   └── user.validator.ts
├── types/          # TypeScript types y DTOs
│   ├── user.types.ts
│   └── common.types.ts
├── middlewares/    # Auth, error handling, etc.
├── db/            # Configuración de BD
│   ├── prisma.ts  # Cliente de Prisma (singleton)
│   └── db.ts      # (deprecated - mantener por compatibilidad)
├── prisma/        # Schema y migraciones
│   └── schema.prisma
└── routes/        # Definición de rutas
    └── index.routes.ts
```

## 🔧 Comandos de Prisma Importantes

### Generar Cliente de Prisma
Después de modificar `schema.prisma`, ejecutar:
```bash
npx prisma generate
```

### Sincronizar Schema con BD (Desarrollo)
Aplica cambios del schema a la BD sin crear migraciones:
```bash
npx prisma db push
```
⚠️ Solo usar en desarrollo! En producción usar migraciones.

### Ver la Base de Datos (Prisma Studio)
Interfaz gráfica para explorar y editar datos:
```bash
npx prisma studio
```

### Crear una Migración (Producción)
Cuando estés listo para producción:
```bash
npx prisma migrate dev --name nombre_descriptivo
```

### Aplicar Migraciones en Producción
```bash
npx prisma migrate deploy
```

## 📝 Variables de Entorno

Asegúrate de tener en `.env`:

```env
# URL de conexión de Prisma (formato completo)
DATABASE_URL="mysql://usuario:password@host:puerto/database"

# Otras variables
JWT_SECRET=tu-secret-super-seguro
TOKEN_EXPIRATION=1h
NODE_ENV=development
PORT=4001
```

## 🎓 Conceptos Clave

### 1. DTOs (Data Transfer Objects)
- Definen la estructura de datos entre capas
- Ver: `types/user.types.ts`
- Ejemplo: `CreateUserDTO`, `UserResponse`

### 2. Validadores Zod
- Validan datos de entrada en controladores
- Ver: `validators/user.validator.ts`
- Generan tipos de TypeScript automáticamente

### 3. Servicios
- Contienen lógica de negocio
- Interactúan con Prisma/Base de datos
- Reutilizables entre múltiples controladores
- Ver: `services/user.service.ts`

### 4. Controladores
- Punto de entrada HTTP
- Validan con Zod
- Llaman a servicios
- Formatean respuestas
- Ver: `controllers/auth/signup.controller.ts`

### 5. Prisma Client
- ORM type-safe para TypeScript
- Genera tipos desde el schema
- Previene SQL injection
- Ver: `db/prisma.ts`

## 🔄 Flujo de una Request

### Ejemplo: Registro de Usuario

1. **Request llega al controlador**
   ```ts
   POST /api/signup
   Body: { username, email, password }
   ```

2. **Controlador valida con Zod**
   ```ts
   const validation = signupSchema.safeParse(req.body);
   ```

3. **Controlador llama al servicio**
   ```ts
   const user = await UserService.createUser(validation.data);
   ```

4. **Servicio verifica duplicados**
   ```ts
   const exists = await prisma.user.findUnique({ where: { email } });
   ```

5. **Servicio hashea password**
   ```ts
   const hashedPassword = await bcryptjs.hash(password, 10);
   ```

6. **Servicio crea usuario con Prisma**
   ```ts
   const user = await prisma.user.create({ data: {...} });
   ```

7. **Controlador genera JWT y responde**
   ```ts
   const token = jwt.sign({ id, email }, JWT_SECRET);
   res.status(201).json({ token, userInfo });
   ```

## 🚀 Próximos Pasos

### Mejoras Recomendadas

1. **Middleware de Autenticación JWT**
   - Crear `middlewares/auth.middleware.ts`
   - Validar token en routes protegidas
   - Adjuntar userId a req.user

2. **Servicios Adicionales**
   - `category.service.ts` - CRUD de categorías
   - `transaction.service.ts` - Manejo de transacciones
   - `budget.service.ts` - Gestión de presupuestos

3. **Manejo de Errores Global**
   - Middleware de error handling
   - Logger centralizado
   - Respuestas consistentes

4. **Testing**
   - Unit tests para servicios
   - Integration tests para endpoints
   - Usar Jest + Supertest

5. **Documentación API**
   - Swagger/OpenAPI
   - Ejemplos de requests/responses

## ⚠️ Notas Importantes

### Cambios de mysql2 a Prisma

| Aspecto | mysql2 | Prisma |
|---------|--------|--------|
| Queries | SQL crudo | Type-safe API |
| Tipos | any[] | Generados automáticamente |
| Relaciones | JOINs manuales | `.include()` |
| Validación | Manual | En schema + Zod |
| Migraciones | Ninguna | Integradas |

### Mantenimiento del Schema

Cuando agregues o modifiques tablas:

1. Actualizar `prisma/schema.prisma`
2. Ejecutar `npx prisma generate`
3. Ejecutar `npx prisma db push` (desarrollo)
4. O crear migración: `npx prisma migrate dev`

## 📚 Recursos de Aprendizaje

- [Prisma Docs](https://www.prisma.io/docs)
- [Zod Docs](https://zod.dev/)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 🐛 Troubleshooting

### Error: "Cannot find module @prisma/client"
```bash
npx prisma generate
```

### Error: "Environment variable not found: DATABASE_URL"
Verificar que `.env` existe y tiene `DATABASE_URL` configurado

### Error de conexión a MySQL
Verificar credenciales en `.env` y que MySQL esté corriendo

### Tipos no actualizados después de cambiar schema
```bash
npx prisma generate
# Reiniciar TypeScript server en VS Code
```
