import { Router } from "express";
import dbCheck from "../controllers/test/test.js";
import signup from "../controllers/auth/signup.controller.js";
import login from "../controllers/auth/login.contoller.js";
import getBalance from "../controllers/dashboard/dashboard.controller.js";

export const router = Router();

// Auth routes
router.post("/api/signup", signup);
router.post("/api/login", login);

// Dashboard routes
router.post("/api/dashboard/balance", getBalance);

// Test routes
router.get("/api/db", dbCheck);
router.get("/api/back", (_req, res) => res.send("Test route is working"));
