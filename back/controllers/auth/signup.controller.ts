import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import db from "../../db/db.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

const signup = async (req: Request, res: Response) => {
  const { username, email, password, currency, budget_reset_day } = req.body;

  if (!username || !email || !password || !currency || !budget_reset_day) {
    return res.status(400).json({ message: "All fiels required." });
  }

  try {
    const [rows]: [any[], any] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      console.log("El usuario ya existe");
      return res.status(409).json({ message: "User already exists." });
    }

    if (budget_reset_day < 0 && budget_reset_day > 31) {
      return res
        .status(422)
        .json({ message: "invalid budget readjustment day" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const insertQuery =
      "INSERT INTO users (name, email, password_hash, currency, budget_reset_day) VALUES (?, ?, ?, ?, ?)";
    const [insertResult]: any = await db.execute(insertQuery, [
      username,
      email,
      hashedPassword,
      currency,
      budget_reset_day,
    ]);

    console.log("Usuario creado exitosamente con ID:", insertResult.insertId);

    const token = jwt.sign(
      { id: insertResult.insertId, email },
      JWT_SECRET,
      {
        expiresIn: (process.env.TOKEN_EXPIRATION || "1h") as any,
      }
    );

    return res.status(201).json({
      message: "User successfully created.",
      userId: insertResult.insertId,
      token,
      userInfo: {
        username,
        email,
        currency,
        budget_reset_day,
      },
    });
  } catch (error) {
    console.error("Error en la operación:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default signup;
