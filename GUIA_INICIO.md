# 🚀 Guía de Inicio - CoinMaster con Prisma

## 📋 Opciones de Ejecución

Tienes 2 formas de ejecutar el proyecto:

### ⭐ Opción 1: Docker (RECOMENDADO)

La forma más fácil. Docker se encarga de todo: MySQL, Backend y Frontend.

```bash
# Desde la raíz del proyecto
docker-compose up --build
```

**Esto hará:**
1. ✅ Crear contenedor MySQL con base de datos `fynup`
2. ✅ Crear usuario `fynup_user` con password `fynup_pass`
3. ✅ Ejecutar el script SQL inicial (`back/db/db.sql`)
4. ✅ Construir y arrancar el backend con Prisma
5. ✅ Construir y arrancar el frontend

**Acceder a:**
- Backend: http://localhost:4001
- Frontend: http://localhost:5001
- MySQL: localhost:3306

**Comandos útiles:**
```bash
# Ver logs
docker-compose logs -f backend

# Ver logs solo de MySQL
docker-compose logs -f mysql

# Detener todo
docker-compose down

# Detener y eliminar volúmenes (borra datos)
docker-compose down -v

# Reconstruir imágenes
docker-compose up --build
```

---

### 🔧 Opción 2: Desarrollo Local (Sin Docker)

Para desarrollo local sin Docker, necesitas configurar MySQL manualmente.

#### Paso 1: Crear usuario en MySQL

Conecta a MySQL como root y ejecuta:

```sql
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS fynup;

-- Crear usuario
CREATE USER IF NOT EXISTS 'fynup_user'@'localhost' IDENTIFIED BY 'fynup_pass';

-- Dar permisos
GRANT ALL PRIVILEGES ON fynup.* TO 'fynup_user'@'localhost';
FLUSH PRIVILEGES;
```

#### Paso 2: Sincronizar schema de Prisma

```bash
cd back
npm run prisma:push
```

#### Paso 3: Iniciar backend

```bash
cd back
npm run dev
```

#### Paso 4: Iniciar frontend (en otra terminal)

```bash
cd front
npm run dev
```

**Acceder a:**
- Backend: http://localhost:4001
- Frontend: http://localhost:3000 (o el puerto que Next.js asigne)

---

## 🧪 Probar que funciona

### 1. Health Check del Backend

```bash
curl http://localhost:4001/api/db
```

Deberías ver:
```json
{
  "status": "success",
  "message": "Conexión a base de datos exitosa (Prisma)"
}
```

### 2. Registrar un usuario

```bash
curl -X POST http://localhost:4001/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "currency": "COP"
  }'
```

### 3. Login

```bash
curl -X POST http://localhost:4001/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🗄️ Explorar la Base de Datos

### Con Prisma Studio (Interfaz Gráfica)

```bash
cd back
npm run prisma:studio
```

Abre: http://localhost:5555

### Con MySQL CLI

```bash
# Docker
docker exec -it coinmaster_mysql mysql -u fynup_user -pfynup_pass fynup

# Local
mysql -u fynup_user -pfynup_pass fynup
```

---

## 📊 Estructura de la Base de Datos

El schema de Prisma creará estas tablas:

```
users              ← Usuarios del sistema
categories         ← Categorías (ingresos/gastos)
subcategories      ← Subcategorías
transactions       ← Transacciones
budgets           ← Presupuestos
goals             ← Metas de ahorro
goal_contributions ← Aportes a metas
debts             ← Deudas
debt_payments     ← Pagos de deudas
```

---

## 🔧 Comandos NPM Útiles

### Backend

```bash
# Desarrollo
npm run dev                      # Servidor con hot-reload

# Prisma
npm run prisma:generate          # Genera cliente de Prisma
npm run prisma:push              # Sincroniza schema con BD
npm run prisma:studio            # Abre interfaz gráfica
npm run prisma:migrate           # Crea migración
npm run prisma:migrate:deploy    # Aplica migraciones

# Build
npm run build                    # Compila TypeScript
npm start                        # Ejecuta versión compilada
```

---

## ❓ Problemas Comunes

### Error: "Authentication failed" con fynup_user

**Problema:** El usuario no existe en MySQL local.

**Solución:**
1. Usa Docker: `docker-compose up`
2. O crea el usuario manualmente (ver Opción 2 arriba)

### Error: "Cannot find module @prisma/client"

**Solución:**
```bash
cd back
npm run prisma:generate
```

### Error: "Port 3306 already in use"

**Problema:** Tienes MySQL corriendo localmente.

**Solución:**
```bash
# Opción 1: Detén MySQL local
# En Windows: Servicios → MySQL → Detener

# Opción 2: Cambia el puerto en docker-compose.yml
ports:
  - "3307:3306"  # Usa 3307 externamente
```

### Cambios en schema no se reflejan

**Solución:**
```bash
cd back
npm run prisma:generate
npm run prisma:push
```

### Docker: Error de permisos

**Solución en Windows:**
```bash
# Ejecuta PowerShell como Administrador
docker-compose down
docker volume rm coinmaster_mysql_data
docker-compose up --build
```

---

## 📚 Documentación Adicional

- **Back/README_MIGRATION.md** - Guía completa de migración a Prisma
- **Back/PASOS_FINALES.md** - Configuración detallada
- **Back/RESUMEN_MIGRACION.md** - Resumen de cambios
- **Back/INICIO_RAPIDO.md** - Inicio rápido backend

---

## 🎯 Siguiente Paso

### Con Docker (Recomendado):

```bash
docker-compose up --build
```

Luego abre: http://localhost:5001

### Sin Docker:

1. Crea el usuario en MySQL (ver arriba)
2. Ejecuta `cd back && npm run prisma:push`
3. Ejecuta `cd back && npm run dev`
4. Ejecuta `cd front && npm run dev` (en otra terminal)

---

## ✨ ¡Listo!

Tu aplicación CoinMaster con Prisma está configurada y lista para usar.

**Endpoints del Backend:**
- `GET /api/db` - Health check
- `POST /api/signup` - Registro
- `POST /api/login` - Login
- `POST /api/dashboard/balance` - Dashboard

**Herramientas:**
- Prisma Studio: `npm run prisma:studio` (http://localhost:5555)
- Backend: http://localhost:4001
- Frontend: http://localhost:5001 (Docker) o http://localhost:3000 (local)

🚀 ¡A programar!
