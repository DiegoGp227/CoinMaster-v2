# Estructura de Controladores

## Importaciones

```typescript
import { Request, Response } from "express";
import db from "../../db/db.js";
```

## Estructura Básica

```typescript
const nombreControlador = async (req: Request, res: Response) => {
  // Obtener parámetros
  const { param1, param2 } = req.body; // o req.params o req.query

  // Validar parámetros
  if (!param1) {
    return res.status(400).json({ message: "Param1 is required" });
  }

  try {
    // Hacer consultas a la DB
    const [result]: any = await db.execute("SELECT * FROM tabla WHERE id = ?", [param1]);

    // Retornar respuesta
    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default nombreControlador;
```

## Códigos de Status HTTP

| Código | Nombre | Uso |
|--------|--------|-----|
| 200 | OK | Petición exitosa |
| 201 | Created | Recurso creado exitosamente |
| 400 | Bad Request | Parámetros inválidos |
| 401 | Unauthorized | No autenticado |
| 403 | Forbidden | No tiene permisos |
| 404 | Not Found | Recurso no encontrado |
| 500 | Internal Server Error | Error del servidor |

## Parametrización de Consultas

SIEMPRE usa `?` para parámetros y pásalos en el array:

```typescript
// CORRECTO
db.execute("SELECT * FROM users WHERE id = ?", [userId])

// INCORRECTO - SQL Injection!
db.execute(`SELECT * FROM users WHERE id = ${userId}`)
```

## Tipos de Consultas SQL

```typescript
// SELECT
const [result]: any = await db.execute("SELECT * FROM tabla WHERE campo = ?", [valor]);

// INSERT
const [result]: any = await db.execute("INSERT INTO tabla (campo1, campo2) VALUES (?, ?)", [val1, val2]);

// UPDATE
const [result]: any = await db.execute("UPDATE tabla SET campo = ? WHERE id = ?", [nuevoValor, id]);

// DELETE
const [result]: any = await db.execute("DELETE FROM tabla WHERE id = ?", [id]);
```

## Obtener Parámetros

```typescript
// Desde el body (POST/PUT)
const { userId, name } = req.body;

// Desde URL params (/api/user/:id)
const { id } = req.params;

// Desde query string (?userId=123)
const { userId } = req.query;
```
