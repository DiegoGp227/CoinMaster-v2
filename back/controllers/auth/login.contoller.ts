import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import db from "../../db/db.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const [user]: any = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = user[0].password_hash;
    const isMatch = await bcryptjs.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email },
      JWT_SECRET,
      { expiresIn: (process.env.TOKEN_EXPIRATION || "1h") as any }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      userInfo: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
      },
    });
  } catch (error) {
    console.error("Error in the server:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default login;
