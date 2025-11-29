# 🚀 Inicio Rápido - Backend con Prisma

## ⚡ Pasos para empezar (5 minutos)

### 1. Configurar credenciales de MySQL

Edita el archivo `.env` y actualiza estas líneas con tus credenciales:

```env
DATABASE_URL="mysql://TU_USUARIO:TU_PASSWORD@localhost:3306/coinmaster"

# Ejemplos:
# DATABASE_URL="mysql://root:@localhost:3306/coinmaster"              # XAMPP sin password
# DATABASE_URL="mysql://root:mipassword@localhost:3306/coinmaster"    # Con password
```

### 2. Asegúrate de que MySQL está corriendo

- **XAMPP:** Abre el panel de control y inicia MySQL
- **Windows Services:** Verifica que el servicio MySQL esté iniciado
- **Comando:** `mysql -u root -p` (para verificar que puedes conectarte)

### 3. Sincronizar la base de datos

```bash
npm run prisma:push
```

Este comando:
- ✅ Crea la base de datos `coinmaster` si no existe
- ✅ Crea todas las 9 tablas del schema
- ✅ Configura índices y relaciones
- ✅ Regenera el cliente de Prisma

### 4. Iniciar el servidor

```bash
npm run dev
```

### 5. Probar que funciona

Abre tu navegador o Postman y prueba:

**Health Check:**
```
GET http://localhost:4001/api/db
```

Deberías ver:
```json
{
  "status": "success",
  "message": "Conexión a base de datos exitosa (Prisma)"
}
```

---

## 📋 Comandos NPM disponibles

```bash
# Desarrollo
npm run dev                      # Inicia servidor con hot-reload

# Construcción
npm run build                    # Compila TypeScript a JavaScript
npm start                        # Ejecuta versión compilada

# Prisma
npm run prisma:generate          # Genera cliente de Prisma
npm run prisma:push              # Sincroniza schema con BD
npm run prisma:studio            # Abre interfaz gráfica
npm run prisma:migrate           # Crea migración
npm run prisma:migrate:deploy    # Aplica migraciones (producción)
```

---

## 🧪 Probar los endpoints

### 1. Registrar un usuario

```bash
POST http://localhost:4001/api/signup
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "currency": "COP",
  "budgetResetDay": 1
}
```

Respuesta esperada:
```json
{
  "message": "Usuario creado exitosamente",
  "userId": 1,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userInfo": {
    "username": "testuser",
    "email": "test@example.com",
    "currency": "COP",
    "budgetResetDay": 1
  }
}
```

### 2. Login

```bash
POST http://localhost:4001/api/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Dashboard

```bash
POST http://localhost:4001/api/dashboard/balance
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## 🔍 Ver los datos en Prisma Studio

```bash
npm run prisma:studio
```

Esto abrirá `http://localhost:5555` donde puedes:
- ✅ Ver todas las tablas
- ✅ Editar datos manualmente
- ✅ Ver relaciones
- ✅ Ejecutar queries

---

## ❓ Problemas comunes

### Error: "Cannot find module @prisma/client"

**Solución:**
```bash
npm run prisma:generate
```

### Error: "Authentication failed"

**Solución:**
1. Verifica las credenciales en `.env`
2. Asegúrate de que MySQL está corriendo
3. Prueba conectarte manualmente: `mysql -u root -p`

### Error: "Database does not exist"

**Solución:**
Crea la base de datos manualmente:
```sql
CREATE DATABASE coinmaster;
```

Luego ejecuta:
```bash
npm run prisma:push
```

### Cambios en schema no se aplican

**Solución:**
```bash
npm run prisma:generate
npm run prisma:push
```

---

## 📚 Documentación

- **Guía completa:** `README_MIGRATION.md`
- **Pasos finales:** `PASOS_FINALES.md`
- **Resumen:** `RESUMEN_MIGRACION.md`

---

## 🎯 Próximos pasos

Una vez que todo funcione:

1. ✅ Crea más endpoints para categorías, transacciones, etc.
2. ✅ Implementa middleware de autenticación JWT
3. ✅ Agrega tests
4. ✅ Implementa manejo de errores global
5. ✅ Agrega logging

---

## 💡 Tips

- Usa **Prisma Studio** (`npm run prisma:studio`) para explorar la BD visualmente
- Revisa los **comentarios en el código** para entender cómo funciona cada parte
- Consulta la **documentación de Prisma** cuando tengas dudas: https://www.prisma.io/docs
- Usa **TypeScript** al máximo - los errores en compile time te ahorrarán bugs

---

¡Listo! 🎉 Tu backend con Prisma está configurado y funcionando.
