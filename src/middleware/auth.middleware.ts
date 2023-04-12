import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { getUserByEmail } from "../services/auth.services";

const jwtSecret = "superSecret";

interface JwtPayload {
  id: number;
  role: string;
  iat: number;
  exp: number;
  email: string;
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    const user = await getUserByEmail(decoded.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.body.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}
