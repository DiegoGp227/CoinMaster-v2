import { Elysia } from "elysia";
import dbCheck from "../controllers/test/test";
import signup from "../controllers/auth/signup.controller";

export const router = new Elysia({ prefix: "/api" })
  //Auth
  //   .post("/login", login)
  .post("/signup", signup)

  .get("/db", dbCheck)
  .get("/back", () => "Test route is working");
