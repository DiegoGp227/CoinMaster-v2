import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { router } from "../routes/index.routes";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4001;

const app = new Elysia()
  .use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:5000",
        "https://taskly.devdiego.work",
        "https://api.devdiego.work",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .use(router)
  .get("/ping", () => "pong")
  .all("*", () => ({
    message: "Escribe bien mono estupido",
  }))
  .listen(PORT);

console.log(`🔥 Hello world, I am listening on port ${PORT}`);
