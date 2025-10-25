import { Elysia } from "elysia";
import dbCheck from "../controllers/test/test";

export const router = new Elysia({ prefix: "/api" })
  .get("/db", dbCheck)
  .get("/back", () => "Test route is working");
