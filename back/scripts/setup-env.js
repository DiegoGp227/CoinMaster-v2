/**
 * Script de ayuda para configurar DATABASE_URL
 *
 * Este script lee tus variables de entorno existentes
 * y te ayuda a crear la DATABASE_URL en el formato correcto
 */

import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_PORT = process.env.DB_PORT || "3306";
const DB_DATABASE = process.env.DB_DATABASE || "coinmaster";

// Construir DATABASE_URL
const DATABASE_URL = `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

console.log("\n📋 Configuración detectada:");
console.log("============================");
console.log(`Host:     ${DB_HOST}`);
console.log(`Usuario:  ${DB_USER}`);
console.log(`Password: ${"*".repeat(DB_PASSWORD.length)}`);
console.log(`Puerto:   ${DB_PORT}`);
console.log(`Database: ${DB_DATABASE}`);
console.log("\n🔗 DATABASE_URL generada:");
console.log("============================");
console.log(DATABASE_URL.replace(DB_PASSWORD, "***"));
console.log("\n📝 Agrega esta línea a tu archivo .env:");
console.log("============================");
console.log(`DATABASE_URL="${DATABASE_URL}"`);
console.log("\n");
